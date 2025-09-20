import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormField,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './form-register.html',
  styleUrl: './form-register.scss',
})
export class FormRegister {
  private readonly _fb = inject(FormBuilder);

  private readonly _sharedService = inject(SharedService);
  public readonly hide = signal(true);

  @Output() onFormRegister = new EventEmitter();
  @Output() onRedirect: EventEmitter<string> = new EventEmitter<string>();

  private readonly _formRegister = this._fb.group({
    firstNames: ['', [Validators.required], []],
    lastNames: ['', [Validators.required], []],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required], []],
    repeatPassword: ['', [Validators.required, this.validatePasswordCompare('password')], []],
  });

  get getFormRegister() {
    return this._formRegister;
  }

  getError(controlName: string, label?: string) {
    return this._sharedService.getError(this._formRegister, controlName, label);
  }

  isValidControl(controlName: string) {
    return this._sharedService.isValidControl(this._formRegister, controlName);
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onRegister() {
    if (this._formRegister.invalid) return;
    this.onFormRegister.emit(this._formRegister.value);
  }

  redirect(path: string) {
    this.onRedirect.emit(path);
  }

  validatePasswordCompare(repeatPasswordField: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null; // aún no está inicializado
      }

      const otherControl = control.parent.get(repeatPasswordField);
      if (!otherControl) {
        return null;
      }

      //  Comparamos valores
      if (control.value !== otherControl.value) {
        return { mismatch: true }; // ❌ no coinciden
      }

      return null;
    };
  }
}
