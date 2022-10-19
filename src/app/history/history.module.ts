import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HistoryComponent } from './history.component';

@NgModule({
  declarations: [HistoryComponent],
  imports: [CommonModule],
  exports: [HistoryComponent],
})
export class HistoryModule {}
