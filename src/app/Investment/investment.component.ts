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

  public txtStockId: string = '';
  public txtStockCount: string = '';
  public txtStockPrice: string = '';
  public btnAddStockDisabled: boolean = false;

  public Stock_Array: string[] = [];
  public sumEarning: number = 0;
  public sumRevenue: number = 0;
  public sumRate: number = 0;

  showInputUserId: boolean = false;

  constructor(public cookieService: CookieService, private GeneralService: GeneralService) {
    this.cookieUserId = this.cookieService.get('InvestmentUserId');
    if (this.cookieUserId == null || this.cookieUserId == '') {
      this.showInputUserId = true;
    }
    else {
      this.GetRecord(this.cookieUserId, 'true');
    }
  }

  // constructor() { }

  ngOnInit(): void {

  }

  SetUserId(e: any) {
    this.cookieUserId = e.value;
    if (this.cookieUserId != '') {
      const expireDate: Date = new Date();
      expireDate.setFullYear(expireDate.getFullYear() + 1);
      this.cookieService.set('InvestmentUserId', e.value, expireDate);
      this.cookieUserId = e.value;
      this.showInputUserId = false;

      this.GetRecord(e.value, 'false');
    }
  }

  ResetUserId(e: any) {
    this.cookieService.delete('InvestmentUserId');
    this.txtUserId = '';
    this.txtTarget = 0;
    this.cookieUserId = null;
    this.txtStockId = '';
    this.txtStockCount = '';
    this.txtStockPrice = '';
    this.Stock_Array = [];
    this.sumEarning = 0;
    this.sumRevenue = 0;
    this.sumRate = 0;

    this.showInputUserId = true;
  }

  GetRecord(UserId: string, NeedUpdate: string) {
    this.btnAddStockDisabled = true;
    this.txtStockId = '';
    this.txtStockCount = '';
    this.txtStockPrice = '';

    this.GeneralService.getInvestmentRecord(UserId, NeedUpdate).subscribe(
      (response: string[]) => {
        this.Stock_Array = [];
        this.sumEarning = 0;
        this.sumRevenue = 0;
        response.forEach(x => {
          this.Stock_Array.push(x);
          this.sumEarning += (Number(x.toString().split(',')[9]));
          this.sumRevenue += (Number(x.toString().split(',')[13]));
        });
        if (this.txtTarget != null && this.txtTarget != 0) {
          this.sumRate = Number(((this.sumRevenue / this.txtTarget) * 100).toFixed(2).toString());
        }
        this.btnAddStockDisabled = false;
      },
      (error: HttpErrorResponse) => this.GeneralService.HandleError(error)
    );

  }

  SetRate(e: any) {
    this.txtTarget = e.value;
    if (this.txtTarget != null && this.txtTarget != 0) {
      this.sumRate = Number(((this.sumRevenue / this.txtTarget) * 100).toFixed(2).toString());
    }
    else {
      this.sumRate = 0;
    }
  }

  SetRecord(StockId: string, StockCount: string, StockPrice: string) {
    var UserId = this.cookieUserId == null ? '' : this.cookieUserId.toString();
    if (UserId != '' && StockId != '' && Number(StockCount) > 0 && Number(StockPrice) > 0) {
      this.GeneralService.setInvestmentRecord(UserId, StockId, Number(StockCount), Number(StockPrice)).subscribe(
        (response: boolean) => {
          if (response) {
            this.GetRecord(UserId, 'true');
          }
          else {
            this.GetRecord(UserId, 'false');
          }
          this.txtStockId = '';
          this.txtStockCount = '';
          this.txtStockPrice = '';

        },
        (error: HttpErrorResponse) => this.GeneralService.HandleError(error)
      );
    }
  }

}
