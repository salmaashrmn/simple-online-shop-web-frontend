import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { CustomerService } from '../../../service/customer/customer.service';

@Component({
  selector: 'app-customerdetail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './customerdetail.component.html',
  styleUrls: ['./customerdetail.component.scss']
})
export class CustomerdetailComponent implements OnInit {
  customerId!: number;
  customer!: any;
  customerImageUrl: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.customerId = +id;
      this.customerService.getCustomerById(this.customerId).subscribe(data => {
        this.customer = data;
        console.log(this.customer);

        if(this.customer.lastOrderDate != null){
          const dateTime = new Date(this.customer.lastOrderDate);
          const datePipe = new DatePipe('en-US');
          this.customer.lastOrderDate = datePipe.transform(dateTime, 'yyyy-MM-dd HH:mm:ss');
        }
        if (this.customer.pic) {
          this.customerImageUrl = `http://localhost:8081/api/simple-olshop-service/customer/get-object?bucketName=online-shop&objectName=${this.customer.pic}`
        }
      });
    } else {
      console.error("ID parameter is null");
    }
  }

  goToEdit(id: number) {
    console.log('Detail button clicked with ID:', id);
    this.router.navigate(['customer/edit', id]);
  }
  
}
