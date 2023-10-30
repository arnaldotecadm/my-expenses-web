import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ConfUserComponent } from "./conf-user.component";
import { ConfUserService } from "./conf-user.service";

describe("ConfUserComponent", () => {
  let component: ConfUserComponent;
  let fixture: ComponentFixture<ConfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfUserComponent],
      imports: [
        MatTabsModule,
        MatTableModule,
        ReactiveFormsModule,
        FormsModule,
        MatExpansionModule,
        MatCheckboxModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [Location, ConfUserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
