import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:8081/api/simple-olshop-service/customer';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/list`,{}).pipe(
      catchError(error => {
        // Handle error, log it or display a user-friendly message
        console.error('Error fetching customers:', error);
        return throwError(error);
      })
    );
  }

  getCustomerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detail/${id}`).pipe(
      catchError(error => {
        // Handle error, log it, or display a user-friendly message
        console.error('Error fetching customer details:', error);
        return throwError(error);
      })
    );
  }

  addCustomer(customerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, customerData).pipe(
      catchError(error => {
        console.error('Error adding customer:', error);
        return throwError(error);
      })
    );
  }

  editCustomer(customerData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, customerData).pipe(
      catchError(error => {
        console.error('Error edit customer:', error);
        return throwError(error);
      })
    );
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`).pipe(
      catchError(error => {
        // Handle error, log it, or display a user-friendly message
        console.error('Error fetching customer details:', error);
        return throwError(error);
      })
    );
  }

  getCustomerImage(bucketName: string, objectName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/get-object?bucketName=${bucketName}&objectName=${objectName}`, { responseType: 'blob' });
  }
}
