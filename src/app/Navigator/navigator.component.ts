import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { GeneralService } from '../general.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
})
export class NavigatorComponent {
  [x: string]: any;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  // toggle SideNav
  isExpanded = true;

  // toggle Weather Sub Menu
  isWeatherExpanded = false;
  isWeatherShowing = true;
  showWeatherSubmenu: boolean = false;

  // toggle Finance Sub Menu
  isFinanceExpanded = false;
  isFinanceShowing = true;
  showFinanceSubmenu: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private _GeneralService: GeneralService) { }

  public SideNavTitle = 'Demo Project';
  public NavTitle = '';
  public IndexImage = '';
  public IndexQuote = '';
  public IndexTimer = '';

  ngOnInit() {
    this.getQuote();
    setInterval(() => {
      this.getQuote();
    }, 10000);
    setInterval(() => {
      var d = new Date();
      this.IndexTimer = d.getFullYear() + '/' + d.getMonth() + '/' + d.getDay() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds().toString().padStart(2, '0');
    }, 1000);
  }

  getQuote() {
    this._GeneralService.getQuote().subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.IndexImage = response[0].image;
          this.IndexQuote = response[0].quote;
        } else {
          this.IndexImage = '';
          this.IndexQuote = '';
        }
      },
      (error: HttpErrorResponse) => this._GeneralServiceFFF.HandleError(error)
    );
  }

  get SumValue() {
    return this.isExpanded;
  }
}