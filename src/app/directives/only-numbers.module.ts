import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OnlyNumberDirective } from './only-numbers.directive';

@NgModule({
  declarations: [OnlyNumberDirective],
  imports: [CommonModule],
  exports: [OnlyNumberDirective],
})
export class DirectivesModule {}
