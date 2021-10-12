import { Component, OnInit } from "@angular/core";
import { ImportExportService } from "../import-export.service";

@Component({
  selector: "app-import-export-form",
  templateUrl: "./import-export-form.component.html",
  styleUrls: ["./import-export-form.component.css"],
})
export class ImportExportFormComponent implements OnInit {
  file: File;
  transactionList = [];

  constructor(private service: ImportExportService) {}

  ngOnInit(): void {}

  jsonInputChange(fileInputEvent: any) {
    this.file = fileInputEvent.target.files[0];
  }

  parseFile() {
    if (!this.file) {
      console.log("File not selected");
      return;
    }

    this.service.parseFile(this.file).subscribe((data: any) => {
      this.transactionList = data;
    });
  }

  saveBatch() {
    this.service.saveBatch(this.transactionList).subscribe((data) => {
      console.log(data);
    });
  }

  padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
