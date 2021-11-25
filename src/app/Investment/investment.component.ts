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

  public txtUserId: string = '';
  public txtTarget: number = 0;
  public cookieUserId: string | null = '';

  public Stock_Array: string[] = [];
  public sum3year: number = 0;
  public sum5year: number = 0;
  public Rate_1: number = 0;
  public Rate_2: number = 0;

  showInputUserId: boolean = false;

  constructor(public cookieService: CookieService, private GeneralService: GeneralService) {
    this.cookieUserId = this.cookieService.get('InvestmentUserId');
    if (this.cookieUserId == null || this.cookieUserId == '') {
      this.showInputUserId = true;
    }
    else {
      this.GetRecord(this.cookieUserId);
      //this.GetData();
    }
  }

  // constructor() { }

  ngOnInit(): void {

  }

  SetUserId(e: any) {
    this.cookieUserId = e.value;
    const expireDate: Date = new Date();
    expireDate.setFullYear(expireDate.getFullYear() + 1);
    this.cookieService.set('InvestmentUserId', e.value, expireDate);
    this.cookieUserId = e.value;
    this.showInputUserId = false;

    this.GetRecord(e.value);
    //this.GetData();
  }

  ResetUserId(e: any) {
    this.cookieService.delete('InvestmentUserId');
    this.txtUserId = '';
    this.txtTarget = 0;
    this.cookieUserId = null;
    this.Stock_Array = [];
    this.sum3year = 0;
    this.sum5year = 0;
    this.Rate_1 = 0;
    this.Rate_2 = 0;

    this.showInputUserId = true;
  }

  GetRecord(UserId: string) {
    this.GeneralService.getInvestmentRecord(UserId).subscribe(
      (response: string[]) => {

        response.forEach(x => {
          this.Stock_Array.push(x.toString());
          this.sum3year += Number(x.toString().split(',')[14]);
          this.sum5year += Number(x.toString().split(',')[20]);
        });
        if (this.txtTarget != null && this.txtTarget != 0) {
          this.Rate_1 = Number(((this.sum3year / this.txtTarget) * 100).toFixed(2).toString());
          this.Rate_2 = Number(((this.sum5year / this.txtTarget) * 100).toFixed(2).toString());
        }
      },
      (error: HttpErrorResponse) => this.GeneralService.HandleError(error)
    );
  }

  SetRate(e: any) {
    this.txtTarget = e.value;
    if (this.txtTarget != null && this.txtTarget != 0) {
      this.Rate_1 = Number(((this.sum3year / this.txtTarget) * 100).toFixed(2).toString());
      this.Rate_2 = Number(((this.sum5year / this.txtTarget) * 100).toFixed(2).toString());
    }
    else {
      this.Rate_1 = 0;
      this.Rate_2 = 0;
    }
  }

  SetRecord() {
    this.GeneralService.setInvestmentRecord("Kisky", "2999", 100, 100).subscribe(
      (response: any) => {
        console.log(response);
        //this.ARRAY = response;
      },
      (error: HttpErrorResponse) => this.GeneralService.HandleError(error)
    );
  }

}
