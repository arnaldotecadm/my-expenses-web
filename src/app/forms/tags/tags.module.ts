import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagListComponent } from "./tag-list/tag-list.component";
import { TagListModule } from "./tag-list/tag-list.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, TagListModule],
  exports: [TagListComponent],
})
export class TagsModule {}
