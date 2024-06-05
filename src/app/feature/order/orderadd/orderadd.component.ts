import { Component, NgModule, OnInit } from '@angular/core';
import { OrderService } from '../../../service/order/order.service';
import { CustomerService } from '../../../service/customer/customer.service';
import { ItemService } from '../../../service/items/item.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm, FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-orderadd',
  standalone: true,
  imports:[
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    NgFor],
  templateUrl: './orderadd.component.html',
  styleUrl: './orderadd.component.scss'
})
export class OrderaddComponent implements OnInit{
  order = {
    orderCode: '',
    customerId: '',
    customerName: '',
    itemId: '',
    itemName: '',
    quantity: 0,
    totalPrice: 0
  };
  customers: any[] = [];
  items: any[] = [];

  filteredCustomers!: Observable<any[]>;
  filteredItems!: Observable<any[]>;

  customerControl = new FormControl();
  itemControl = new FormControl();
  
  constructor(private orderService: OrderService, private customerService: CustomerService, private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      console.log(this.customers);
      this.filteredCustomers = this.customerControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterCustomers(value))
      );
    });

    this.itemService.getItems().subscribe(items => {
      this.items = items;
      console.log(this.items);
      this.filteredItems = this.itemControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterItems(value))
      );
    });
  }

  private _filterCustomers(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(customer => customer.customerName.toLowerCase().includes(filterValue));
  }

  private _filterItems(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(item => item.itemsName.toLowerCase().includes(filterValue));
  }

  onCustomerSelected(event: any) {
    const selectedCustomer = this.customers.find(customer => customer.customerName === event.option.value);
    if (selectedCustomer) {
      this.order.customerId = selectedCustomer.customerId;
    }
  }

  onItemSelected(event: any) {
    const selectedItem = this.items.find(item => item.itemsName === event.option.value);
    if (selectedItem) {
      this.order.itemId = selectedItem.itemsId;
      this.updateTotalPrice();
    }
  }

  incrementQuantity() {
    this.order.quantity++;
    this.updateTotalPrice();
  }

  decrementQuantity() {
    if (this.order.quantity > 1) {
      this.order.quantity--;
      this.updateTotalPrice();
    }
  }

  updateTotalPrice() {
    const selectedItem = this.items.find(item => item.itemsId == this.order.itemId);
    if (selectedItem) {
      this.order.totalPrice = this.order.quantity * selectedItem.price;
    } else {
      this.order.totalPrice = 0;
    }
  }

  onSubmit(form: NgForm) {
      this.orderService.addOrder(this.order).subscribe(
        response => {
          console.log('Order created successfully', response);
          form.reset();
          this.router.navigate(['order']);
        },
        error => {
          console.error('Error creating order', error);
        }
      );
  }
}
