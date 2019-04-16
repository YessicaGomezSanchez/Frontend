import { TestBed } from '@angular/core/testing';

import { TaxisService } from './taxis.service';

describe('TaxisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaxisService = TestBed.get(TaxisService);
    expect(service).toBeTruthy();
  });
});
