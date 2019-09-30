import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTaxisComponent } from './reporte-taxis.component';

describe('ReporteTaxisComponent', () => {
  let component: ReporteTaxisComponent;
  let fixture: ComponentFixture<ReporteTaxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteTaxisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTaxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
