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

  constructor(private breakpointObserver: BreakpointObserver) { }

  public SideNavTitle = 'Demo Project';
  public NavTitle = 'Demo Project';
}