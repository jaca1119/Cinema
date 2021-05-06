import { Component, OnInit } from '@angular/core';
import { Order, SelectTicketService } from '../core/services/select-ticket.service';

@Component({
  selector: 'app-accept-view',
  templateUrl: './accept-view.component.html',
  styleUrls: ['./accept-view.component.scss']
})
export class AcceptViewComponent implements OnInit {

  order: Order;
  showPaymentPopup = false;

  constructor(private selectTicketService: SelectTicketService) {
  }

  ngOnInit(): void {
    this.order = this.selectTicketService.order;
    if (this.order === undefined) {
      this.order = {
        ticketStatus: true,
        hallName: 'asd',
        addedSnacks: [],
        seats: [],
        tickets: [],
        movie: {
          id: 0,
          screeningTimes: [],
          category: 'asd',
          duration: 0,
          description: 'test',
          posterUrl: 'test',
          title: 'test'
        },
        date: new Date()
      };
    }
  }

  showClosePopup() {
    this.showPaymentPopup = !this.showPaymentPopup;
  }
}
