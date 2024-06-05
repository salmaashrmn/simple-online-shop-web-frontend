import { Component } from '@angular/core';
import { CustomerService } from '../../../service/customer/customer.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-customeradd',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './customeradd.component.html',
  styleUrl: './customeradd.component.scss'
})
export class CustomeraddComponent {
  customer = {
    customerCode: '',
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    pic:  null as File | null
  };

  constructor(private customerService: CustomerService, private router: Router) { }

  onSubmit(form: NgForm) {
    const formData = new FormData();
    formData.append('customerCode', this.customer.customerCode);
    formData.append('customerName', this.customer.customerName);
    formData.append('customerPhone', this.customer.customerPhone);
    formData.append('customerAddress', this.customer.customerAddress);
    console.log(this.customer.pic);
    if(this.customer.pic!=null){
      formData.append('pic', this.customer.pic as File);
    }

    this.customerService.addCustomer(formData).subscribe(
      response => {
        console.log('Customer added successfully:', response);
        form.reset();
        this.router.navigate(['customer']);
      },
      error => {
        console.error('Error adding customer:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.customer.pic = file;
    }
  }
}
