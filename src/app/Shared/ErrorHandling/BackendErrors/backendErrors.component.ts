import { Component, Input, OnInit } from "@angular/core"
import { BackendErrorsInterface } from "./Types/backendErrors.interface"
import { CommonModule } from "@angular/common"


@Component({
    imports: [CommonModule],
    selector: 'mc-backend-error-messages',
    templateUrl: './backendErrors.component.html',
    standalone: true,
    })

    export class BacknedErrorMessages implements OnInit{
    @Input() backendErrors: BackendErrorsInterface = {}

    errorMessages: string[] = []

    ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
        const messages = this.backendErrors[name].join('')
        return `${name} ${messages}`
    })
    }
}