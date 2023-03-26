import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilInfoComponent } from './profil-info.component';

describe('ProfilInfoComponent', () => {
  let component: ProfilInfoComponent;
  let fixture: ComponentFixture<ProfilInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
