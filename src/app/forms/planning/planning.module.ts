import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalAgendamentoModule } from './modal-agendamento/modal-agendamento.module';
import { PlanningComponent } from './planning.component';

@NgModule({
  declarations: [PlanningComponent],
  imports: [CommonModule, ModalAgendamentoModule],
  exports: [PlanningComponent],
})
export class PlanningModule {}
