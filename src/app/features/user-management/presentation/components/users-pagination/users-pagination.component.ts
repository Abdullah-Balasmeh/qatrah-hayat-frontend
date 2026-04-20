import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-users-pagination',
  imports: [],
  templateUrl: './users-pagination.component.html',
  styleUrl: './users-pagination.component.css'
})
export class UsersPaginationComponent {
  readonly shownFrom = input.required<number>();
  readonly shownTo = input.required<number>();
  readonly totalCount = input.required<number>();
  readonly pageNumber = input.required<number>();
  readonly totalPages = input.required<number>();

  readonly previousClicked = output<void>();
  readonly nextClicked = output<void>();
}
