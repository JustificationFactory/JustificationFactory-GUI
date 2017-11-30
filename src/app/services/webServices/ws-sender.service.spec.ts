import {inject, TestBed} from '@angular/core/testing';

import {WsSenderService} from './ws-sender.service';

describe('WsSenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsSenderService]
    });
  });

  it('should be created', inject([WsSenderService], (service: WsSenderService) => {
    expect(service).toBeTruthy();
  }));
});
