import { Component } from '@angular/core';
import { DonateService } from '../../services/donate.service';
declare var Razorpay: any;
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {
  constructor(private donationService: DonateService, private login: LoginService, private _snackBar: MatSnackBar) { }
  wishToDonate = false;
  amount = 1
  options: any = {}
  user:any = {}

  ngOnInit() {
    this.login.getCurrentUser().subscribe(
      (data: any) => {
        this.user = data.body;
      },
      (error: any) => {
        console.log("Error getting current user");
      }
    )
  }

  toggleDonate() {
    this.wishToDonate = !this.wishToDonate
  }

  checkout() {
    this.donationService.createOrder(this.amount).subscribe(
      (data: any) => {
        console.log(this.user.lastName)
        if (data.body.status == "created") {
          this.options = {
            image: '',
            description: 'Your Quiz Companion',
            name: 'QuizFe',
            amt: data.body.amount,
            key: data.body.key,
            currency: data.body.currency,
            orderId: data.body.orderId,
            prefill: { 
              name: '',
              email: this.user.email,
              contact: this.user.phone
            },
            notes: {
              address: "NA"
            },
            theme: {
              color: "#3399cc"
            }
          }

          let rzp = new Razorpay(this.options);
          rzp.open();
          this.toggleDonate()
        }
      },
      (error: any) => {
        Swal.fire('Error', error.error.message? error.error.message: 'Something went wrong', 'error');
      }
    )
  }
}
