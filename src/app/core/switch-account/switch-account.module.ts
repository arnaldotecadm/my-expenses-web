import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { SwitchAccountComponent } from './switch-account.component';

@NgModule({
  declarations: [SwitchAccountComponent],
  imports: [CommonModule, MatExpansionModule],
  exports: [SwitchAccountComponent],
})
export class SwitchAccountModule {}
