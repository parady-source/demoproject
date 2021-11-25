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

  stockurl = 'https://www.tpex.org.tw/openapi/v1/tpex_mainboard_peratio_analysis';

  InvestmentReadUrl = 'https://script.google.com/macros/s/AKfycbwNHG8sRVE-fWKQM-i6JhpEjMs8vHNnW1o2-sDTnT38OlAi6C4TAVFuEevpfuxxUwnD/exec?';
  InvestmentCreateUrl = 'https://script.google.com/macros/s/AKfycbykwleSn1wkNINOYoxhBhEZuwQPw-FgMBUm5FQ0oqY7BBaOt0dWkx8aTc2BmdMzkpbq?';

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

  public getInvestmentData(): Observable<any> {
    const URL = this.stockurl;

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Max-Age': '1000'
    });

    let options = {
      headers
    };

    this.http.get<any>(URL, options).subscribe(data => {
      console.log(data);
    });

    return this.http.get<any>(URL, options);

  }

  public getInvestmentRecord(UserId: string): Observable<any> {
    const URL = this.InvestmentReadUrl;
    return this.http.get<any>(URL + 'UserId=' + UserId);
  }

  public addInvestmentRecord(userid: string, stockid: string, count: number, price: number): Observable<boolean> {
    const URL = this.InvestmentCreateUrl;

    let body = { 'userid': userid, 'stockid': stockid, 'count': count, 'price': price };

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Max-Age': '1000'
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
