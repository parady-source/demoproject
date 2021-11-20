import { Component, OnInit, Injectable } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { observable, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { GeneralService } from '../general.service';
import { General } from '../general';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})

export class InvestmentComponent implements OnInit {

  txtUserId = '';
  cookieUserId = '';

  showInputUserId: boolean = false;

  constructor(public cookieService: CookieService, private GeneralService: GeneralService) {
    this.cookieUserId = this.cookieService.get('UserId');
    if (this.cookieUserId == null || this.cookieUserId == '') {
      this.showInputUserId = true;
    }

  }

  // constructor() { }

  ngOnInit(): void {
    this.GetRecord();
    //this.SetRecord();
  }

  GetUserId(e: any) {
    this.cookieUserId = e.value;
    const expireDate: Date = new Date();
    // expireDate.setSeconds(expireDate.getSeconds() + 10);
    expireDate.setFullYear(expireDate.getFullYear() + 1);
    this.cookieService.set('UserId', e.value, expireDate);
    this.showInputUserId = false;
  }

  SetRecord() {
    this.GeneralService.addInvestmentRecord("xx", "2999", 100, 100);
  }

  GetRecord() {
    this.GeneralService.getInvestmentRecord().subscribe(
      response => response,
      (error: HttpErrorResponse) => this.GeneralService.HandleError(error)
    );
  }

}
