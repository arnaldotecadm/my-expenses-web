import { Component, OnInit } from "@angular/core";
import { MenssageService } from "src/app/shared/notification/notification.service";
import { ImportExportService } from "../import-export.service";

@Component({
  selector: "app-import-export-form",
  templateUrl: "./import-export-form.component.html",
  styleUrls: ["./import-export-form.component.css"],
})
export class ImportExportFormComponent implements OnInit {
  file!: File | undefined;
  data: any = {
    transactions: []
  };

  constructor(
    private service: ImportExportService,
    private notificationService: MenssageService
  ) {}

  ngOnInit(): void {}

  jsonInputChange(fileInputEvent: any) {
    this.file = fileInputEvent.target.files[0];
    this.parseFile();
  }

  parseFile() {
    if (!this.file) {
      this.notificationService.showError("No File selected");
      return;
    }

    this.service.parseFile(this.file).subscribe((data: any) => {
      this.data = data;
    });
  }

  saveBatch() {
    this.service.saveBatch(this.data).subscribe((data: any) => {
      this.notificationService.showInfo(data.message);
      this.data = {
        transactions: []
      };
      window.location.reload()
    });
  }

  padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
