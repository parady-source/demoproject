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

  InvestmentReadUrl = 'https://script.google.com/macros/s/AKfycbxw0GdJofrI5Q0ogY70iIXD5vu_UD3lyLoUxKxbEozSNC2oVGijHqqzJx4gLdHiFBUH/exec?';
  InvestmentCreateUrl = 'https://script.google.com/macros/s/AKfycbxiHAnSCL2AjxE5iq6g7OwAiAEZvze7yfgxztC7gGOeOCtdc3A59sJh10_6LdHqC5RIHQ/exec?';

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

  public getInvestmentRecord(UserId: string): Observable<any> {
    const URL = this.InvestmentReadUrl;
    return this.http.get<string[]>(URL + 'UserId=' + UserId);
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
