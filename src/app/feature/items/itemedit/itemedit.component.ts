import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ItemService } from '../../../service/items/item.service';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-itemedit',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './itemedit.component.html',
  styleUrl: './itemedit.component.scss'
})
export class ItemeditComponent implements OnInit{
  itemsId!: number;
  item!: any;

  itemEdit = {
    itemsId: '',
    itemsCode: '',
    itemsName: '',
    stock: '',
    price: ''
  };
  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.itemsId = +id;
      this.itemService.getItemById(this.itemsId).subscribe(data => {
        this.item = data;
        console.log(this.item);

        this.itemEdit.itemsId = this.item.itemsId;
        this.itemEdit.itemsName = this.item.itemsName;
        this.itemEdit.itemsCode = this.item.itemsCode;
        this.itemEdit.stock = this.item.stock;
        this.itemEdit.price = this.item.price;
      });
    } else {
      console.error("ID parameter is null");
    }
  }

  onSubmit(form: NgForm) {
    this.itemService.editItem(this.itemEdit).subscribe(
      response => {
        console.log('Item successfully edited:', response);
        form.reset();
        this.router.navigate(['items']);
      },
      error => {
        console.error('Error adding item:', error);
      }
    );
  }

  backToDetail(id: number) {
    this.router.navigate(['items/detail', id]);
  }
}
