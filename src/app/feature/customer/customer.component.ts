import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer/customer.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  imports: [NgFor],
  standalone: true
})
export class CustomerComponent implements OnInit{
  customers: any[] = [];

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
      console.log(this.customers);
    });
  }

  goToDetail(id: number) {
    console.log('Detail button clicked with ID:', id);
    this.router.navigate(['customer/detail', id]);
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(
      response => {
      console.log('Customer successfully deleted:', response);
      window.location.reload();
    },
    error => {
      console.error('Error delete customer:', error);
    });
  }

  goToAddForm() {
    this.router.navigate(['customer/add']);
  }
}
