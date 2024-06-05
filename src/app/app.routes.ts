import { Routes } from '@angular/router';
import { CustomerComponent } from './feature/customer/customer.component';
import { CustomeraddComponent } from './feature/customer/customeradd/customeradd.component';
import { CustomerdetailComponent } from './feature/customer/customerdetail/customerdetail.component';
import { CustomereditComponent } from './feature/customer/customeredit/customeredit.component';
import { ItemsComponent } from './feature/items/items.component';
import { ItemaddComponent } from './feature/items/itemadd/itemadd.component';
import { ItemdetailComponent } from './feature/items/itemdetail/itemdetail.component';
import { ItemeditComponent } from './feature/items/itemedit/itemedit.component';
import { OrderComponent } from './feature/order/order.component';
import { OrderaddComponent } from './feature/order/orderadd/orderadd.component';
import { OrderdetailComponent } from './feature/order/orderdetail/orderdetail.component';
import { OrdereditComponent } from './feature/order/orderedit/orderedit.component';

export const routes: Routes = [
    {path: 'customer', component: CustomerComponent},
    {path: 'customer/add', component: CustomeraddComponent},
    {path: 'customer/detail/:id', component: CustomerdetailComponent},
    {path: 'customer/edit/:id', component: CustomereditComponent},
    {path: 'items', component: ItemsComponent},
    {path: 'items/add', component: ItemaddComponent},
    {path: 'items/detail/:id', component: ItemdetailComponent},
    {path: 'items/edit/:id', component: ItemeditComponent},
    {path: 'order', component: OrderComponent},
    {path: 'order/add', component: OrderaddComponent},
    {path: 'order/detail/:id', component: OrderdetailComponent},
    {path: 'order/edit/:id', component: OrdereditComponent},
    {path: '', redirectTo: '/customer', pathMatch: 'full'}, // Default route
];
