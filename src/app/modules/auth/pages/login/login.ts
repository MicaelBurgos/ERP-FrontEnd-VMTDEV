import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { FormLogin } from '../../components/form-login/form-login';
import { AuthService } from '../../services/auth.service';
import { IFormLogin } from '../../interfaces/IFormLogin.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormLogin],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private readonly _authService = inject(AuthService)
  private readonly _toastr = inject(ToastrService)

  login(value: IFormLogin){
     const { email, password } = value
     if(!email || !password) return
     this._authService.login({ email, password }).subscribe({
      next: (res) => {
        if(res.code.toString().includes('20')){

          this._toastr.success(res.message, 'Transacción Exítosa')
        } else {
          this._toastr.error(res.message, 'Ocurrio un problema')


        }

      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      },
      complete: () => {

      }
     })
  }
}


