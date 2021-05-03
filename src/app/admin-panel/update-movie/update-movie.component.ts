import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hall } from '../hall-config-view/hall-config-view.component';
import { CreateMovieDTO, CreateScreeningDTO, Screening } from '../add-movie/add-movie.component';
import { MovieEndpointService } from '../../core/services/movie-endpoint.service';
import { Router } from '@angular/router';
import { MovieInfo } from '../../movie/movie.component';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss']
})
export class UpdateMovieComponent implements OnInit {

  updateMovieForm: FormGroup;
  screenings: Screening[] = [];

  isAddingScreening = false;
  halls: Hall[];
  movie: MovieInfo;

  constructor(
    private formBuilder: FormBuilder,
    private movieEndpointService: MovieEndpointService,
    private router: Router
  ) {
    this.movie = router.getCurrentNavigation()?.extras?.state?.selectedMovie || {title: 'asd'};
    this.screenings = this.movie.screeningTimes.map(s => ({
      date: new Date(s.screening),
      hall: s.hall
    } as Screening));
  }

  ngOnInit(): void {

    this.updateMovieForm = this.formBuilder.group({
      title: [this.movie.title, Validators.required],
      posterUrl: [this.movie.posterUrl, Validators.required],
      description: [this.movie.description, Validators.required],
      duration: [this.movie.duration, Validators.required],
      category: [this.movie.category, Validators.required],
      hall: [''],
      date: [new Date()]
    });

    this.movieEndpointService.get('halls')
      .then((halls: Hall[]) => {
        this.halls = halls;
      });
  }

  onSubmit() {
    if (this.updateMovieForm.invalid) {
      return;
    }

    const createMovie: CreateMovieDTO = {
      title: this.updateMovieForm.controls.title.value,
      posterUrl: this.updateMovieForm.controls.posterUrl.value,
      description: this.updateMovieForm.controls.description.value,
      duration: Number(this.updateMovieForm.controls.duration.value),
      category: this.updateMovieForm.controls.category.value,
      screeningTimes: this.screenings.map((v) => ({
        date: new Date(Date.UTC(v.date.getFullYear(), v.date.getMonth(), v.date.getDate(), v.date.getHours(), v.date.getMinutes())),
        hallId: v.hall.id
      } as CreateScreeningDTO))
    };

    this.movieEndpointService.createMovie('movies', createMovie)
      .then((resp) => {
        console.log(resp);

      });

    console.log(createMovie);
  }

  openAddScreening() {
    this.isAddingScreening = true;
  }

  addScreening(date: string, time: string, hall: string) {

    const d = new Date(`${date} ${time}`);
    const screening: Screening = {
      date: d,
      hall: this.halls.find(h => h.hallName === hall)
    };


    console.log(d);


    this.screenings.push(screening);
    this.isAddingScreening = false;
  }

  removeScreening(index: number) {
    this.screenings.splice(index, 1);
  }

}
