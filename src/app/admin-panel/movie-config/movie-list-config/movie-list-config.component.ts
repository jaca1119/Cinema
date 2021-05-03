import { Component, Input, OnInit } from '@angular/core';
import { MovieInfo } from '../../../movie/movie.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list-config',
  templateUrl: './movie-list-config.component.html',
  styleUrls: ['./movie-list-config.component.scss']
})
export class MovieListConfigComponent implements OnInit {

  @Input() movies: MovieInfo[];

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  updateMovie(movie: MovieInfo) {
    this.router.navigate(['admin/update-movie'], {
      state: {
        selectedMovie: movie
      }
    });
  }
}
