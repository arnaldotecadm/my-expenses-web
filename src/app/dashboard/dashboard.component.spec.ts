import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { SwitchAccountService } from '../service/switch-account.service';
import { DashboardService } from './dashboard.service';
import { DashBoardComponent } from './dashboard.component';

describe("UserComponent", () => {
  let component: DashBoardComponent;
  let fixture: ComponentFixture<DashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashBoardComponent],
      imports: [CommonModule, MatIconModule],
      providers: [
        {
          provide: DashboardService,
          useValue: { getAll: () => of([]) },
        },
        {
          provide: SwitchAccountService,
          useValue: {
            getSelectedAccount: () => false,
            getSwitchAccountAsObservable: () => of(null),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('filters transactions without changing the original month summary', () => {
    component.originalData = [
      {
        reference: '2026-10',
        summaryDTO: { income: 1000, expense: -200, total: 800, opening: 0 },
        transactionList: [
          { payee: 'Coffee shop', category: 'Food', amount: -8, tags: [] },
          { payee: 'Salary', category: 'Income', amount: 1000, tags: [] },
        ],
      },
    ];

    component.filterData('coffee');

    expect(component.data[0].transactionList.length).toBe(1);
    expect(component.data[0].transactionList[0].payee).toBe('Coffee shop');
    expect(component.originalData[0].summaryDTO.expense).toBe(-200);
    expect(component.expenseAmount(component.data[0].summaryDTO)).toBe(200);
    expect(component.savingsRateFor(component.data[0])).toBe(80);
    expect(component.categoriesForMonth(component.data[0])[0].name).toBe('Food');
  });

  it('filters transactions by comments and tags', () => {
    component.originalData = [
      {
        reference: '2026-10',
        summaryDTO: { income: 100, expense: -10, total: 90, opening: 0 },
        transactionList: [
          { comment: 'Weekly groceries', amount: -10, tags: ['Household'] },
        ],
      },
    ];

    component.filterData('household');
    expect(component.data[0].transactionList.length).toBe(1);

    component.filterData('weekly');
    expect(component.data[0].transactionList.length).toBe(1);
  });

  it('keeps the ledger across months and loads more transactions as requested', () => {
    const transactions = Array.from({ length: 25 }, (_, index) => ({
      date: `2026-10-${String(25 - index).padStart(2, '0')}`,
      payee: `Merchant ${index}`,
      category: 'Food',
      amount: -10,
      tags: [],
    }));
    component.originalData = [
      {
        reference: '2026-10',
        summaryDTO: { month: 'October 2026', income: 100, expense: -50, total: 50 },
        transactionList: transactions,
      },
      {
        reference: '2026-09',
        summaryDTO: { month: 'September 2026', income: 100, expense: -25, total: 75 },
        transactionList: Array.from({ length: 5 }, (_, index) => ({
          date: `2026-09-${String(25 - index).padStart(2, '0')}`,
          payee: `Older merchant ${index}`,
          category: 'Bills',
          amount: -5,
          tags: [],
        })),
      },
    ];
    component.applyFilter();

    expect(component.visibleLedgerMonths.map((month) => month.reference)).toEqual([
      '2026-10',
    ]);
    expect(component.visibleLedgerMonths[0].transactionList.length).toBe(20);

    component.loadMoreTransactions();

    expect(component.visibleLedgerMonths.map((month) => month.reference)).toEqual([
      '2026-10',
      '2026-09',
    ]);
    expect(
      component.visibleLedgerMonths.reduce(
        (count, month) => count + month.transactionList.length,
        0
      )
    ).toBe(30);
    expect(component.hasMoreTransactions).toBeFalse();

    component.monthChanged('2026-10');

    expect(component.visibleLedgerMonths.map((month) => month.reference)).toEqual([
      '2026-10',
    ]);
    expect(component.visibleLedgerMonths[0].transactionList.length).toBe(20);
    expect(component.categoriesForMonth(component.visibleLedgerMonths[0])[0].name)
      .toBe('Food');
  });
});
