import { Injectable } from "@angular/core";
import { createClient } from "@supabase/supabase-js";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class asistenciaservice{
    private supabase: any;

    constructor(){
        this.supabase = createClient(environment.supabaseUrl,environment.supabaseKey);
    }

    async insertarAsistencia (asistencia: any){
        const {data, error} = await this.supabase
        .from('asistencia')
        .upset([
            {
                id_asistencia: asistencia.id_asistencia,
                estado_asistencia: asistencia.estado_asistencia,
                id_alumno: asistencia.id_alumno,
                nombre_asignatura: asistencia.nombre_asignatura,
            },
        ])
        .select();
    if (error){
        console.error('error de insertar: ', error);
    } else{
        console.log('Datos insertados: ',data);
    }
    }
}


