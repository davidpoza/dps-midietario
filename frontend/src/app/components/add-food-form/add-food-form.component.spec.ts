import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodFormComponent } from './add-food-form.component';

describe('AddFoodFormComponent', () => {
  let component: AddFoodFormComponent;
  let fixture: ComponentFixture<AddFoodFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFoodFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
