import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedService } from '../../../shared/services/shared.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FormRegister } from '../../components/form-register/form-register';

@Component({
  selector: 'app-register',
  imports: [
    FormRegister
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  @ViewChild('appFormRegister', { static: false}) appFormRegister?: ElementRef<HTMLDivElement>

  private readonly _router = inject(Router)
  onRegister(value: any) {}

  redirect(path: string): void {
    if(this.appFormRegister){
      this.appFormRegister?.nativeElement.classList.add('animate__fadeOutDown')
    }
    setTimeout(() => {
      this._router.navigateByUrl(path);
    }, 1000);

  }


}
