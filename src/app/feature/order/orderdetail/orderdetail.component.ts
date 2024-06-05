import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { OrderService } from '../../../service/order/order.service';

@Component({
  selector: 'app-orderdetail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './orderdetail.component.html',
  styleUrl: './orderdetail.component.scss'
})
export class OrderdetailComponent implements OnInit{
  orderId!: number;
  order!: any;

  constructor(private route: ActivatedRoute, private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.orderId = +id;
      this.orderService.getOrderById(this.orderId).subscribe(data => {
        this.order = data;
        console.log(this.order);

        if(this.order.orderDate != null){
          const dateTime = new Date(this.order.orderDate);
          const datePipe = new DatePipe('en-US');
          this.order.orderDate = datePipe.transform(dateTime, 'yyyy-MM-dd HH:mm:ss');
        }
      });
    } else {
      console.error("ID parameter is null");
    }
  }

  goToEdit(id: number) {
    console.log('Detail button clicked with ID:', id);
    this.router.navigate(['order/edit', id]);
  }
}
