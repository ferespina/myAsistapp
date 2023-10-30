import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    this.supabase = createClient('https://gsyjdolonjbgqcegpryi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzeWpkb2xvbmpiZ3FjZWdwcnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxNTU3MjYsImV4cCI6MjAxMzczMTcyNn0.GfLPPKgNHMOvM_WAZeY3UJeeXIyWqedsWJUOv10Mqd4');
  }

  login(email_alumno: string, contrasena_alumno: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Realiza una consulta a la base de datos para verificar las credenciales
      this.supabase.from('alumno')
        .select()
        .eq('email_alumno', email_alumno)
        .eq('contrasena_alumno', contrasena_alumno)
        .then((response) => {
          if (response.error) {
            reject(response.error.message);
          } else if (response.data.length > 0) {
            // Usuario autenticado con éxito
            this.loggedIn.next(true);
            resolve();
          } else {
            // Credenciales incorrectas
            reject('Credenciales incorrectas');
          }
        })
        
    });
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }
}