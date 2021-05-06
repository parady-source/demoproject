import {
  Component,
  OnInit,
  Injectable,
  AfterViewInit,
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

@Component({
  selector: 'app-aqi',
  templateUrl: './aqi.component.html',
  styleUrls: ['./aqi.component.css']
})
export class AqiComponent implements OnInit {
  public item: Array<any> = new Array<any>();

  //'SiteId', 'SO2', 'CO', 'O3', 'NO2', 'NOx', 'NO', 
  public displayedColumns: string[] = ['County', 'SiteName', 'AQI', 'Pollutant', 'Status',  'PM10', 'PM2.5', 'PublishTime'];
  public AQIRecordDataSource = new MatTableDataSource<any>();

  constructor(private GeneralService: GeneralService) { }
  ngOnInit() {
    this.getData(); //程式一啟動時即撈取資料
  }
  getData() {
    this.GeneralService.getAQIRecord().subscribe(
      (response: any) => {

        //1.取得標題 (不需要因為沒有要全用)
        //response.fields.forEach((element: any) => this.displayedColumns.push(element.id));
        //response.fields.forEach((element: any) => console.log(element.id));

        //2.取得資料
        //response.fields.forEach((element: any) => console.log(element.id));
        this.AQIRecordDataSource.data = response.records;

      },
      (error: HttpErrorResponse) => this.GeneralService.HandleError(error)
    );
  }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild('filter') filter: ElementRef | undefined;

  ngAfterViewInit() {
    this.AQIRecordDataSource.sort = this.sort;
    this.AQIRecordDataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.AQIRecordDataSource.filter = filterValue.trim().toLowerCase();
  }

  changed(e: any) {
    this.AQIRecordDataSource.filter = e.target.value;
  }

}