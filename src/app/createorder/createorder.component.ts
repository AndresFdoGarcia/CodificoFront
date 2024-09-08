import { Component, EventEmitter, Output,Input,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-createorder',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.css']
})
export class CreateOrderComponent implements OnInit {
  @Input() customerName: string = '';
  @Input() orders: any[] = [];
  @Output() close = new EventEmitter<void>();

  employees: any[] = [];
  shippers: any[] = [];
  products: any[] = [];
  today: string = '';
  selectedProductPrice: number | null = null;


  // Form fields
  empId: number = 0;
  custId: number = 0;
  shipperId: number = 0;
  shipName: string = '';
  shipAddress: string = '';
  shipCity: string = '';
  orderDate: string = '';
  requiredDate: string = '';
  shippedDate: string = '';
  freight: number = 0;
  shipCountry: string = '';
  productId: number = 0;
  unitPrice: number = 0;
  qty: number = 0;
  discount: number = 0;


  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadShippers();
    this.loadProducts();

    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
  }

  ngAfterViewInit() {
    // Aquí puedes abrir el modal si es necesario
  }

  loadEmployees() {
    this.customerService.getAllEmployees().subscribe(response => {
      this.employees = response.data;
    });
  }

  loadShippers() {
    this.customerService.getAllShippers().subscribe(response => {
      this.shippers = response.data;
    });
  }

  loadProducts() {
    this.customerService.getAllProducts().subscribe(response => {
      this.products = response.data;
    });
  }

  onProductChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedProductId = Number(selectElement.value);
    const selectedProduct = this.products.find(product => product.productId === selectedProductId);
    this.selectedProductPrice = selectedProduct ? selectedProduct.unitPrice : null;
  }

  saveOrder() {
    const orderData = {
      empId: this.empId,
      custId: this.custId,
      shipperId: this.shipperId,
      shipName: this.shipName,
      shipAddress: this.shipAddress,
      shipCity: this.shipCity,
      orderDate: this.orderDate,
      requiredDate: this.requiredDate,
      shippedDate: this.shippedDate,
      freight: this.freight,
      shipCountry: this.shipCountry,
      productId: this.productId,
      unitPrice: this.unitPrice,
      qty: this.qty,
      discount: this.discount
    };

    this.customerService.postOrder(orderData).subscribe(response => {
      console.log('Order saved successfully', response);
      this.closeModal2();
    }, error => {
      console.error('Error saving order', error);
    });
  }

  closeModal2() {
    this.close.emit();
  }
}