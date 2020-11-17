import {TestBed} from '@angular/core/testing';

import {TicketEndpointService} from './ticket-endpoint.service';

describe('TicketEndpointService', () => {
  let service: TicketEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
