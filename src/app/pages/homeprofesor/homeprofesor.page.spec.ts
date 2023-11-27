import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeprofesorPage } from './homeprofesor.page';

describe('HomeprofesorPage', () => {
  let component: HomeprofesorPage;
  let fixture: ComponentFixture<HomeprofesorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeprofesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
