import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { IFormLogin } from '../../interfaces/IFormLogin.interface';

import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';;
import { MatInputModule } from '@angular/material/input'

import { EnumKeys } from '../../../shared/enums/keys';

@Component({
  selector: 'app-form-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    // ? Angular Material
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
],
  templateUrl: './form-login.html',
  styleUrl: './form-login.scss',
})
export class FormLogin implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _sharedService = inject(SharedService);
  public readonly hide = signal(true);

  // ? Output - Comunicación Hijo - Padre
  @Output() onFormValue: EventEmitter<IFormLogin> = new EventEmitter<IFormLogin>();
  @Output() onRedirect: EventEmitter<string> = new EventEmitter<string>();

  private readonly _formLogin: FormGroup = this._fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    rememberme: ['']
  });

  ngOnInit() {
    if(localStorage.getItem(EnumKeys.RECUERDAME)){
      this._formLogin.patchValue(JSON.parse(localStorage.getItem(EnumKeys.RECUERDAME)!))
    }
  }

  get getFormLogin() {
    return this._formLogin;
  }

  // ? Validación si el controlador fue tocado por el usuario
  isValidControl(controlName: string) {
    return this._sharedService.isValidControl(this._formLogin, controlName);
  }

  // ? Mensajes de Error
  getError(controlName: string, label?: string): string {
    return this._sharedService.getError(this._formLogin, controlName, label);
  }

  onLogin() {
    if (this._formLogin.invalid) return;
    if(this._formLogin.get('rememberme')?.value && !localStorage.getItem(EnumKeys.RECUERDAME)){
      localStorage.setItem(EnumKeys.RECUERDAME, JSON.stringify(this._formLogin.value))
    } else if(!this._formLogin.get('rememberme')?.value && localStorage.getItem(EnumKeys.RECUERDAME)){
      localStorage.removeItem(EnumKeys.RECUERDAME)
    }
    this.onFormValue.emit(this._formLogin.value as IFormLogin);
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  redirect(path: string){
    this.onRedirect.emit(path);
  }
}
