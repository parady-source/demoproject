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
  constructor(private http: HttpClient) { }

  public getAQIRecord(
  ): Observable<any> {
    const URL = this.url + '/v1/aqx_p_432?api_key=9be7b239-557b-4c10-9775-78cadfc555e9';
    return this.http.get<any>(URL);
  }

  // http呼叫錯誤處理
  public HandleError(e: any): void {
    // console.log(e);
    alert(e.error.error);
  }
}
