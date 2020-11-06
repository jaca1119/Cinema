import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToTickets(date: Date) {
    this.router.navigate(['/tickets'], {
      state: {
        selectedMovie: this.movieInfo,
        selectedDate: date
      }
    });
  }
}
