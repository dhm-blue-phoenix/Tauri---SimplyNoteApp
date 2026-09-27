import { TestBed } from '@angular/core/testing';
import { Navigate } from './navigate';

describe('Navigate', () => {
  let service: Navigate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Navigate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
