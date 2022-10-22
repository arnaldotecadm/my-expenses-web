import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FourMonthsReviewComponent } from './four-months-review.component';

@NgModule({
  declarations: [FourMonthsReviewComponent],
  exports: [FourMonthsReviewComponent],
  imports: [CommonModule, MatSelectModule],
})
export class FourMonthsReviewModule {}
