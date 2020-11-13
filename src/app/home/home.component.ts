import {Component, OnInit} from '@angular/core';
import {MovieInfo} from '../movie/movie.component';
import {MovieEndpointService} from '../core/services/movie-endpoint.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public asd = 'asd';
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
      {id: 0, screening: new Date(0, 0, 0, 21, 37), rows: this.rows},
      {id: 0, screening: new Date(0, 0, 0, 22), rows: this.rows},
      {id: 0, screening: new Date(0, 0, 0, 23), rows: this.rows},
      {id: 0, screening: new Date(0, 0, 0, 24), rows: this.rows}],
  };

  movies: any[];

  constructor(private movieEndpointService: MovieEndpointService) {
  }

  ngOnInit() {
    this.movieEndpointService.getAll('movies')
      .then((movies: any[]) => {
        return this.movies = movies;
      });
  }

}
