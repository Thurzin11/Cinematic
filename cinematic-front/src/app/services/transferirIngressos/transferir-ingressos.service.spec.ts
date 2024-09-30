import { TestBed } from '@angular/core/testing';

import { TransferirIngressosService } from './transferir-ingressos.service';

describe('TransferirIngressosService', () => {
  let service: TransferirIngressosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferirIngressosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
