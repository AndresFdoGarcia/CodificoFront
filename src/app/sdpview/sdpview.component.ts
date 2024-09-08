import { Component, OnInit,AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewOrderComponent } from '../vieworder/vieworder.component';
import { CustomerService } from '../services/customer.service';
import { CreateOrderComponent } from '../createorder/createorder.component';

@Component({
  selector: 'app-sdpview',
  standalone: true,
  imports: [CommonModule, ViewOrderComponent, CreateOrderComponent],  
  templateUrl: './sdpview.component.html',
  styleUrl: './sdpview.component.css'  
})
export class SdpviewComponent implements OnInit, AfterViewInit {
  isModalOpen = false;
  isModalOpen2 = false;
  customers: any[] = [];;
  selectedCustomer: any;
  orders: any[] = [];

  // Variables para la paginación
  currentPage: number = 1;
  itemsPerPage:number = 10;
  paginatedCustomers: any[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.loadCustomers();    
  }

  ngAfterViewInit() {
    // Aquí puedes abrir el modal si es necesario
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
      this.updatePaginatedCustomers();
    });
  }

  updatePaginatedCustomers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCustomers = this.customers.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePaginatedCustomers();
  }

  getTotalPages(): number {
    return this.customers.length ? Math.ceil(this.customers.length / this.itemsPerPage) : 1;
  }

  openModal(event: Event, customer: any) {
    event.preventDefault();
    this.selectedCustomer = customer;
    this.customerService.getOrdersByCustomerId(customer.customerId).subscribe(response => {
      this.orders = response.data;
      this.isModalOpen = true;
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openModal2(event: Event, customer: any) {
    event.preventDefault();
    this.selectedCustomer = customer;
    this.isModalOpen2 = true;    
  }

  closeModal2() {
    this.isModalOpen2 = false;
  }
}
