import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../service/items/item.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [NgFor],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit{
  items: any[] = [];

  constructor(private router: Router, private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(data => {
      this.items = data;
      console.log(this.items);
    });
  }

  goToDetail(id: number) {
    console.log('Detail button clicked with ID:', id);
    this.router.navigate(['items/detail', id]);
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe(
      response => {
      console.log('Item successfully deleted:', response);
      window.location.reload();
    },
    error => {
      console.error('Error delete item:', error);
    });
  }

  goToAddForm() {
    this.router.navigate(['items/add']);
  }
}
