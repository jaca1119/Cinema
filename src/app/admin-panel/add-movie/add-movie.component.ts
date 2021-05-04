import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieEndpointService } from 'src/app/core/services/movie-endpoint.service';
import { Hall } from '../hall-config-view/hall-config-view.component';
import { halls as Halls } from '../../../assets/halls';


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

  today = new Date();
  addMovieForm: FormGroup;
  screenings: Screening[] = [];

  isAddingScreening = false;
  halls: Hall[];

  constructor(
    private formBuilder: FormBuilder,
    private movieEndpointService: MovieEndpointService
  ) {
  }

  ngOnInit() {
    this.addMovieForm = this.formBuilder.group({
      title: ['', Validators.required],
      posterUrl: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      category: ['', Validators.required],
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
