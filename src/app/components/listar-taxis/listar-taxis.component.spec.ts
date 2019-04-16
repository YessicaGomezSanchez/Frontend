import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTaxisComponent } from './listar-taxis.component';

describe('ListarTaxisComponent', () => {
  let component: ListarTaxisComponent;
  let fixture: ComponentFixture<ListarTaxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTaxisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTaxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
