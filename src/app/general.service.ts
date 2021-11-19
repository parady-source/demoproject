import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { General } from './general';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {

  url = 'https://data.epa.gov.tw/api';
  apikey = '0874be33-c993-4def-8726-6cc53c1c3684';

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

  // http呼叫錯誤處理
  public HandleError(e: any): void {
    // console.log(e);
    alert(e.error.error);
  }
}
