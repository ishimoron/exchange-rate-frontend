import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CurrencyI } from '../interfaces/currency-i'

@Injectable()
export class CurrencyService {
  private apiURL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<CurrencyI[]> {
    return this.http.get<CurrencyI[]>(`${this.apiURL}/currencies`);
  }

  getCurrencyHistory(currency: string): Observable<CurrencyI[]> {
    return this.http.post<CurrencyI[]>(`${this.apiURL}/history/${currency}`, {
      currency: currency,
    });
  }
}
