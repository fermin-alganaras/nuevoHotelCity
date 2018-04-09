import { TestBed, inject } from '@angular/core/testing';

import { GalleryResolverService } from './gallery-resolver.service';

describe('GalleryResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GalleryResolverService]
    });
  });

  it('should be created', inject([GalleryResolverService], (service: GalleryResolverService) => {
    expect(service).toBeTruthy();
  }));
});
