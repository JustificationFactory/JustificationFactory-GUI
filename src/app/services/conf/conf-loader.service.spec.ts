import {inject, TestBed} from '@angular/core/testing';

import {ConfLoaderService} from './conf-loader.service';

describe('ConfLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfLoaderService]
    });
  });

  it('should be created', inject([ConfLoaderService], (service: ConfLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
