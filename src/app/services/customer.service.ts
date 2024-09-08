import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7293/api/SDP'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SalesDatePrediction`);
  }

  getOrdersByCustomerId(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetClientOrders/${customerId}`);
  }

  getAllEmployees(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllEmployees`);
  }

  getAllShippers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllShippers`);
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllProducts`);
  }

  postOrder(orderData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/CreateNewOrder`, orderData);
  }
}