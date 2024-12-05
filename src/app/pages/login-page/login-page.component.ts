import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ref, get } from 'firebase/database';
import { db } from '../../../../firebase-config';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  name: string = '';
  password: string = '';

  constructor(private _router: Router) { }

  async login(){
    const login: boolean = await this.checkUserCredentials(this.name, this.password)
    console.log(login);
    this._router.navigate(['/admin-page']);
  }

  private async checkUserCredentials(name: string, password: string): Promise<boolean> {
    const userRef = ref(db, 'user/'+'1a');

    try {

      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const user = snapshot.val();

        if (user.name === name && user.password === password) {
          return true;
        } else {
          console.log('Credenciales incorrectas');
          return false;
        }
      } else {
        console.log('No data available');
        return false;
      }
    } catch (error) {
      console.error('Error al obtener datos de Firebase:', error);
      return false;
    }
  }
}
