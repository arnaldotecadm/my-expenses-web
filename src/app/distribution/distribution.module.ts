import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DistributionComponent } from './distribution.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select'; 

@NgModule({
  declarations: [DistributionComponent],
  imports: [CommonModule, MatExpansionModule, MatSelectModule],
  exports: [DistributionComponent],
})
export class DistributionModule {}
