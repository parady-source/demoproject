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
  apikey = '6545dff2-8344-4847-a55a-f45bb44af086';

  stockurl = 'https://www.tpex.org.tw/openapi/v1/tpex_mainboard_peratio_analysis';

  Get_Cors_Api_Url = 'https://script.google.com/macros/s/AKfycbzhDPSV5yBGS6ALkxCoReP1fK0-XBh41uu9bfhpeb4d5DSeOA9fL4POLGJsSEA_neoIkA/exec?';

  InvestmentReadUrl = 'https://script.google.com/macros/s/AKfycbz0nlvVLj1YOjynW0RPbcoUGvZbSPNWFBeBU41fsmarRwFhkEigrvXSs9TMA718vMUv/exec?';
  InvestmentCreateUrl = 'https://script.google.com/macros/s/AKfycbyKhzrLNNdAxJn75Kptlpjb0bTXzKGYLqi0Hblj2_RFk9FXR6CE04uElgyXcdurhgRkTg/exec?';

  constructor(private http: HttpClient) { }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://data.epa.gov.tw/',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Max-Age': '86400'
    }),
    method: 'GET', // GET, POST, PUT, DELETE
    mode: 'no-cors'
  };

  public getQuote(
  ): Observable<any> {
    const URL = 'https://thesimpsonsquoteapi.glitch.me/quotes';
    return this.http.get<any>(URL);
  }

  public getAQIRecord(
  ): Observable<any> {
    const URL = this.url + '/v2/aqx_p_432?api_key=' + this.apikey;
    return this.http.get<any>(this.Get_Cors_Api_Url + 'url=' + URL, this.httpOptions);
  }

  public getUVRecord(
  ): Observable<any> {
    const URL = this.url + '/v2/uv_s_01?api_key=' + this.apikey;
    return this.http.get<any>(this.Get_Cors_Api_Url + 'url=' + URL, this.httpOptions);
  }

  public getInvestmentRecord(UserId: string, NeedUpdate: string): Observable<any> {
    const URL = this.InvestmentReadUrl;
    return this.http.get<string[]>(URL + 'UserId=' + UserId + '&NeedUpdate=' + NeedUpdate);
  }

  public setInvestmentRecord(userid: string, stockid: string, count: number, price: number
  ): Observable<boolean> {
    const URL = this.InvestmentCreateUrl;
    return this.http.get<any>(URL + 'UserId=' + userid + '&StockId=' + stockid + '&Count=' + count + '&Price=' + price);
  }

  // http呼叫錯誤處理
  public HandleError(e: any): void {
    // console.log(e);
    alert(e.error.error);
  }
}
