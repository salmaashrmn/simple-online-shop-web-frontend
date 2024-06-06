import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../service/order/order.service';
import { FormControl, NgForm, FormsModule } from '@angular/forms';
import { CustomerService } from '../../../service/customer/customer.service';
import { ItemService } from '../../../service/items/item.service';
import { map, Observable, startWith } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-orderedit',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf],
  templateUrl: './orderedit.component.html',
  styleUrl: './orderedit.component.scss'
})
export class OrdereditComponent implements OnInit{
  orderId!: number;
  order!: any;
  customers: any[] = [];
  items: any[] = [];

  orderEdit = {
    orderId: '',
    orderCode: '',
    customerId: '',
    itemId: '',
    quantity: '',
    totalPrice: ''
  };

  filteredCustomers!: Observable<any[]>;
  filteredItems!: Observable<any[]>;

  customerControl = new FormControl();
  itemControl = new FormControl();
  
  constructor(private route: ActivatedRoute, private router: Router, private orderService: OrderService, private customerService: CustomerService, private itemService: ItemService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.orderId = +id;
      this.orderService.getOrderById(this.orderId).subscribe(data => {
        this.order = data;

        this.orderEdit.orderId = this.order.orderId;
        this.orderEdit.orderCode = this.order.orderCode;
        this.orderEdit.customerId = this.order.customer.customerId;
        this.orderEdit.itemId = this.order.item.itemsId;
        this.orderEdit.quantity = this.order.quantity;
        this.orderEdit.totalPrice = this.order.totalPrice;

      });
    } else {
      console.error("ID parameter is null");
    }

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

  onSubmit(form: NgForm) {
    this.orderService.editOrder(this.orderEdit).subscribe(
      response => {
        console.log('Order successfully edited:', response);
        form.reset();
        this.router.navigate(['order']);
      },
      error => {
        console.error('Error:', error);
      }
    );
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

  backToDetail(id: number) {
    this.router.navigate(['order/detail', id]);
  }
}
