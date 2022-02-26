import { TestBed } from '@angular/core/testing';

import { NgxOnsenuiService } from './ngx-onsenui.service';

describe('NgxOnsenuiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxOnsenuiService = TestBed.get(NgxOnsenuiService);
    expect(service).toBeTruthy();
  });
});
