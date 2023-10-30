import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { UsuarioService } from '../../services/supabase/usuario.service'; // Ruta corregida para el servicio
import { asistenciaservice } from 'src/app/services/supabase/asistencia.service';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { error } from 'console';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})



export class HomePage implements OnInit {
  nombre_asignatura: String = '';
  estado_asistencia: String = '';
  id_alumno: Number = 0;
  registrosAsistencia: any[] = [];
  supabase= createClient(environment.supabaseUrl,environment.supabaseKey);

  constructor(

    private asistenciaservice: asistenciaservice,
    private usuarioService: UsuarioService,
    private router: Router) {}
    

    async registrarAsistencia() {
      const asignaturaSeleccionada = this.nombre_asignatura;
      const estadoAsistencia = this.estado_asistencia;
    
      try {
        const response = await this.supabase.from('asistencia').upsert([
          {
            nombre_asignatura: asignaturaSeleccionada,
            estado_asistencia: estadoAsistencia
          }
        ]);
        console.log('Datos insertados con éxito', response);
      } catch (error) {
        console.error('Error al insertar los datos', error);
      }
    }

    async obtenerRegistrosAsistencia() {
      const { data, error } = await this.supabase.from('asistencia').select('*');
      if (error) {
        console.error('Error al obtener registros de asistencia:', error);
      } else {
        // Almacenar los registros de asistencia en una variable del componente.
        this.registrosAsistencia = data;
      }
    }
  

  ngOnInit() {
    this.obtenerRegistrosAsistencia();
  }

  cerrarSesion() {
    // Cambia el estado de autenticación a false
    this.usuarioService.establecerAutenticacion(false);

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);

    // Imprimir el estado de autenticación en la consola
    console.log('Usuario autenticado:', this.usuarioService.estaAutenticado())
  }

}