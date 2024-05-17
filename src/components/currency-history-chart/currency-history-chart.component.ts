import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { UIChart } from 'primeng/chart'
import { CurrencyI } from '../../app/interfaces/currency-i'

@Component({
  selector: 'app-currency-history-chart',
  templateUrl: './currency-history-chart.component.html',
  styleUrl: 'currency-history-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyHistoryChartComponent {
  @Input() currencies!: CurrencyI[];
  @Input() chartConfig!: UIChart['data'];
  @Output() onCurrencySelect = new EventEmitter<CurrencyI>();

  private _chartOptions: UIChart['options'] = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  get chartOptions(): any {
    return this._chartOptions;
  }

  selectedCurrency!: CurrencyI;
}
