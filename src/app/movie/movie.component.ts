import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

export interface Seat {
  id: number;
  status: string;
}

interface Row {
  id: number;
  seats: Seat[];
}

export interface MovieInfo {
  title: string;
  posterUrl: string;
  category: string;
  duration: number;
  description: string;
  screeningTimes: { id: number, screening: Date, rows: Row[] }[];
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
