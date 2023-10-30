import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { ConfUserComponent } from "./conf-user.component";
import { ManutencaoRegistrosModule } from "./manutencao-registros/manutencao-registros.module";
import { ModalsModule } from "src/app/shared/modals/modals.module";

@NgModule({
  declarations: [ConfUserComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    ManutencaoRegistrosModule,
    ModalsModule
  ],
  exports: [ConfUserComponent],
})
export class ConfUserModule {}
