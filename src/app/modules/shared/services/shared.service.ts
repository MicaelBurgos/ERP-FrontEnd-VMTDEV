import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumErrors } from '../enums/errors';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // ? Mensajes de Error
  getError(form: FormGroup ,controlName: string, label?: string): string {
    const errors = form.get(controlName)?.errors;
    if (!errors) return '';
    const name: string = label ?? controlName

    for (const key in errors) {
      switch (key) {
        case EnumErrors.REQUIRED:
          return `El campo ${name} es requerido`;
        case EnumErrors.EMAIL:
          return `El campo ${name} no es un correo válido.`;
        default:
          return `Error desconocido ${key}`;
      }
    }
    return '';
  }

  isValidControl(form: FormGroup, controlName: string) {
    return form.get(controlName)?.invalid &&
      form.get(controlName)?.touched;
  }

}
