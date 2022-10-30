import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BudgetService } from '../../budget.service';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
})
export class BudgetFormComponent implements OnInit {
  @ViewChild('budgetForm') ngForm: NgForm | undefined;

  budgetFormGroup!: FormGroup;
  identifier;
  categoryList$ = new Observable<any>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private budgetService: BudgetService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.construirFormulario();
    this.identifier = this.route.snapshot.paramMap.get('identifier');
    this.loadData();
  }

  loadData() {
    this.categoryList$ = this.budgetService.getAllCategories();
    if (this.identifier && this.identifier != 0) {
      this.budgetService.getByUuid(this.identifier).subscribe((data) => {
        this.budgetFormGroup.patchValue(data);
      });
    }
  }

  backToList() {
    this.router.navigate(['budgets']);
  }

  save() {
    const formValue = this.budgetFormGroup.getRawValue();

    this.budgetService.save(formValue).subscribe((data) => {
      console.log(data);
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
