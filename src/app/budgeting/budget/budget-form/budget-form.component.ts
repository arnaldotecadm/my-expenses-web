import {
  AfterContentChecked,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BudgetService } from '../../budget.service';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
})
export class BudgetFormComponent implements OnInit, AfterContentChecked {
  @ViewChild('budgetForm') ngForm: NgForm | undefined;

  budgetFormGroup!: FormGroup;
  identifier;
  categoryList$ = new Observable<any>();
  categoryListDetail;
  contentLoaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private budgetService: BudgetService,
    private route: ActivatedRoute
  ) {}

  ngAfterContentChecked(): void {
    if (!this.categoryListDetail) {
      return;
    }
    if (this.contentLoaded) {
      return;
    } 

    const categoryListDetail = Object.keys(this.categoryListDetail);
    categoryListDetail.forEach((item) => {
      let obj: any;      
      obj = document.getElementById(item);
      if (obj) {
        obj.value = this.categoryListDetail[item];
        this.contentLoaded = true;
      }
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.identifier = this.route.snapshot.paramMap.get('identifier');
    this.loadData();
  }

  loadData() {
    this.categoryList$ = this.budgetService.getAllCategories();
    if (this.identifier && this.identifier != 0) {
      this.budgetService.getByUuid(this.identifier).subscribe((data: any) => {
        this.categoryListDetail = data.categoryListDetail;
        console.log(data);

        this.budgetFormGroup.patchValue(data);
      });
    }
  }

  backToList() {
    this.router.navigate(['budgets']);
  }

  save() {
    const formValue = this.budgetFormGroup.getRawValue();

    const detailList = document.querySelectorAll('[data-component]');
    const detailMap: Map<string, string> = new Map<string, string>();
    detailList.forEach((item: any) => {
      detailMap.set(item.id, item.value ? item.value : 0);
    });

    formValue.categoryListDetail = Object.fromEntries(detailMap);

    this.budgetService.save(formValue).subscribe((data) => {
      this.backToList();
    });
  }

  private construirFormulario() {
    this.budgetFormGroup = this.formBuilder.group({
      documentId: [],
      id: [{ value: '', disabled: true }],
      name: ['', Validators.minLength(5)],
      amount: ['', Validators.required],
      onlyThisMonth: [''],
      categoryList: [''],
      description: ['', Validators.minLength(5)],
      uuid: [],
      creationUser: [],
    });
  }
}
