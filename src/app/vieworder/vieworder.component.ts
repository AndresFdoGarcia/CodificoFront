import { Component, EventEmitter, Output,Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vieworder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vieworder.component.html',
  styleUrl: './vieworder.component.css'
})
export class ViewOrderComponent {
  @Input() customerName: string = '';
  @Input() orders: any[] = []; 
  @Output() close = new EventEmitter<void>();
  

  closeModal() {
    this.close.emit();
  }
}
