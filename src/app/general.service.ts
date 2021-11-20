import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { General } from './general';

@Injectable({
  providedIn: 'root',
})

export class Record {
  userid: string = "";
  stockid: string = "";
  count: number = 0;
  price: number = 0;
}

@Injectable()
export class GeneralService {

  url = 'https://data.epa.gov.tw/api';
  apikey = '0874be33-c993-4def-8726-6cc53c1c3684';

  InvestmentReadUrl = 'https://script.google.com/macros/s/AKfycbzBfuHbWUFnXyBAlJpfSUspskVWUxQtPJzr_tg4PIWbhZPenyTZ-NfNevfUS3EffZUo/exec';
  InvestmentCreateUrl = 'https://script.google.com/macros/s/AKfycbykwleSn1wkNINOYoxhBhEZuwQPw-FgMBUm5FQ0oqY7BBaOt0dWkx8aTc2BmdMzkpbq/exec?';

  constructor(private http: HttpClient) { }

  public getAQIRecord(
  ): Observable<any> {
    const URL = this.url + '/v1/aqx_p_432?format=json&api_key=' + this.apikey;
    return this.http.get<any>(URL);
  }

  public getUVRecord(
  ): Observable<any> {
    const URL = this.url + '/v1/uv_s_01?format=json&api_key=' + this.apikey;
    return this.http.get<any>(URL);
  }

  public getInvestmentRecord(
  ): Observable<any> {

    // fetch(this.InvestmentReadUrl, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'text/plain;charset=utf-8',
    //   }
    // }).then(response => {
    //   console.log("success:", response);
    //   return response;
    // }).catch(err => {
    //   console.log("Error:" + err);
    //   return err;
    // });

    const URL = this.InvestmentReadUrl;

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Special-Request-Header',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400'
    });

    let options = { headers };

    return this.http.get<any>(URL, options);

  }

  public addInvestmentRecord(userid: string, stockid: string, count: number, price: number): Observable<boolean> {
    const URL = this.InvestmentCreateUrl;

    let body = { 'userid': userid, 'stockid': stockid, 'count': count, 'price': price };

    let headers = new HttpHeaders({
      'Content-Type': 'text/json',
      'Access-Control-Allow-Origin': 'https://script.google.com',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Special-Request-Header',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400'
    });

    headers.set('Access-Control-Allow-Origin', 'https://script.google.com');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    headers.set('Access-Control-Allow-Credentials', 'true');

    let options = {
      headers
    };

    return this.http.post<any>(URL, body, options);
  }

  // http呼叫錯誤處理
  public HandleError(e: any): void {
    // console.log(e);
    alert(e.error.error);
  }
}
