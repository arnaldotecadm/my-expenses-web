import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImportExportFormComponent } from "./import-export-form.component";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [ImportExportFormComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [ImportExportFormComponent],
})
export class ImportExportFormModule {}
