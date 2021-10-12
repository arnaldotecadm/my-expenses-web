import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImportExportFormModule } from "./import-export-form/import-export-form.module";
import { ImportExportFormComponent } from "./import-export-form/import-export-form.component";

@NgModule({
  declarations: [],
  imports: [CommonModule, ImportExportFormModule],
  exports: [ImportExportFormComponent],
})
export class ImportExportModule {}
