import { TestBed, inject } from '@angular/core/testing';

import { AutomatedMailService } from './automated.mail.service';

describe('Automated.MailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutomatedMailService]
    });
  });

  it('should be created', inject([AutomatedMailService], (service: AutomatedMailService) => {
    expect(service).toBeTruthy();
  }));
});
