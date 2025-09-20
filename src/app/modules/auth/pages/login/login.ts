import { Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { FormLogin } from '../../components/form-login/form-login';
import { AuthService } from '../../services/auth.service';
import { IFormLogin } from '../../interfaces/IFormLogin.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormLogin],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  @ViewChild('appFormLogin', { static: false}) appFormLogin?: ElementRef<HTMLDivElement>

  private readonly _authService = inject(AuthService)
  private readonly _toastr = inject(ToastrService)
  private readonly _router = inject(Router)

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

  redirect(path: string): void {
    if(this.appFormLogin){
      this.appFormLogin?.nativeElement.classList.add('animate__fadeOutDown')
    }
    setTimeout(() => {
      this._router.navigateByUrl(path);
    }, 1000);

  }
}


