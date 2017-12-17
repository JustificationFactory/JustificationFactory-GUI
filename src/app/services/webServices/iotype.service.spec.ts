import { TestBed, inject } from '@angular/core/testing';

import { IOTypeService } from './iotype.service';

describe('IOTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IOTypeService]
    });
  });

  it('should be created', inject([IOTypeService], (service: IOTypeService) => {
    expect(service).toBeTruthy();
  }));
});
