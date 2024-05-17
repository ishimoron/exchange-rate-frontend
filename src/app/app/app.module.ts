import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import { RouterModule, RouterOutlet } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { ChartModule } from 'primeng/chart'
import { DropdownModule } from 'primeng/dropdown'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { CurrencyCalculatorComponent } from '../../components/currency-calculator/currency-calculator.component'
import { CurrencyHistoryChartComponent } from '../../components/currency-history-chart/currency-history-chart.component'
import { WrapperComponent } from '../../components/wrapper/wrapper.component'
import { AppComponent } from '../app.component'
import { routes } from '../app.routes'
import { CurrencyService } from '../services/currency.service'

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    CurrencyHistoryChartComponent,
    CurrencyCalculatorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    BrowserModule,
    RouterModule.forRoot(routes),
    ButtonModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    ChartModule,
  ],
  providers: [CurrencyService, provideAnimations()],
  bootstrap: [AppComponent],
})
export class AppModule {}
