import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { CurrencyI } from '../interfaces/currency-i'
import { CurrencyService } from './currency.service'

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService]
    });

    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    // Given (initial state)

    // When (service is created)

    // Then (service should be defined)
    expect(service).toBeTruthy();
  });

  it('should fetch currencies', () => {
    // Given (a list of mock currencies)
    const mockCurrencies: CurrencyI[] = [
      { date: '2024-05-16', rate: 1.0, currency: 'USD' },
      { date: '2024-05-16', rate: 0.9, currency: 'EUR' }
    ];

    // When (getCurrencies is called)
    service.getCurrencies().subscribe(currencies => {
      // Then (the returned currencies should match the mock data)
      expect(currencies.length).toBe(2);
      expect(currencies).toEqual(mockCurrencies);
    });

    // Expecting the HTTP request
    const req = httpMock.expectOne('http://localhost:5000/api/currencies');
    expect(req.request.method).toBe('GET');
    req.flush(mockCurrencies);
  });

  it('should fetch currency history', () => {
    // Given (a currency and its mock history data)
    const mockCurrencyHistory: CurrencyI[] = [
      { date: '2024-05-15', rate: 1.0, currency: 'USD' },
      { date: '2024-05-14', rate: 0.95, currency: 'USD' }
    ];
    const currency = 'USD';

    // When (getCurrencyHistory is called)
    service.getCurrencyHistory(currency).subscribe(history => {
      // Then (the returned history data should match the mock data)
      expect(history.length).toBe(2);
      expect(history).toEqual(mockCurrencyHistory);
    });

    // Expecting the HTTP request
    const req = httpMock.expectOne(`http://localhost:5000/api/history/${currency}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ currency: currency });
    req.flush(mockCurrencyHistory);
  });
});
