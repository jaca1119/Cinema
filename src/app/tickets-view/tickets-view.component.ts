import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovieInfo, Row, ScreeningTime, Seat } from '../movie/movie.component';
import { TicketEndpointService } from '../core/services/ticket-endpoint.service';
import { SelectTicketService } from '../core/services/select-ticket.service';
import { AddSnack, Snack } from '../snack/snack.component';
import { MovieEndpointService } from '../core/services/movie-endpoint.service';

interface OrderDTO {
  movieId: number;
  date: Date;
  tickets: Ticket[];
  selectedSeats: number[];
  snacks: SnackDTO[];
}

export interface Ticket {
  ticketType: string;
  quantity: number;
}

export interface SelectedSeat {
  id: number;
  row: number;
  column: number;
}

export interface SnackDTO {
  id: number;
  size: string;
  quantity: number;
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

  addedSnacks: AddSnack[] = [];

  selectedSeats: SelectedSeat[] = [];
  snacks: Snack[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private ticketEndpointService: TicketEndpointService,
              private movieEndpointService: MovieEndpointService,
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

    this.thirdFormGroup = this.formBuilder.group({});

    this.movieEndpointService.get('snacks')
      .then((snacks: Snack[]) => {
        this.snacks = snacks;
      });

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
    const tickets: Ticket[] = [];
    const normalTicketValue: number = parseInt(this.firstFormGroup.get('normalCtrl').value, 10);
    const studentTicketValue: number = parseInt(this.firstFormGroup.get('studentCtrl').value, 10);

    if (normalTicketValue > 0) {
      tickets.push({ticketType: 'normal', quantity: normalTicketValue});
    }
    if (studentTicketValue > 0) {
      tickets.push({ticketType: 'student', quantity: studentTicketValue});
    }

    const hallName = this.selectedMovieInfo.screeningTimes.find(m =>
      new Date(m.screening).getTime() === this.selectedDate.getTime())?.hall?.hallName;

    const orderDTO: OrderDTO = {
      movieId: this.selectedMovieInfo.id,
      date: this.selectedDate,
      selectedSeats: this.selectedSeats.map(x => x.id),
      snacks: this.addedSnacks,
      tickets
    };

    console.log(orderDTO);

    this.ticketEndpointService.acceptTicket('ticket', orderDTO)
      .then((ticketStatus: boolean) => {
        this.selectTicketService.order = {
          movie: this.selectedMovieInfo,
          date: this.selectedDate,
          tickets,
          seats: this.selectedSeats,
          addedSnacks: this.addedSnacks,
          ticketStatus,
          hallName
        };

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

  onSnackAdded(snack: AddSnack) {
    this.addedSnacks.push(snack);
  }

  removeSnack(index: number) {
    this.addedSnacks.splice(index, 1);
  }
}
