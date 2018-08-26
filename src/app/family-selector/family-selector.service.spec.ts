import { TestBed, inject } from '@angular/core/testing';

import { FamilySelectorService } from './family-selector.service';

describe('FamilySelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FamilySelectorService]
    });
  });

  it('should be created', inject([FamilySelectorService], (service: FamilySelectorService) => {
    expect(service).toBeTruthy();
  }));
});
