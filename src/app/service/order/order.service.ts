import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8081/api/simple-olshop-service/order';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any[]> {
    return this.http.post<{ code: string; message: string; result: any[] }>(`${this.apiUrl}/list`, {}).pipe(
      map(response => {
        if (response.code === '200') {
          return response.result;
        } else {
          throw new Error('Failed to fetch orders');
        }
      }),
      catchError(error => {
        // Handle error, log it or display a user-friendly message
        console.error('Error fetching orders:', error);
        return throwError(error);
      })
    );
  }
  
  getOrderById(id: number): Observable<any> {
    return this.http.get<{ code: string; message: string; result: any[] }>(`${this.apiUrl}/detail/${id}`).pipe(
      map(response => {
        if (response.code === '200') {
          return response.result;
        } else {
          throw new Error('Failed to fetch orders');
        }
      }),
      catchError(error => {
        // Handle error, log it or display a user-friendly message
        console.error('Error fetching orders:', error);
        return throwError(error);
      })
    );
  }

  addOrder(orderData: any): Observable<any> {
    return this.http.post<{ code: string; message: string; result: any[] }>(`${this.apiUrl}/create`, orderData).pipe(
      catchError(error => {
        console.error('Error adding order:', error);
        return throwError(error);
      })
    );
  }

  editOrder(orderData: any): Observable<any> {
    return this.http.put<{ code: string; message: string; result: any[] }>(`${this.apiUrl}/update`, orderData).pipe(
      catchError(error => {
        console.error('Error edit order:', error);
        return throwError(error);
      })
    );
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete<{ code: string; message: string; result: any[] }>(`${this.apiUrl}/delete/${id}`).pipe(
      catchError(error => {
        // Handle error, log it, or display a user-friendly message
        console.error('Error fetching order details:', error);
        return throwError(error);
      })
    );
  }

  getOrderReport(): Observable<any> {
    return this.http.get<{ code: string; message: string; result: any[] }>(`${this.apiUrl}/download`).pipe(
      catchError(error => {
        // Handle error, log it, or display a user-friendly message
        console.error('Error fetching order report:', error);
        return throwError(error);
      })
    );
  }
}
