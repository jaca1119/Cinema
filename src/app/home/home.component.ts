import { Component, OnInit } from '@angular/core';
import { MovieInfo } from '../movie/movie.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public asd = 'asd';
  movieInfo: MovieInfo = {
    title: 'Loooooooooooooooong title',
    imgUrl: 'http://oliclinic.pl/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',
    category: 'Action',
    duration: 118,
    description: 'Short description about movie',
    showHours: [
      new Date(0, 0, 0, 21, 37),
      new Date(0, 0, 0, 22),
      new Date(0, 0, 0, 23),
      new Date(0, 0, 0, 24)]
  };

  constructor() { }

  ngOnInit() {
  }

}
