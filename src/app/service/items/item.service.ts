import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:8081/api/simple-olshop-service/items';

  constructor(private http: HttpClient) { }

  getItems(): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/list`,{}).pipe(
      catchError(error => {
        // Handle error, log it or display a user-friendly message
        console.error('Error fetching items:', error);
        return throwError(error);
      })
    );
  }

  getItemById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detail/${id}`).pipe(
      catchError(error => {
        // Handle error, log it, or display a user-friendly message
        console.error('Error fetching item details:', error);
        return throwError(error);
      })
    );
  }

  addItem(itemData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, itemData).pipe(
      catchError(error => {
        console.error('Error adding item:', error);
        return throwError(error);
      })
    );
  }

  editItem(itemData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, itemData).pipe(
      catchError(error => {
        console.error('Error edit item:', error);
        return throwError(error);
      })
    );
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`).pipe(
      catchError(error => {
        // Handle error, log it, or display a user-friendly message
        console.error('Error fetching item details:', error);
        return throwError(error);
      })
    );
  }
}
