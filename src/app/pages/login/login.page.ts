import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../../services/supabase/usuario.service'; 
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  email_alumno: string = '';
  contrasena_alumno: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

  async iniciarSesion() {
    try {
      const result = await this.usuarioService.verificarCredencialesAlumnos(this.email_alumno, this.contrasena_alumno);

      if (result) {
        // Inicio de sesión exitoso, redirige a la página principal o a donde desees
        this.router.navigate(['/home']);
      } else {
        // Las credenciales son incorrectas, muestra un mensaje de error
        this.mostrarToast('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Maneja el error apropiadamente
      this.mostrarToast('Error al iniciar sesión');
    }
  }

  irARegister() {
    // Navega a la página de registro cuando se hace clic en el enlace
    this.router.navigate(['/register']);
  }
}
