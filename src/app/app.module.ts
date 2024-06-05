import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { AppComponent } from './app.component';

import { CustomerComponent } from './feature/customer/customer.component';
import { CustomeraddComponent } from './feature/customer/customeradd/customeradd.component';
import { CustomerdetailComponent } from './feature/customer/customerdetail/customerdetail.component';
import { CustomereditComponent } from './feature/customer/customeredit/customeredit.component';

import { ItemsComponent } from './feature/items/items.component';
import { ItemaddComponent } from './feature/items/itemadd/itemadd.component';
import { ItemeditComponent } from './feature/items/itemedit/itemedit.component';
import { ItemdetailComponent } from './feature/items/itemdetail/itemdetail.component';

import { OrderComponent } from './feature/order/order.component';
import { OrderaddComponent } from './feature/order/orderadd/orderadd.component';
import { OrdereditComponent } from './feature/order/orderedit/orderedit.component';
import { OrderdetailComponent } from './feature/order/orderdetail/orderdetail.component';

import { CustomerService } from './service/customer/customer.service';
import { ItemService } from './service/items/item.service';
import { OrderService } from './service/order/order.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomeraddComponent,
    CustomereditComponent,
    CustomerdetailComponent,
    ItemsComponent,
    ItemaddComponent,
    ItemeditComponent,
    ItemdetailComponent,
    OrderComponent,
    OrderaddComponent,
    OrdereditComponent,
    OrderdetailComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CustomerService,
    ItemService,
    OrderService
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
