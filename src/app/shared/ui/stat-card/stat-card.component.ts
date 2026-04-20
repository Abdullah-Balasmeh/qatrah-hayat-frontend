import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  imports: [NgClass],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {
 readonly title = input.required<string>();
 readonly value = input.required<number | string>();
 readonly icon = input.required<string>();
 readonly colorClass = input<string>('icon-pink');


}
