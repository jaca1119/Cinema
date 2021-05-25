import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hall } from '../hall-config-view/hall-config-view.component';
import { CreateScreeningDTO, Screening } from '../add-movie/add-movie.component';
import { MovieEndpointService } from '../../core/services/movie-endpoint.service';
import { Router } from '@angular/router';
import { MovieInfo } from '../../movie/movie.component';
import { halls as Halls } from '../../../assets/halls';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UpdateMovieDTO {
  id: number;
  title: string;
  posterUrl: string;
  category: string;
  duration: number;
  description: string;
  screeningTimes: CreateScreeningDTO[];
}

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
    private router: Router,
    private snackBar: MatSnackBar
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
      posterUrl: [this.movie.posterUrl],
      description: [this.movie.description, Validators.required],
      duration: [this.movie.duration, Validators.required],
      category: [this.movie.category, Validators.required],
      hall: [''],
      date: [new Date()]
    });

    this.movieEndpointService.get('halls')
      .then((halls: Hall[]) => {
        this.halls = halls;
      }, reason => {
        this.halls = Halls;
      });
  }

  onSubmit() {
    if (this.updateMovieForm.invalid) {
      return;
    }

    const updateMovie: UpdateMovieDTO = {
      id: this.movie.id,
      title: this.updateMovieForm.controls.title.value,
      posterUrl: this.updateMovieForm.controls.posterUrl.value,
      description: this.updateMovieForm.controls.description.value,
      duration: Number(this.updateMovieForm.controls.duration.value),
      category: this.updateMovieForm.controls.category.value,
      screeningTimes: this.screenings.map((v) => ({
        date: v.date,
        hallId: v.hall.id
      } as CreateScreeningDTO))
    };

    this.movieEndpointService.updateMovie('movies', updateMovie)
      .then((resp) => {
        console.log(resp);
        this.ngOnInit();
        this.snackBar.open('Movie updated!', 'Ok!', {
          duration: 3000,
        });
      });

    console.log(updateMovie);
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
