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

  async obtenerIdAlumno(){
    const alumno = this.supabase.auth.user();

    if (alumno) {
      const {data, error} = await  this.supabase
      .from ('alumno')
      .select ('id_alumno')
      .eq('email_alumno',alumno.email_alumno);
    if (error){
      console.error('error al obtener el id del alumno: ', error);
      return null;
    }
    if (data && data.length > 0 ){
      return data[0].id;
    }
    }
    return null;
  }

  async verificarCredenciales(email_alumno: string, contrasena_alumno: string) {
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

  // Método para establecer el estado de autenticación
  establecerAutenticacion(autenticado: boolean) {
    this.autenticado = autenticado;
  }

  // Método para obtener el estado de autenticación
  estaAutenticado(): boolean {
    return this.autenticado;
  }
}
