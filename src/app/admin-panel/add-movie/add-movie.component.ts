import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieEndpointService } from 'src/app/core/services/movie-endpoint.service';
import { Hall } from '../hall-config-view/hall-config-view.component';
import { halls as Halls } from '../../../assets/halls';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface Screening {
  date: Date;
  hall: Hall;
}

export interface CreateScreeningDTO {
  date: Date;
  hallId: number;
}

export interface CreateMovieDTO {
  title: string;
  posterUrl: string;
  category: string;
  duration: number;
  description: string;
  screeningTimes: CreateScreeningDTO[];
}


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  addMovieForm: FormGroup;
  screenings: Screening[] = [];

  isAddingScreening = false;
  halls: Hall[];

  constructor(
    private formBuilder: FormBuilder,
    private movieEndpointService: MovieEndpointService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.addMovieForm = this.formBuilder.group({
      title: ['', Validators.required],
      posterUrl: [''],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      category: ['', Validators.required],
      hall: [''],
      date: [new Date()]
    });

    this.screenings = [];

    this.movieEndpointService.get('halls')
      .then((halls: Hall[]) => {
        this.halls = halls;
      }, reason => {
        this.halls = Halls;
      });
  }

  onSubmit() {
    if (this.addMovieForm.invalid) {
      return;
    }

    const createMovie: CreateMovieDTO = {
      title: this.addMovieForm.controls.title.value,
      posterUrl: this.addMovieForm.controls.posterUrl.value,
      description: this.addMovieForm.controls.description.value,
      duration: Number(this.addMovieForm.controls.duration.value),
      category: this.addMovieForm.controls.category.value,
      screeningTimes: this.screenings.map((v) => ({
        date: v.date,
        hallId: v.hall.id
      } as CreateScreeningDTO))
    };

    this.movieEndpointService.createMovie('movies', createMovie)
      .then((resp) => {
        this.ngOnInit();
        this.snackBar.open('Movie created!', 'Ok!', {
          duration: 3000
        });
      }, reason => {
        this.ngOnInit();
        this.snackBar.open('Something went wrong!\n', 'Close', {
          duration: 3000
        });
      });
  }

  openAddScreening() {
    this.isAddingScreening = true;
  }

  addScreening(date: string, time: string, hall: string) {
    const screening: Screening = {
      date: new Date(`${date} ${time}`),
      hall: this.halls.find(h => h.hallName === hall)
    };

    this.screenings.push(screening);
    this.isAddingScreening = false;
  }

  removeScreening(index: number) {
    this.screenings.splice(index, 1);
  }
}
