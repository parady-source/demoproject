import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
})
export class NavigatorComponent {
  [x: string]: any;
  isHandset$: Observable<boolean>

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

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );
  }

  public SideNavTitle = 'Demo Project';
  public NavTitle = '';
  public IndexTimer = '';

  ngOnInit() {
    setInterval(() => {
      var d = new Date();
      this.IndexTimer =
        d.getFullYear().toString() + '/' + (d.getMonth() + 1).toString().padStart(2, '0') + '/' + d.getDate().toString().padStart(2, '0')
        + ' '
        + d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0') + ':' + d.getSeconds().toString().padStart(2, '0');
    }, 1000);
  }

  get SumValue() {
    return this.isExpanded;
  }
}
