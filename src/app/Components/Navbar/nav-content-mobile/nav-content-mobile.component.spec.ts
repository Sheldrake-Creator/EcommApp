import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavContentMobileComponent } from './nav-content-mobile.component';

describe('NavContentMobileComponent', () => {
  let component: NavContentMobileComponent;
  let fixture: ComponentFixture<NavContentMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavContentMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavContentMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
