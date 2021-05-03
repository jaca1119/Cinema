import { Component, OnInit } from '@angular/core';
import { MovieInfo } from '../../movie/movie.component';
import { MovieEndpointService } from '../../core/services/movie-endpoint.service';
import { movies as Movies } from '../../../assets/movies';

@Component({
  selector: 'app-movie-config',
  templateUrl: './movie-config.component.html',
  styleUrls: ['./movie-config.component.scss']
})
export class MovieConfigComponent implements OnInit {
  movies: MovieInfo[];

  constructor(private movieEndpointService: MovieEndpointService) {
  }

  ngOnInit(): void {
    this.movieEndpointService.get('movies')
      .then((movies: MovieInfo[]) => {
        this.movies = movies;
      }, reason => {
        this.movies = Movies;
      });
  }

}
