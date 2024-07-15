import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';

@Component({
  selector: 'app-backend-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backend-errors.component.html',
  styleUrl: './backend-errors.component.scss',
})
export class BackendErrorsComponent implements OnInit {
  @Input() backendErrors: BackendErrorsInterface = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join('');
      return `${name} ${messages}`;
    });
  }
  //Test
}
