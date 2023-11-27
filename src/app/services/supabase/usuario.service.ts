import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private supabase: any ;
  private autenticado = false; // Variable para rastrear el estado de autenticación

  constructor() { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async insertarUsuario(alumno: any) {
    const { data, error } = await this.supabase
      .from('alumno')
      .upsert([
        {
          run_alumno: alumno.run_alumno,
          nombre_alumno: alumno.nombre_alumno,
          apellidos: alumno.apep_alumno,
          apellido: alumno.apem_alumno,
          email_alumno: alumno.email_alumno,
          contrasena_alumno: alumno.contrasena_alumno,
        },
      ])
      .select();

    if (error) {
      console.error('Error insertando datos:', error);
    } else {
      console.log('Datos insertados con exito:', data);
    }
  }


  async verificarCredencialesAlumnos(email_alumno: string, contrasena_alumno: string) {
    // Consulta Supabase para verificar las credenciales
    const { data, error } = await this.supabase
      .from('alumno')
      .select()
      .eq('email_alumno', email_alumno)
      .eq('contrasena_alumno', contrasena_alumno);

    if (error) {
      console.error('Error al verificar las credenciales:', error);
      return false;
    }

    // Comprueba si se encontró un usuario con las credenciales proporcionadas
    const usuarioValido = data && data.length > 0;

    // Establece el estado de autenticación según el resultado
    this.autenticado = usuarioValido;

    return usuarioValido;
  }

  async verificarCredencialesProfesor(email_profesor: string, contrasena_profesor: string) {
    
    const { data, error } = await this.supabase
      .from('profesor')
      .select()
      .eq('email_profesor', email_profesor)
      .eq('contrasena_profesor', contrasena_profesor);

    if (error) {
      console.error('Error al verificar las credenciales:', error);
      return false;
    }

    // Comprueba si se encontró un usuario con las credenciales proporcionadas
    const usuarioValido = data && data.length > 0;

    // Establece el estado de autenticación según el resultado
    this.autenticado = usuarioValido;

    return usuarioValido;
  }

  // Método para establecer el estado de autenticación
  establecerAutenticacion(autenticado: boolean) {
    this.autenticado = autenticado;
  }

  // Método para obtener el estado de autenticación
  estaAutenticado(): boolean {
    return this.autenticado;
  }
}
