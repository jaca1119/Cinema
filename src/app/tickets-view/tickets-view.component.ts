import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MovieInfo, Seat} from '../movie/movie.component';

@Component({
  selector: 'app-tickets-view',
  templateUrl: './tickets-view.component.html',
  styleUrls: ['./tickets-view.component.scss']
})
export class TicketsViewComponent implements OnInit {
  selectedMovieInfo: MovieInfo;
  selectedDate: Date;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  private selectedSeats = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.selectedMovieInfo = router.getCurrentNavigation()?.extras?.state?.selectedMovie || {title: 'asd'};
    this.selectedDate = router.getCurrentNavigation()?.extras?.state?.selectedDate || new Date(0, 0, 0, 21, 37);
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      normalCtrl: [''],
      studentCtrl: ['']
    });

    this.secondFormGroup = this.formBuilder.group({});
  }

  selectSeat($event: any, seat: Seat) {
    if (seat.status.toLowerCase() === 'free') {
      if (this.selectedSeats.indexOf(seat.id) === -1) {
        this.selectedSeats.push(seat.id);
        $event.target.classList.remove('free');
        $event.target.classList.add('selected');
      }

    }
    console.log(this.selectedSeats);
  }
}
