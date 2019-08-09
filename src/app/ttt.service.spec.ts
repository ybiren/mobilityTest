import { TestBed, inject } from '@angular/core/testing';

import { TttService } from './ttt.service';

describe('TttService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TttService]
    });
  });

  it('should be created', inject([TttService], (service: TttService) => {
    expect(service).toBeTruthy();
  }));
});
