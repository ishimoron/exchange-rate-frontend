import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Subject, takeUntil } from 'rxjs'
import { CurrencyFormKeysEnum } from '../../app/enums/currency-form-keys.enum'
import { CurrencyI } from '../../app/interfaces/currency-i'

@Component({
  selector: 'app-currency-calculator',
  templateUrl: './currency-calculator.component.html',
  styleUrl: './currency-calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyCalculatorComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() selectedCurrencyData!: CurrencyI | null;
  private destroy$ = new Subject<void>();
  formKeys = CurrencyFormKeysEnum;

  currencyForm: FormGroup = new FormGroup({
    [this.formKeys.BASE_CURRENCY]: new FormControl(''),
    [this.formKeys.SELECTED_CURRENCY]: new FormControl(''),
  });

  ngOnChanges(): void {
    this.resetForm();
  }

  ngOnInit(): void {
    this.onBaseCurrencyChanged();
    this.onSelectedCurrencyChanged();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get baseCurrencyControl(): FormControl {
    return this.currencyForm.get(this.formKeys.BASE_CURRENCY) as FormControl;
  }

  get selectedCurrencyControl(): FormControl {
    return this.currencyForm.get(
      this.formKeys.SELECTED_CURRENCY
    ) as FormControl;
  }

  private resetForm(): void {
    this.baseCurrencyControl?.setValue(0, { emitEvent: false });
    this.selectedCurrencyControl?.setValue(0, { emitEvent: false });
  }

  private onBaseCurrencyChanged(): void {
    this.baseCurrencyControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.calculateFromBase();
      });
  }

  private onSelectedCurrencyChanged(): void {
    this.selectedCurrencyControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.calculateToBase();
      });
  }

  private calculateToBase(): void {
    const amountValue = this.selectedCurrencyControl?.value;
    const result = (amountValue / this.selectedCurrencyData!.rate).toFixed(2);
    this.baseCurrencyControl?.setValue(result, {
      emitEvent: false,
    });
  }

  private calculateFromBase(): void {
    const amountValue = this.baseCurrencyControl?.value;
    const result = (amountValue * this.selectedCurrencyData!.rate).toFixed(2);
    this.selectedCurrencyControl?.setValue(result, {
      emitEvent: false,
    });
  }
}
