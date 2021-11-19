import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Injectable,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { observable, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { GeneralService } from '../general.service';
import { General } from '../general';
import { groupBy } from 'rxjs/operators';

@Component({
  selector: 'app-ultraviolet',
  templateUrl: './ultraviolet.component.html',
  styleUrls: ['./ultraviolet.component.css']
})
export class UltravioletComponent implements OnInit {

  public displayedColumns: string[] = ['County', 'SiteName', 'PublishAgency', 'UVI', 'PublishTime'];
  public headers: string[] = ['縣市', '測站名稱', '發布機關', '紫外線指數', '發布時間'];

  public UVRecordDataSource = new MatTableDataSource<any>();
  public items: Array<any> = [];
  public results: Array<any> = [];

  constructor(private GeneralService: GeneralService) { }

  ngOnInit() {
    this.getData(); //程式一啟動時即撈取資料
  }
  getData() {
    this.GeneralService.getUVRecord().subscribe(
      (response: any) => {

        //1.取得標題 (不需要因為沒有要全用)
        //response.fields.forEach((element: any) => this.displayedColumns.push(element.id));
        //response.fields.forEach((element: any) => console.log(element.id));

        //2.取得資料
        //response.fields.forEach((element: any) => console.log(element.id));
        this.UVRecordDataSource.data = response.records;
        this.items = response.records;

      },
      (error: HttpErrorResponse) => this.GeneralService.HandleError(error)
    );
  }

}

