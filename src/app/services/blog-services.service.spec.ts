import { TestBed } from '@angular/core/testing';

import { BlogServicesService } from './blog-services.service';

describe('BlogServicesService', () => {
  let service: BlogServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
