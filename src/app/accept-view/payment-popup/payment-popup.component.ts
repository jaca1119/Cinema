import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-payment-popup',
  templateUrl: './payment-popup.component.html',
  styleUrls: ['./payment-popup.component.scss']
})
export class PaymentPopupComponent implements OnInit {

  @Output() closeButtonClick = new EventEmitter();
  isOptionsVisible = true;
  isPaymentVisible = false;
  paymentUrl: SafeUrl;

  @ViewChild('payment', {static: false}) paymentIframe: ElementRef;

  constructor(
    private sanitizer: DomSanitizer
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

      console.log("Sending payment data");
      payment.postMessage({
        from: 'pizzeria',
        amount: sessionStorage.getItem('amount'),
        message: `order id: ${sessionStorage.getItem('orderId')}`,
        parentURL: window.origin
      }, this.paymentUrl);
    }
  }

  @HostListener('window:message', ['$event'])
  onPostMessage(event: MessageEvent) {

    if (event.origin !== this.paymentUrl) {
      return;
    }

    this.isPaymentVisible = false;
    //
    // if (event.data === 'success') {
    //   fetch(`https://pizzeria-spring.herokuapp.com/order-pizza-cart/payment/${this.props.id}`, {
    //     method: "PATCH"
    //   })
    //     .then(response => {
    //       if (response.ok) {
    //         this.props.setStatus("Payment accepted!");
    //       }
    //     });
    //
    //   this.setState({ isSuccess: true });
    // }
  }
}
