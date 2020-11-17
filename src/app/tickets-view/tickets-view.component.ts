import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MovieInfo, Seat} from '../movie/movie.component';
import {TicketEndpointService} from "../core/services/ticket-endpoint.service";

interface AcceptRequest {
  title: string;
  date: Date;
  selectedSeats: any[];
}

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

  selectedSeats = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private ticketEndpointService: TicketEndpointService) {
    this.selectedMovieInfo = router.getCurrentNavigation()?.extras?.state?.selectedMovie || {title: 'asd'};
    this.selectedDate = router.getCurrentNavigation()?.extras?.state?.selectedDate || new Date(0, 0, 0, 21, 37);
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      normalCtrl: [0],
      studentCtrl: [0]
    });

    this.secondFormGroup = this.formBuilder.group({});
  }

  selectSeat($event: any, seat: Seat) {
    if (this.canSelectSeat(seat)) {
      seat.status = 'selected';
      this.selectedSeats.push(seat.id);
      $event.target.classList.remove('free');
      $event.target.classList.add('selected');

    } else if (seat.status.toLowerCase() === 'selected') {
      seat.status = 'free';
      this.selectedSeats.splice(this.selectedSeats.indexOf(seat.id), 1);
      $event.target.classList.remove('selected');
      $event.target.classList.add('free');
    }
    console.log(this.selectedSeats);
  }

  numberOfTickets(): number {
    let sum = 0;
    for (const controlsKey in this.firstFormGroup.controls) {
      sum += parseInt(this.firstFormGroup.get(controlsKey).value, 10);
    }
    return sum;
  }

  accept() {
    const ticketDTO: AcceptRequest = {
      title: this.selectedMovieInfo.title,
      date: this.selectedDate,
      selectedSeats: this.selectedSeats
    };
    console.log(ticketDTO);
    this.ticketEndpointService.acceptTicket('ticket', ticketDTO)
      .then(response => {
        console.log(response);
      });
  }

  private canSelectSeat(seat: Seat) {
    return seat.status.toLowerCase() === 'free' && this.selectedSeats.length !== this.numberOfTickets();
  }

  canAccept() {
    if (this.numberOfTickets() === 0) {
      return false;
    }

    return this.selectedSeats.length === this.numberOfTickets();
  }

  getSelectedRows() {
    return this.selectedMovieInfo.screeningTimes.find(screeningTime => screeningTime.screening === this.selectedDate).rows;
  }
}
