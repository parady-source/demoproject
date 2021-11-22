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
import { element } from 'protractor';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-aqi',
  templateUrl: './aqi.component.html',
  styleUrls: ['./aqi.component.css']
})
export class AqiComponent implements OnInit {
  public item: Array<any> = new Array<any>();

  //'SiteId', 'SO2', 'CO', 'O3', 'NO2', 'NOx', 'NO', 
  public displayedColumns: string[] = ['County', 'SiteName', 'AQI', 'Pollutant', 'Status', 'PM10', 'PM2.5', 'PublishTime'];
  public AQIRecordDataSource = new MatTableDataSource<any>();

  //1. Rank Best Top 3 (Donut Chart)

  //2. Rank Worst Top 3 (Donut Chart)

  //3. City List (Bar Chart)
  public barChartData: ChartDataSets[] = [];
  public barChartLabels: Label[] = [];

  public barChartOptions: any;
  public barChartType: any = 'bar';
  public barChartLegend: any = true;

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

        //console.log(response.records[0]['County']);
        //console.log(this.AQIRecordDataSource.data);

        //3.繪製Chart
        //3-1 Best Rank

        //3-2 Worst Rank

        //3-3 City List
        //Data
        let County_Array: string[] = [];
        for (let i = 0; i < response.records.length; i++) {
          County_Array.push(response.records[i]['County']);
        }
        const setType = new Set(County_Array.map(county => county));
        County_Array = [...setType];

        let Count_AQI: number = 0;
        let Count_O3: number = 0;
        let Count_PM25: number = 0;
        let Count_PM10: number = 0;

        let AQI_Array: number[] = [];
        let O3_Array: number[] = [];
        let PM25_Array: number[] = [];
        let PM10_Array: number[] = [];

        let Color_1: string[] = [];
        let Color_2: string[] = [];
        let Color_3: string[] = [];
        let Color_4: string[] = [];

        for (var i = 0; i < County_Array.length; i++) {
          Color_1.push('#FF5F7E');
          Color_2.push('#FE856C');
          Color_3.push('#FCAB5A');
          Color_4.push('#FBD148');
        }

        for (let county of County_Array) {
          var temp_Array = response.records.filter((x: { County: string; }) => x.County == county);

          if (temp_Array.length < 1) {
            Count_AQI = 0; Count_O3 = 0; Count_PM25 = 0; Count_PM10 = 0;
          }
          else {
            Count_AQI = temp_Array.reduce((sum: any, current: { AQI: any; }) => sum + Number(current.AQI), 0) / temp_Array.length;
            Count_O3 = temp_Array.reduce((sum: any, current: { O3: any; }) => sum + Number(current.O3), 0) / temp_Array.length;
            Count_PM25 = temp_Array.reduce((sum: any, current: { 'PM2.5': any; }) => sum + Number(current['PM2.5']), 0) / temp_Array.length;
            Count_PM10 = temp_Array.reduce((sum: any, current: { 'PM10': any; }) => sum + Number(current.PM10), 0) / temp_Array.length;
          }

          AQI_Array.push(Number(Count_AQI.toFixed(2)));
          O3_Array.push(Number(Count_O3.toFixed(2)));
          PM25_Array.push(Number(Count_PM25.toFixed(2)));
          PM10_Array.push(Number(Count_PM10.toFixed(2)));
        }

        this.barChartData = [
          {
            label: 'AQI',
            data: AQI_Array,
            borderColor: Color_1,
            hoverBorderColor: Color_1,
            backgroundColor: Color_1,
            hoverBackgroundColor: Color_1,
            pointBorderColor: Color_1,
            pointBackgroundColor: Color_1,
            pointHoverBackgroundColor: Color_1,
            pointHoverBorderColor: Color_1,
            borderWidth: 1
          },
          {
            label: 'O3',
            data: O3_Array,
            borderColor: Color_2,
            hoverBorderColor: Color_2,
            backgroundColor: Color_2,
            hoverBackgroundColor: Color_2,
            pointBorderColor: Color_2,
            pointBackgroundColor: Color_2,
            pointHoverBackgroundColor: Color_2,
            pointHoverBorderColor: Color_2,
            borderWidth: 1
          },
          {
            label: 'PM2.5',
            data: PM25_Array,
            borderColor: Color_3,
            hoverBorderColor: Color_3,
            backgroundColor: Color_3,
            hoverBackgroundColor: Color_3,
            pointBorderColor: Color_3,
            pointBackgroundColor: Color_3,
            pointHoverBackgroundColor: Color_3,
            pointHoverBorderColor: Color_3,
            borderWidth: 1
          },
          {
            label: 'PM10',
            data: PM10_Array,
            borderColor: Color_4,
            hoverBorderColor: Color_4,
            backgroundColor: Color_4,
            hoverBackgroundColor: Color_4,
            pointBorderColor: Color_4,
            pointBackgroundColor: Color_4,
            pointHoverBackgroundColor: Color_4,
            pointHoverBorderColor: Color_4,
            borderWidth: 1
          },
        ];

        //Label
        this.barChartLabels = County_Array;

        //Options
        this.barChartOptions = {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: { beginAtZero: true, stepSize: 10, min: 0, max: 100 }
            }]
          }
        };

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