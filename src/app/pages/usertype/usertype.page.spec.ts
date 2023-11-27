import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsertypePage } from './usertype.page';

describe('UsertypePage', () => {
  let component: UsertypePage;
  let fixture: ComponentFixture<UsertypePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UsertypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
