import { Component, Input, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

export interface MovieInfo {
  title: string;
  imgUrl: string;
  category: string;
  duration: number;
  description: string;
  showHours: Date[];
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movieInfo: MovieInfo;
  // @Input()

  constructor() { }

  ngOnInit(): void {
  }

  format(date: Date): string {
    return formatDate(date, 'hh:mm', 'en-US');
  }

}
