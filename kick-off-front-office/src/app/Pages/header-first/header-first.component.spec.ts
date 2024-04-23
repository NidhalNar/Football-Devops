import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFirstComponent } from './header-first.component';

describe('HeaderFirstComponent', () => {
  let component: HeaderFirstComponent;
  let fixture: ComponentFixture<HeaderFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderFirstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
