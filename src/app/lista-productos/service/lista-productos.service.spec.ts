import { TestBed } from '@angular/core/testing';

import { ListaProductosService } from './lista-productos.service';

describe('ListaProductosServiceService', () => {
  let service: ListaProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
