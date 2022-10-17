import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DistributionComponent } from './distribution.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [DistributionComponent],
  imports: [CommonModule, MatExpansionModule],
  exports: [DistributionComponent],
})
export class DistributionModule {}
