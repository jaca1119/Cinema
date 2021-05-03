import { Component, Input, OnInit } from '@angular/core';
import { MovieInfo } from '../../../../movie/movie.component';

@Component({
  selector: 'app-movie-config-view',
  templateUrl: './movie-config-view.component.html',
  styleUrls: ['./movie-config-view.component.scss']
})
export class MovieConfigViewComponent implements OnInit {

  @Input() movie: MovieInfo;

  constructor() {
  }

  ngOnInit(): void {
  }

}
