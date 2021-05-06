import { Injectable } from '@angular/core';
import { MovieInfo } from '../../movie/movie.component';
import { SelectedSeat, Ticket } from '../../tickets-view/tickets-view.component';
import { AddSnack } from '../../snack/snack.component';

export interface Order {
  movie: MovieInfo;
  date: Date;
  tickets: Ticket[];
  seats: SelectedSeat[];
  ticketStatus: boolean;
  addedSnacks: AddSnack[];
  hallName: string;
}


@Injectable({
  providedIn: 'root'
})
export class SelectTicketService {

  private _order: Order;

  constructor() {
  }

  get order(): Order {
    return this._order;
  }

  set order(value: Order) {
    this._order = value;
  }
}
