import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';

@Component({
  imports: [CommonModule],
  selector: 'mc-backend-error-messages',
  templateUrl: './backenderrors.component.html',
  standalone: true,
})
export class BackendErrors implements OnInit {
  @Input() backendErrors: BackendErrorsInterface = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join('');
      return `${name} ${messages}`;
    });
  }
}
