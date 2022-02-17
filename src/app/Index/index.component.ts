import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private GeneralService: GeneralService) { }

  public IndexImage = '';
  public IndexQuote = '';

  ngOnInit(): void {
    this.getQuote();
    setInterval(() => {
      this.getQuote();
    }, 12000);
  }

  getQuote() {
    this.GeneralService.getQuote().subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.IndexImage = response[0].image;
          this.IndexQuote = response[0].quote;
        } else {
          this.IndexImage = '';
          this.IndexQuote = '';
        }
      },
      (error: HttpErrorResponse) => this.GeneralService.HandleError(error)
    );
  }

}
