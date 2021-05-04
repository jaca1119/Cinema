import { Component, OnInit } from '@angular/core';
import { MovieEndpointService } from 'src/app/core/services/movie-endpoint.service';
import { Row, Seat } from 'src/app/movie/movie.component';
import { halls as Halls } from '../../../assets/halls';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Hall {
  id: number;
  hallName: string;
  rows: Row[];
}

@Component({
  selector: 'app-hall-config-view',
  templateUrl: './hall-config-view.component.html',
  styleUrls: ['./hall-config-view.component.scss']
})
export class HallConfigViewComponent implements OnInit {

  selectedHall: Hall;
  createHall: Hall;
  showSelected = false;
  halls: Hall[];

  constructor(
    private movieEndpointService: MovieEndpointService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const rows: Row[] = [];

    for (let i = 0; i < 12; i++) {
      const seats: Seat[] = [];
      for (let j = 0; j < 20; j++) {
        seats.push({
          id: 0,
          columnIndex: j,
          status: 'Free'
        });
      }

      rows.push({
        rowIndex: i,
        seats
      });
    }

    this.createHall = {
      id: 0,
      hallName: 'Hall 12',
      rows
    };

    this.movieEndpointService.get('halls')
      .then((halls: Hall[]) => {
        this.halls = halls;
      }, reason => {
        this.halls = Halls;
      });
  }

  selectSeat($event: any, seat: Seat, row: number, column: number) {
    if ($event.buttons === 1) {
      this.doSelectSeat($event, seat, row, column);
    }
  }

  selectSeatClick($event: any, seat: Seat, row: number, column: number) {
    this.doSelectSeat($event, seat, row, column);
  }

  doSelectSeat($event: any, seat: Seat, row: number, column: number) {
    if (seat.status === 'Free') {
      seat.status = 'Excluded';
      $event.target.classList.remove('free');
      $event.target.classList.add('excluded');
    } else {
      seat.status = 'Free';
      $event.target.classList.remove('excluded');
      $event.target.classList.add('free');
    }
  }

  addHall(hallName: string) {
    this.createHall.hallName = hallName;

    this.movieEndpointService.createHall('halls', this.createHall)
      .then((hall: any) => {
        this.ngOnInit();
        this.snackBar.open('Hall created!', 'Ok!', {
          duration: 3000
        });
      }, reason => {
        this.snackBar.open('Something went wrong!', 'Close', {
          duration: 3000
        });
      });
  }

  updateHall(hallName: string) {
    this.selectedHall.hallName = hallName;

    this.movieEndpointService.updateHall('halls', this.selectedHall)
      .then((hall: any) => {
        this.ngOnInit();
        this.snackBar.open('Hall updated!', 'Ok!', {
          duration: 3000
        });
      }, reason => {
        this.snackBar.open('Something went wrong!', 'Close', {
          duration: 3000
        });
      });
  }

  showAddHall() {
    this.showSelected = false;
  }

  onChange(hall: any) {
    this.showSelected = true;
    this.selectedHall = this.halls.find(x => x.hallName === hall);
  }

  getSortedRows(rows: Row[]): Row[] {
    return rows.sort((a, b) => a.rowIndex - b.rowIndex);
  }

  getSortedSeats(seats: Seat[]): Seat[] {
    return seats.sort((a, b) => a.columnIndex - b.columnIndex);
  }

}
