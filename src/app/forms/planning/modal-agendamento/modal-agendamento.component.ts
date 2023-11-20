import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { MustConfirm } from 'src/app/decorators/must-confirm.decorators';
import { PlanningService } from '../planning.service';

@Component({
  selector: 'app-modal-agendamento',
  templateUrl: './modal-agendamento.component.html',
  styleUrls: ['./modal-agendamento.component.css'],
  providers: [],
})
export class ModalAgendamentoComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private service: PlanningService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.construirFormulario();
    this.loadData();
  }

  loadData() {
    if (this.data.info.uuid) {
      this.service.getByUuid(this.data.info.uuid).subscribe((data) => {
       this.formulario.patchValue(data);
      });
    } else {
      this.formulario.patchValue({
        date: moment(this.data.info.date).format('YYYY-MM-DD'),
      });
    }
  }

  updateEntry() {
    Object.keys(this.formulario.controls).forEach((field) => {
      const control = this.formulario.get(field);
      control!!.markAsTouched({ onlySelf: true });
    });
    const form = this.formulario.getRawValue();
    if (this.formulario.invalid) {
      return;
    }

    this.service.save(form).subscribe(() => {
      this.dialogRef.close({
        state: 'SUCCESS',
        data: form,
      });
    });
  }

  @MustConfirm('Are yo ureally sure you wanna delete this entry?')
  confirmRemoveEntry() {
    this.service.delete(this.data.info.uuid).subscribe(() => {
      this.dialogRef.close({
        state: 'SUCCESS'
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private construirFormulario() {
    this.formulario = this.formBuilder.group({
      uuid: [],
      date: [{ value: '', disabled: true }, Validators.required],
      item: ['', Validators.required],
      amount: ['', Validators.required],
      payed: [],
      amountPayed: [],
    });
  }
}
