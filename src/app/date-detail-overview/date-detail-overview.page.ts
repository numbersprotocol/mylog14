import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-detail-overview',
  templateUrl: './date-detail-overview.page.html',
  styleUrls: ['./date-detail-overview.page.scss'],
})
export class DateDetailOverviewPage implements OnInit {
  n2s=['不想減一','January','February','March','April','May','June','July','August','September','ctober','November','December']
  card = {
    day: 1,
    month: '3',
    date: '30',
    bt: 37.9,
    // Free-to-use mock image from https://pixabay.com/photos/cat-surprised-eyes-cat-s-eyes-2886062/
    imgSrc: 'https://cdn.pixabay.com/photo/2017/10/24/20/33/cat-2886062_1280.jpg',
    imgHeight: 300,
  };
  constructor() { }

  ngOnInit() {
  }

}
