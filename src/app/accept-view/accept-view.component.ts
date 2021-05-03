import { Component, OnInit } from '@angular/core';
import { SelectTicketService } from '../core/services/select-ticket.service';
import { MovieInfo } from '../movie/movie.component';
import { SelectedSeat, Ticket } from '../tickets-view/tickets-view.component';
import { AddSnack } from '../snack/snack.component';

@Component({
  selector: 'app-accept-view',
  templateUrl: './accept-view.component.html',
  styleUrls: ['./accept-view.component.scss']
})
export class AcceptViewComponent implements OnInit {
  movie: MovieInfo;
  date: Date;
  tickets: Ticket[];
  seats: SelectedSeat[];
  ticketStatus: boolean;
  snacks: AddSnack[];
  hallName: string;

  constructor(private selectTicketService: SelectTicketService) {
  }

  ngOnInit(): void {
    this.movie = this.selectTicketService.getMovie();
    this.date = this.selectTicketService.getDate();
    this.tickets = this.selectTicketService.getTickets();
    this.seats = this.selectTicketService.getSeats();
    this.ticketStatus = this.selectTicketService.getTicketStatus();
    this.snacks = this.selectTicketService.getSnacks();
    this.hallName = this.selectTicketService.getHallName();
  }

}
