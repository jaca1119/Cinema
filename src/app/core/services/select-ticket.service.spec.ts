import {TestBed} from '@angular/core/testing';

import {SelectTicketService} from './select-ticket.service';

describe('SelectTicketService', () => {
  let service: SelectTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
