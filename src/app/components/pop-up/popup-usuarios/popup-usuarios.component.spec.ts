import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUsuariosComponent } from './popup-usuarios.component';

describe('PopupUsuariosComponent', () => {
  let component: PopupUsuariosComponent;
  let fixture: ComponentFixture<PopupUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
