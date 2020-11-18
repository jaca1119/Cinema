import {Injectable} from '@angular/core';
import {MovieInfo} from '../../movie/movie.component';
import {SelectedSeat, Ticket} from '../../tickets-view/tickets-view.component';

@Injectable({
  providedIn: 'root'
})
export class SelectTicketService {
  private movie: MovieInfo;
  private date: Date;
  private tickets: Ticket[];
  private seats: SelectedSeat[];
  private ticketStatus: boolean;

  constructor() {
  }

  getMovie() {
    return this.movie;
  }

  setMovie(movie: MovieInfo) {
    this.movie = movie;
  }

  getDate() {
    return this.date;
  }

  setDate(date: Date) {
    this.date = date;
  }

  getTickets() {
    return this.tickets;
  }

  setTickets(tickets: Ticket[]) {
    this.tickets = tickets;
  }

  getSeats() {
    return this.seats;
  }

  setSeats(selectedSeats: SelectedSeat[]) {
    this.seats = selectedSeats;
  }

  getTicketStatus() {
    return this.ticketStatus;
  }

  setTicketStatus(ticketStatus: boolean) {
    this.ticketStatus = ticketStatus;
  }
}
