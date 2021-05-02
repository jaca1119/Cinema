import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MovieInfo, Row, ScreeningTime, Seat} from '../movie/movie.component';
import {TicketEndpointService} from '../core/services/ticket-endpoint.service';
import {SelectTicketService} from '../core/services/select-ticket.service';

interface TicketDTO {
  title: string;
  date: Date;
  tickets: Ticket[];
  selectedSeats: number[];
}

export interface Ticket {
  type: string;
  value: number;
}

export interface SelectedSeat {
  id: number;
  row: number;
  column: number;
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
  thirdFormGroup: FormGroup;

  selectedSeats: SelectedSeat[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private ticketEndpointService: TicketEndpointService,
              private selectTicketService: SelectTicketService) {
    this.selectedMovieInfo = router.getCurrentNavigation()?.extras?.state?.selectedMovie || {title: 'asd'};
    this.selectedDate = new Date(router.getCurrentNavigation()?.extras?.state?.selectedDate) || new Date(0, 0, 0, 21, 37);
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      normalCtrl: [0],
      studentCtrl: [0]
    });

    this.secondFormGroup = this.formBuilder.group({});
    console.log(this.selectedMovieInfo);

  }

  selectSeat($event: any, seat: Seat, row: number, column: number) {
    if (this.canSelectSeat(seat)) {
      seat.status = 'selected';
      this.selectedSeats.push({id: seat.id, row, column});
      $event.target.classList.remove('free');
      $event.target.classList.add('selected');

    } else if (seat.status.toLowerCase() === 'selected') {
      seat.status = 'free';
      this.selectedSeats.splice(this.selectedSeats.indexOf({id: seat.id, row, column}), 1);
      $event.target.classList.remove('selected');
      $event.target.classList.add('free');
    }
  }

  numberOfTickets(): number {
    let sum = 0;

    for (const controlsKey in this.firstFormGroup.controls) {
      sum += parseInt(this.firstFormGroup.get(controlsKey).value, 10);
    }
    return sum;
  }

  accept() {
    const tickets: Ticket[] = [
      {type: 'normal', value: this.firstFormGroup.get('normalCtrl').value},
      {type: 'student', value: this.firstFormGroup.get('studentCtrl').value}
    ];

    const ticketDTO: TicketDTO = {
      title: this.selectedMovieInfo.title,
      date: this.selectedDate,
      selectedSeats: this.selectedSeats.map(x => x.id),
      tickets
    };

    console.log(ticketDTO);

    this.ticketEndpointService.acceptTicket('ticket', ticketDTO)
      .then((ticketStatus: boolean) => {
        this.selectTicketService.setMovie(this.selectedMovieInfo);
        this.selectTicketService.setDate(this.selectedDate);
        this.selectTicketService.setTickets(tickets);
        this.selectTicketService.setSeats(this.selectedSeats);
        this.selectTicketService.setTicketStatus(ticketStatus);

        this.router.navigate(['accepted']);
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
    return this.selectedMovieInfo.screeningTimes.find(screeningTime => this.isOnSelectedDate(screeningTime)).rows;
  }

  isOnSelectedDate(date: ScreeningTime) {
    const screening = new Date(date.screening);

    return screening.getTime() === this.selectedDate.getTime();
  }

  getSortedRows(rows: Row[]): Row[] {
    return rows.sort((a, b) => a.rowIndex - b.rowIndex);
  }

  getSortedSeats(seats: Seat[]): Seat[] {
    return seats.sort((a, b) => a.columnIndex - b.columnIndex);
  }
}
