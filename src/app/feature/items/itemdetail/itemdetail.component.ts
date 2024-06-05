import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { ItemService } from '../../../service/items/item.service';

@Component({
  selector: 'app-itemdetail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './itemdetail.component.html',
  styleUrl: './itemdetail.component.scss'
})
export class ItemdetailComponent implements OnInit{
  itemId!: number;
  item!: any;

  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.itemId = +id;
      this.itemService.getItemById(this.itemId).subscribe(data => {
        this.item = data;
        console.log(this.item);

        if(this.item.lastReStock != null){
          const dateTime = new Date(this.item.lastReStock);
          const datePipe = new DatePipe('en-US');
          this.item.lastReStock = datePipe.transform(dateTime, 'yyyy-MM-dd HH:mm:ss');
        }
      });
    } else {
      console.error("ID parameter is null");
    }
  }

  goToEdit(id: number) {
    console.log('Detail button clicked with ID:', id);
    this.router.navigate(['items/edit', id]);
  }
}
