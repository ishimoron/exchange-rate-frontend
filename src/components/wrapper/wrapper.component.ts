import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core'
import { UIChart } from 'primeng/chart'
import { Subject, takeUntil } from 'rxjs'
import { CurrencyI } from '../../app/interfaces/currency-i'
import { CurrencyService } from '../../app/services/currency.service'

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapperComponent implements OnInit, OnDestroy {
  private initialChartConfig: UIChart['data'] = {
    labels: [''],
    datasets: [{ label: '', data: [] }],
  };
  private destroy$ = new Subject<void>();

  currencies = signal<CurrencyI[]>([]);
  selectedCurrency = signal<CurrencyI | null>(null);
  chartConfig = signal<UIChart['data']>(this.initialChartConfig);

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService
      .getCurrencies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.currencies.set(data);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelectedCurrencyChange(selectedCurrency: CurrencyI): void {
    if (!selectedCurrency) return;
    this.selectedCurrency.set(selectedCurrency);
    this.getHistoryForCurrency(selectedCurrency);
  }

  private getHistoryForCurrency(selectedCurrency: CurrencyI): void {
    this.currencyService
      .getCurrencyHistory(selectedCurrency.currency)
      .pipe(takeUntil(this.destroy$))
      .subscribe((historyData: CurrencyI[]) => {
        this.chartConfig.set(this.getChartConfig(historyData));
      });
  }

  private getChartConfig(historyData: CurrencyI[]): UIChart['data'] {
    return {
      labels: historyData.map((entry) => entry.date),
      datasets: [
        {
          label: historyData[0].currency,
          data: historyData.map((entry) => entry.rate),
        },
      ],
    };
  }
}
