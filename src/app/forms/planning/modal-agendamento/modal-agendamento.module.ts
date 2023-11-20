import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/only-numbers.module';
import { ModalAgendamentoComponent } from './modal-agendamento.component';

@NgModule({
  declarations: [ModalAgendamentoComponent],
  imports: [CommonModule, ReactiveFormsModule, DirectivesModule],
  exports: [ModalAgendamentoComponent],
})
export class ModalAgendamentoModule {}
