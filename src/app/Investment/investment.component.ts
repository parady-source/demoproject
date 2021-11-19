import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  txtUserId = '';
  cookieUserId = '';

  showInputUserId: boolean = false;

  constructor(public cookieService: CookieService) {
    this.cookieUserId = this.cookieService.get('UserId');
    if (this.cookieUserId == null || this.cookieUserId == '') {
      this.showInputUserId = true;
    }

  }

  ngOnInit(): void { }

  GetUserId(e: any) {
    this.cookieUserId = e.value;
    const expireDate: Date = new Date();
    // expireDate.setSeconds(expireDate.getSeconds() + 10);
    expireDate.setFullYear(expireDate.getFullYear() + 1);
    this.cookieService.set('UserId', e.value, expireDate);
    this.showInputUserId = false;
  }

}
