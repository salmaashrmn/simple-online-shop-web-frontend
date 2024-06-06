import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../service/order/order.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgFor],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{
  orders: any[] = [];

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data => {
      if(data){
        this.orders = data;
        console.log(this.orders);
      }
    });
  }

  goToDetail(id: number) {
    console.log('Detail button clicked with ID:', id);
    this.router.navigate(['order/detail', id]);
  }

  deleteItem(id: number) {
    this.orderService.deleteOrder(id).subscribe(
      response => {
      console.log('Order successfully deleted:', response);
      window.location.reload();
    },
    error => {
      console.error('Error delete order:', error);
    });
  }

  downloadReport() {
    this.orderService.getOrderReport().subscribe(
      response => {
      console.log('Order report successfully generated:', response.message);
      window.location.reload();
    },
    error => {
      console.error('Error delete order:', error);
    });
  }

  goToAddForm() {
    this.router.navigate(['order/add']);
  }
}
