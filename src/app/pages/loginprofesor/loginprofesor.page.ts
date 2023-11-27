import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioService } from '../../services/supabase/usuario.service'; 
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginprofesor',
  templateUrl: './loginprofesor.page.html',
  styleUrls: ['./loginprofesor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class LoginProfesorPage {
  email_profesor: string ='';
  contrasena_profesor: string='';

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  async iniciarSesion() {
    const exitoInicioSesion = await this.usuarioService.verificarCredencialesProfesor(
      this.email_profesor,
      this.contrasena_profesor
    );

    if (exitoInicioSesion) {
      console.log('Inicio de sesión exitoso para el profesor');
      // Redirige a la página después del inicio de sesión exitoso
      this.router.navigate(['/homeprofesor']); // Ajusta la ruta según tu estructura de proyecto
    } else {
      console.error('Inicio de sesión fallido para el profesor');
      // Puedes mostrar un mensaje de error al usuario si lo prefieres
    }
  }
}