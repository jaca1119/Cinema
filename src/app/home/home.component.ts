import { Component, OnInit } from '@angular/core';
import { MovieInfo, ScreeningTime } from '../movie/movie.component';
import { MovieEndpointService } from '../core/services/movie-endpoint.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedDay = new Date();

  days: Date[] = [
    new Date(Date.now()),
    new Date(Date.now() + (1000 * 60 * 60 * 24)),
    new Date(Date.now() + (1000 * 60 * 60 * 24 * 2)),
  ];

  moviesToShow: MovieInfo[];
  private movies: MovieInfo[];

  constructor(private movieEndpointService: MovieEndpointService) {
  }

  ngOnInit() {
    this.movieEndpointService.get('movies')
      .then((movies: MovieInfo[]) => {
        this.movies = movies;

        this.moviesToShow = movies.filter(movie => movie.screeningTimes.some(screeningTime => this.screeningInSelectedDay(screeningTime)));
      });
  }

  selectDay(day: Date) {
    this.selectedDay = day;

    this.moviesToShow = this.movies.filter(movie => movie.screeningTimes.some(screeningTime => this.screeningInSelectedDay(screeningTime)));
  }

  private screeningInSelectedDay(screeningTime: ScreeningTime): boolean {
    const screening = new Date(screeningTime.screening);
    return screening.getFullYear() === this.selectedDay.getFullYear() &&
      screening.getMonth() === this.selectedDay.getMonth() &&
      screening.getDate() === this.selectedDay.getDate();
  }
}
