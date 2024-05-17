import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { InputNumberModule } from 'primeng/inputnumber'
import { CurrencyFormKeysEnum } from '../../app/enums/currency-form-keys.enum'
import { CurrencyCalculatorComponent } from './currency-calculator.component'

describe('CurrencyCalculatorComponent', () => {
  let component: CurrencyCalculatorComponent;
  let fixture: ComponentFixture<CurrencyCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyCalculatorComponent],
      imports: [ReactiveFormsModule, InputNumberModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Given
    // Component is created

    // Then
    expect(component).toBeTruthy();
  });

  it('should reset form on ngOnChanges', () => {
    // Given
    component.selectedCurrencyData = { date: '2024-05-17', rate: 1.2, currency: 'USD' };

    // Simulate the form being initialized
    component.currencyForm.controls[CurrencyFormKeysEnum.BASE_CURRENCY].setValue(100);
    component.currencyForm.controls[CurrencyFormKeysEnum.SELECTED_CURRENCY].setValue(200);

    // When
    component.ngOnChanges();

    // Then
    // Expect the form controls to be reset to 0 after ngOnChanges
    expect(component.baseCurrencyControl.value).toEqual(0);
    expect(component.selectedCurrencyControl.value).toEqual(0);
  });
});
