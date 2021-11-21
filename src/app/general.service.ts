import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
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

  InvestmentReadUrl = 'https://script.google.com/macros/s/AKfycbyE5NgktbSCmJcD5lC2JKQugTlFarRmkH5VoxwBqdxCOBKhDzcnbmx4pYgK4-8hgKRr/exec';
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

    const URL = this.InvestmentReadUrl;

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Special-Request-Header',
      'Access-Control-Allow-Credentials': 'true',
    });

    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers.set('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Special-Request-Header');
    headers.set('Access-Control-Allow-Credentials', 'true');

    let options = { headers };

    // return this.http.get<any>(URL, options);
    return this.http.jsonp<any>(URL, 'jsoncallback');

  }

  public addInvestmentRecord(userid: string, stockid: string, count: number, price: number): Observable<boolean> {
    const URL = this.InvestmentCreateUrl;

    let body = { 'userid': userid, 'stockid': stockid, 'count': count, 'price': price };

    let headers = new HttpHeaders({

    });

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
