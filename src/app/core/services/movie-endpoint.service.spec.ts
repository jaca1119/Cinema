import {TestBed} from '@angular/core/testing';

import {MovieEndpointService} from './movie-endpoint.service';

describe('MovieEndpointService', () => {
  let service: MovieEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
