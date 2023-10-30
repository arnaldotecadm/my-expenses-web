import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoRegistrosComponent } from './manutencao-registros.component';

describe('ManutencaoRegistrosComponent', () => {
  let component: ManutencaoRegistrosComponent;
  let fixture: ComponentFixture<ManutencaoRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManutencaoRegistrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutencaoRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
