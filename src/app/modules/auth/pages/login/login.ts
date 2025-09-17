import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { FormLogin } from '../../components/form-login/form-login';
import { AuthService } from '../../services/auth.service';
import { IFormLogin } from '../../interfaces/IFormLogin.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormLogin],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private readonly _authService = inject(AuthService)

  login(value: IFormLogin){
     const { email, password } = value
     if(!email || !password) return
     this._authService.login({ email, password }).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {

      }
     })
  }
}


