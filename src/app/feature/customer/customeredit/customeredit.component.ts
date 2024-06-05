import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CustomerService } from '../../../service/customer/customer.service';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-customeredit',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './customeredit.component.html',
  styleUrl: './customeredit.component.scss'
})
export class CustomereditComponent implements OnInit{
  customerId!: number;
  customer!: any;

  customerEdit = {
    id: '',
    customerCode: '',
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    pic: ''
  };
  constructor(private route: ActivatedRoute, private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.customerId = +id;
      this.customerService.getCustomerById(this.customerId).subscribe(data => {
        this.customer = data;
        console.log(this.customer);

        this.customerEdit.id = this.customer.customerId;
        this.customerEdit.customerName = this.customer.customerName;
        this.customerEdit.customerCode = this.customer.customerCode;
        this.customerEdit.customerAddress = this.customer.customerAddress;
        this.customerEdit.customerPhone = this.customer.customerPhone;
        this.customerEdit.pic = this.customer.pic;  
      });
    } else {
      console.error("ID parameter is null");
    }
  }

  onSubmit(form: NgForm) {
    this.customerService.editCustomer(this.customerEdit).subscribe(
      response => {
        console.log('Customer successfully edited:', response);
        form.reset();
        this.router.navigate(['customer']);
      },
      error => {
        console.error('Error adding customer:', error);
      }
    );
  }
}
