import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasTableComponent } from './materias-table.component';

describe('MateriasTableComponent', () => {
  let component: MateriasTableComponent;
  let fixture: ComponentFixture<MateriasTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
