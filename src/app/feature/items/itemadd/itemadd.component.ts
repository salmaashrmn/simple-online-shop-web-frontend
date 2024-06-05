import { Component } from '@angular/core';
import { ItemService } from '../../../service/items/item.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-itemadd',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './itemadd.component.html',
  styleUrl: './itemadd.component.scss'
})
export class ItemaddComponent {
  item = {
    itemsCode: '',
    itemsName: '',
    stock: '',
    price: ''
  };

  constructor(private itemService: ItemService, private router: Router) { }

  onSubmit(form: NgForm) {
    this.itemService.addItem(this.item).subscribe(
      response => {
        console.log('Item added successfully:', response);
        form.reset();
        this.router.navigate(['items']);
      },
      error => {
        console.error('Error adding item:', error);
      }
    );
  }
}
