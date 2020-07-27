import { TestBed } from '@angular/core/testing';

import { AngularModalboxService } from './angular-modalbox.service';

describe('AngularModalboxService', () => {
  let service: AngularModalboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularModalboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
