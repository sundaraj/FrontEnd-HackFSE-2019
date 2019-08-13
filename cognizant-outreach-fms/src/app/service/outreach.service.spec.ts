import { TestBed } from '@angular/core/testing';

import { OutreachService } from './outreach.service';

describe('OutreachService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutreachService = TestBed.get(OutreachService);
    expect(service).toBeTruthy();
  });
});
