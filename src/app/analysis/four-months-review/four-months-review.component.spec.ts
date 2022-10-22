import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FourMonthsReviewComponent } from './four-months-review.component';

describe('DetailByTypeComponent', () => {
  let component: FourMonthsReviewComponent;
  let fixture: ComponentFixture<FourMonthsReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FourMonthsReviewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourMonthsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
