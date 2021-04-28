import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Hall} from '../admin-panel/hall-config-view/hall-config-view.component';

export interface Seat {
  id: number;
  columnIndex: number;
  status: string;
}

export interface ScreeningTime {
  id: number;
  screening: string;
  hall: Hall;
  rows: Row[];
}

export interface Row {
  rowIndex: number;
  seats: Seat[];
}

export interface MovieInfo {
  title: string;
  posterUrl: string;
  category: string;
  duration: number;
  description: string;
  screeningTimes: ScreeningTime[];
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movieInfo: MovieInfo;
  @Input() selectedDate: Date;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToTickets(date: string) {
    this.router.navigate(['/tickets'], {
      state: {
        selectedMovie: this.movieInfo,
        selectedDate: date
      }
    });
  }

  isOnSelectedDate(date: ScreeningTime) {
    const screening = new Date(date.screening);

    return screening.getFullYear() === this.selectedDate.getFullYear() &&
      screening.getMonth() === this.selectedDate.getMonth() &&
      screening.getDate() === this.selectedDate.getDate();
  }
}
