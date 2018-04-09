import { TestBed, inject } from '@angular/core/testing';

import { PricingResolverService } from './pricing-resolver.service';

describe('PricingResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PricingResolverService]
    });
  });

  it('should be created', inject([PricingResolverService], (service: PricingResolverService) => {
    expect(service).toBeTruthy();
  }));
});
