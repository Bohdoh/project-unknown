import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameChaptersComponent } from './game-chapters.component';

describe('GameChaptersComponent', () => {
  let component: GameChaptersComponent;
  let fixture: ComponentFixture<GameChaptersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameChaptersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
