import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { MenuModule } from './menu/menu.module';
import { SwitchAccountComponent } from './switch-account/switch-account.component';
import { SwitchAccountModule } from './switch-account/switch-account.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MenuModule, SwitchAccountModule],
  exports: [MenuComponent, SwitchAccountComponent],
})
export class CoreModule {}
