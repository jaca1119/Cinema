import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface AddSnack {
  id: number;
  name: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Snack {
  id: number;
  name: string;
  imageURL: string;
}

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss']
})
export class SnackComponent implements OnInit {

  @Input() snack: Snack;
  @Output() snackAdded = new EventEmitter<AddSnack>();

  snackForm: FormGroup;
  price = 10;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.snackForm = this.formBuilder.group({
      snackSize: ['Small'],
      quantity: [0]
    });

    this.setPriceForSize();
  }

  addSnack() {
    if (this.snackForm.controls.quantity.value > 0) {
      const snack: AddSnack = {
        id: this.snack.id,
        name: this.snack.name,
        size: this.snackForm.controls.snackSize.value,
        quantity: this.snackForm.controls.quantity.value,
        price: this.calculatePrice()
      };

      this.snackAdded.emit(snack);
    }
  }

  setPriceForSize() {
    switch (this.snackForm.controls.snackSize.value) {
      case 'Small':
        this.price = 10;
        break;
      case 'Medium':
        this.price = 15;
        break;
      case 'Large':
        this.price = 20;
    }
  }

  calculatePrice() {
    return this.price * this.snackForm.controls.quantity.value;
  }
}
