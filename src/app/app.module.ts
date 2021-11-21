import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigatorComponent } from './Navigator/navigator.component';
import { IndexComponent } from './Index/index.component';
import { AqiComponent } from './Weather/aqi.component';
import { UltravioletComponent } from './Weather/ultraviolet.component';
import { InvestmentComponent } from './Investment/investment.component';

import { GeneralService } from './general.service';

import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularPaginatorModule } from 'angular-paginator';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CdkTableModule } from '@angular/cdk/table';
import { ChartsModule } from 'ng2-charts';

import { CookieService } from 'ngx-cookie-service';

const appRoutes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'aqi', component: AqiComponent },
  { path: 'ultraviolet', component: UltravioletComponent },
  { path: 'investment', component: InvestmentComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    AqiComponent,
    IndexComponent,
    UltravioletComponent,
    InvestmentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),

    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,

    AngularPaginatorModule,

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    //MatTableDataSource,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    CdkTableModule,
    ChartsModule
  ],
  exports: [MatSortModule, MatTableModule],
  providers: [GeneralService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }

