import { TestBed } from '@angular/core/testing';

import { TableStateService } from './table-state.service';

describe('TableStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableStateService = TestBed.get(TableStateService);
    expect(service).toBeTruthy();
  });
});
