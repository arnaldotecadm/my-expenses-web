import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportFormComponent } from './import-export-form.component';

describe('ImportExportFormComponent', () => {
  let component: ImportExportFormComponent;
  let fixture: ComponentFixture<ImportExportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportExportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
