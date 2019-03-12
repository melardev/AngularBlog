import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagOrCategoryCardComponent } from './tag-or-category-card.component';

describe('TagOrCategoryCardComponent', () => {
  let component: TagOrCategoryCardComponent;
  let fixture: ComponentFixture<TagOrCategoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagOrCategoryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagOrCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
