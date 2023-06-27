import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogContentLeftComponent } from './blog-content-left.component';

describe('BlogContentLeftComponent', () => {
  let component: BlogContentLeftComponent;
  let fixture: ComponentFixture<BlogContentLeftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogContentLeftComponent]
    });
    fixture = TestBed.createComponent(BlogContentLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
