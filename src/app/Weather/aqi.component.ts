import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ViewChildren,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';

import { GeneralService } from '../general.service';

import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-aqi',
  templateUrl: './aqi.component.html',
  styleUrls: ['./aqi.component.css']
})
export class AqiComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [''];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [{ data: [0], label: '' }];

  public item: Array<any> = new Array<any>();

  //'SiteId', 'SO2', 'CO', 'O3', 'NO2', 'NOx', 'NO', 
  public displayedColumns: string[] = ['County', 'SiteName', 'AQI', 'Pollutant', 'Status', 'PM2.5', 'PM10', 'PublishTime'];
  public AQIRecordDataSource = new MatTableDataSource<any>();

  //1. Rank
  public Top1: number = 0;
  public Top1_County: string = '';
  public Top2: number = 0;
  public Top2_County: string = '';
  public Top3: number = 0;
  public Top3_County: string = '';
  public Last1: number = 0;
  public Last1_County: string = '';
  public Last2: number = 0;
  public Last2_County: string = '';
  public Last3: number = 0;
  public Last3_County: string = '';

  public OtherTop: string[] = [];
  public OtherLast: string[] = [];

  //2. City List (Bar Chart)
  // public barChartData: ChartDataSets[] = [];
  // public barChartLabels: Label[] = [];

  // public barChartOptions: any;
  // public barChartType: any = 'bar';
  // public barChartLegend: any = true;

  constructor(private GeneralService: GeneralService) { }

  ngOnInit() {
    this.getData(); //程式一啟動時即撈取資料
  }

  getData() {
    this.GeneralService.getAQIRecord().subscribe(
      (response: any) => {

        console.log(response);

        //1.取得標題 (不需要因為沒有要全用)
        //response.fields.forEach((element: any) => this.displayedColumns.push(element.id));
        //response.fields.forEach((element: any) => console.log(element.id));

        //2.取得資料
        //response.fields.forEach((element: any) => console.log(element.id));
        this.AQIRecordDataSource.data = response.records;

        //3.繪製Chart
        //3-1 City List
        //Data
        let County_Array: string[] = [];
        for (let i = 0; i < response.records.length; i++) {
          County_Array.push(response.records[i]['County']);
        }
        const setType = new Set(County_Array.map(county => county));
        County_Array = [...setType];

        let Count_AQI: number = 0;

        let Count_PM25: number = 0;
        let Count_PM10: number = 0;
        let Count_O3: number = 0;
        let Count_SO2: number = 0;
        let Count_NO2: number = 0;

        let AQI_Array: number[] = [];

        let PM25_Array: number[] = [];
        let PM10_Array: number[] = [];
        let O3_Array: number[] = [];
        let SO2_Array: number[] = [];
        let NO2_Array: number[] = [];

        let Color_1: string[] = [];
        let Color_2: string[] = [];
        let Color_3: string[] = [];
        let Color_4: string[] = [];
        let Color_5: string[] = [];

        for (var i = 0; i < County_Array.length; i++) {
          Color_1.push('#FF5F7E');
          Color_2.push('#FE856C');
          Color_3.push('#FCAB5A');
          Color_4.push('#FBD148');
          Color_5.push('#FCE372');
        }

        let max: number = 0;
        let tempCounty_Array: string[] = [];

        for (let county of County_Array) {
          var temp_Array = response.records.filter((x: { County: string; }) => x.County == county);
          if (temp_Array.length < 1) {
            Count_AQI = 0; Count_PM25 = 0; Count_PM10 = 0; Count_O3 = 0; Count_SO2 = 0; Count_NO2 = 0;
          }
          else {
            Count_AQI = temp_Array.reduce((sum: number, current: { AQI: string; }) => sum + Number(current.AQI), 0) / temp_Array.length;
            Count_PM25 = temp_Array.reduce((sum: number, current: { 'PM2.5': string; }) => sum + Number(current['PM2.5']), 0) / temp_Array.length;
            Count_PM10 = temp_Array.reduce((sum: number, current: { PM10: string; }) => sum + Number(current.PM10), 0) / temp_Array.length;
            Count_O3 = temp_Array.reduce((sum: number, current: { O3: string; }) => sum + Number(current.O3), 0) / temp_Array.length;
            Count_SO2 = temp_Array.reduce((sum: number, current: { SO2: string; }) => sum + Number(current.SO2), 0) / temp_Array.length;
            Count_NO2 = temp_Array.reduce((sum: number, current: { NO2: string; }) => sum + Number(current.NO2), 0) / temp_Array.length;
          }

          AQI_Array.push(Number(Count_AQI.toFixed(2)));
          PM25_Array.push(Number(Count_PM25.toFixed(2)));
          PM10_Array.push(Number(Count_PM10.toFixed(2)));
          O3_Array.push(Number(Count_O3.toFixed(2)));
          SO2_Array.push(Number(Count_SO2.toFixed(2)));
          NO2_Array.push(Number(Count_NO2.toFixed(2)));

          if (Number(Count_PM25.toFixed(2)) > max) { max = Number(Count_PM25.toFixed(2)); }
          if (Number(Count_PM10.toFixed(2)) > max) { max = Number(Count_PM10.toFixed(2)); }
          if (Number(Count_O3.toFixed(2)) > max) { max = Number(Count_O3.toFixed(2)); }
          if (Number(Count_SO2.toFixed(2)) > max) { max = Number(Count_SO2.toFixed(2)); }
          if (Number(Count_NO2.toFixed(2)) > max) { max = Number(Count_NO2.toFixed(2)); }

          tempCounty_Array.push(county);
        }

        //Rank
        let index = 0;
        let tempAQI_Array: number[] = AQI_Array;

        //Best
        index = tempAQI_Array.indexOf(Math.min(...tempAQI_Array));
        this.Top1 = Number(tempAQI_Array[index].toFixed(0));
        this.Top1_County = tempCounty_Array[index];
        tempAQI_Array.splice(index, 1);
        tempCounty_Array.splice(index, 1);

        index = tempAQI_Array.indexOf(Math.min(...tempAQI_Array));
        this.Top2 = Number(tempAQI_Array[index].toFixed(0));
        this.Top2_County = tempCounty_Array[index];
        tempAQI_Array.splice(index, 1);
        tempCounty_Array.splice(index, 1);

        index = tempAQI_Array.indexOf(Math.min(...tempAQI_Array));
        this.Top3 = Number(tempAQI_Array[index].toFixed(0));
        this.Top3_County = tempCounty_Array[index];
        tempAQI_Array.splice(index, 1);
        tempCounty_Array.splice(index, 1);

        //Worst
        index = tempAQI_Array.indexOf(Math.max(...tempAQI_Array));
        this.Last1 = Number(tempAQI_Array[index].toFixed(0));
        this.Last1_County = tempCounty_Array[index];
        tempAQI_Array.splice(index, 1);
        tempCounty_Array.splice(index, 1);

        index = tempAQI_Array.indexOf(Math.max(...tempAQI_Array));
        this.Last2 = Number(tempAQI_Array[index].toFixed(0));
        this.Last2_County = tempCounty_Array[index];
        tempAQI_Array.splice(index, 1);
        tempCounty_Array.splice(index, 1);

        index = tempAQI_Array.indexOf(Math.max(...tempAQI_Array));
        this.Last3 = Number(tempAQI_Array[index].toFixed(0));
        this.Last3_County = tempCounty_Array[index];
        tempAQI_Array.splice(index, 1);
        tempCounty_Array.splice(index, 1);
        //Rank End

        var temp_index = 0;
        var temp_Status = '';

        while (tempAQI_Array.length > 0) {
          temp_index = tempAQI_Array.indexOf(Math.min(...tempAQI_Array));
          temp_Status = tempCounty_Array[temp_index] + '!' + (Number(tempAQI_Array[temp_index].toFixed(0))).toString();

          if (Number(tempAQI_Array[temp_index]) <= 50) {
            this.OtherTop.push(temp_Status);
          }
          else {
            this.OtherLast.push(temp_Status);
          }
          tempAQI_Array.splice(temp_index, 1);
          tempCounty_Array.splice(temp_index, 1);
        }
        this.OtherLast = this.OtherLast.slice().reverse();

        max = Number((max / 10).toFixed(0)) * 10;

        this.barChartData = [
          {
            label: 'PM2.5',
            data: PM25_Array,
            backgroundColor: Color_1,
            borderColor: "#ccc",
            hoverBackgroundColor: Color_1,
            hoverBorderColor: "silver",
            borderWidth: 1
          },
          {
            label: 'PM10',
            data: PM10_Array,
            backgroundColor: Color_2,
            borderColor: "#ccc",
            hoverBackgroundColor: Color_2,
            hoverBorderColor: "silver",
            borderWidth: 1
          },
          {
            label: 'O3',
            data: O3_Array,
            backgroundColor: Color_3,
            borderColor: "#ccc",
            hoverBackgroundColor: Color_3,
            hoverBorderColor: "silver",
            borderWidth: 1
          },
          {
            label: 'SO2',
            data: SO2_Array,
            backgroundColor: Color_4,
            borderColor: "#ccc",
            hoverBackgroundColor: Color_4,
            hoverBorderColor: "silver",
            borderWidth: 1
          },
          {
            label: 'NO2',
            data: NO2_Array,
            backgroundColor: Color_5,
            borderColor: "#ccc",
            hoverBackgroundColor: Color_5,
            hoverBorderColor: "silver",
            borderWidth: 1
          }
        ];

        //Label
        this.barChartLabels = County_Array;

        //Options
        this.barChartOptions = {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: { beginAtZero: true, stepSize: 10, min: 0, max: max }
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