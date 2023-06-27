import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogContentRightComponent } from './blog-content-right.component';

describe('BlogContentRightComponent', () => {
  let component: BlogContentRightComponent;
  let fixture: ComponentFixture<BlogContentRightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogContentRightComponent]
    });
    fixture = TestBed.createComponent(BlogContentRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
