import { TestBed, inject } from '@angular/core/testing';

import { WsConnectorService } from './ws-connector.service';

describe('WsConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsConnectorService]
    });
  });

  it('should be created', inject([WsConnectorService], (service: WsConnectorService) => {
    expect(service).toBeTruthy();
  }));
});
