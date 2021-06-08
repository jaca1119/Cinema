import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-popup',
  templateUrl: './payment-popup.component.html',
  styleUrls: ['./payment-popup.component.scss']
})
export class PaymentPopupComponent implements OnInit {

  @Output() closeButtonClick = new EventEmitter();
  isOptionsVisible = true;
  isPaymentVisible = false;
  paymentUrl: SafeResourceUrl;

  @ViewChild('payment', {static: false}) paymentIframe: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.paymentUrl = sanitizer.bypassSecurityTrustResourceUrl(environment.PAYMENT_URL);
  }

  ngOnInit(): void {
  }

  onBankClick() {
    this.isOptionsVisible = false;
    this.isPaymentVisible = true;
  }

  showClosePopup() {
    this.closeButtonClick.emit();
  }

  sendPaymentData() {
    if (this.paymentIframe !== undefined) {

      const payment = this.paymentIframe.nativeElement.contentWindow;

      payment.postMessage({
        from: 'pizzeria',
        amount: sessionStorage.getItem('amount'),
        message: `order id: ${sessionStorage.getItem('orderId')}`,
        parentURL: window.origin
      }, environment.PAYMENT_URL);

    }
  }

  @HostListener('window:message', ['$event'])
  onPostMessage(event: MessageEvent) {

    if (event.origin !== environment.PAYMENT_URL) {
      return;
    }

    this.isPaymentVisible = false;

    this.showClosePopup();

    if (event.data === 'success') {
      this.snackBar.open('Payment accepted!', 'Ok!', {
        duration: 10000
      });

      this.router.navigate(['payment-accepted']);

    } else {
      this.snackBar.open('Something went wrong with payment', 'Close', {
        duration: 10000
      });
    }
  }
}
