import {inject, TestBed} from '@angular/core/testing';

import {WsRetrieverService} from './ws-retriever.service';

describe('WsRetrieverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsRetrieverService]
    });
  });

  it('should be created', inject([WsRetrieverService], (service: WsRetrieverService) => {
    expect(service).toBeTruthy();
  }));
});
