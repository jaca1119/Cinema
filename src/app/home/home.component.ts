import {Component, OnInit} from '@angular/core';
import {MovieInfo, ScreeningTime} from '../movie/movie.component';
import {MovieEndpointService} from '../core/services/movie-endpoint.service';

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

  rows = [
    {
      id: 1, seats: [
        {id: 1, status: 'Free'},
        {id: 2, status: 'Taken'},
        {id: 3, status: 'Excluded'}
      ]
    },
    {
      id: 2, seats: [
        {id: 4, status: 'Free'},
        {id: 5, status: 'Free'},
        {id: 6, status: 'Taken'}
      ]
    }
  ];
  movieInfo: MovieInfo = {
    title: 'Loooooooooooooooong title',
    posterUrl: 'http://oliclinic.pl/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',
    category: 'Action',
    duration: 118,
    description: 'Short description about movie',
    screeningTimes: [
      {id: 0, screening: new Date(Date.now()).toDateString(), rows: this.rows},
      {id: 0, screening: new Date(Date.now() + 1000 * 60 * 60 * 2).toDateString(), rows: this.rows},
      {id: 0, screening: new Date(Date.now() + 1000 * 60 * 135).toDateString(), rows: this.rows},
      {id: 0, screening: new Date(Date.now() + 1000 * 60 * 76).toDateString(), rows: this.rows},
      {id: 0, screening: new Date(Date.now() + 1000 * 60 * 60 * 24).toDateString(), rows: this.rows}],
  };

  moviesToShow: MovieInfo[];
  private movies: MovieInfo[];

  constructor(private movieEndpointService: MovieEndpointService) {
  }

  ngOnInit() {
    this.movieEndpointService.getAll('movies')
      .then((movies: MovieInfo[]) => {
        this.movies = movies;
        this.moviesToShow = movies;

        this.moviesToShow = movies.filter(movie => movie.screeningTimes.some(screeningTime => this.screeningInSelectedDay(screeningTime)));

        return this.movies = movies;
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
