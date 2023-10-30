import { Time } from "@angular/common";

export class alumno{
    constructor(
        public nombre_alumno: String,
        public apellidoP: String,
        public apellidoM: String,
        public email: String,
        public contrasena_alumno: String,
        public run: Number,
        public carrera: string

    ){        
    }   
}
export class asignatura{
    constructor(
        public id_asignatura: Number,
        public nombre_asignatura: String,
        public id_carrera: Number
    ){
    }
}
export class carrera{
    constructor(
        public id_carrea: Number,
        public nombre_carrea: String
    ){       
    }
}
export class seccion {
    constructor(
        public id_seccion: Number,
        public id_asignatura: Number,
        public id_alumno: Number
    ){
    }
}
export class asistencia{
    constructor(
        public id_asistencia: Number,
        public estado_asistencia: Boolean,
        public id_horario: Number,
        public id_alumno: Number
    ){

    }
}
export class horario{
    constructor(
        public id_horario: Number,
        public hora_ini: Date,
        public hora_fin: Date,
        public dia_semana: Date,
        public id_seccion: Number
    ){
    }
}
export class clase{
    constructor(
        public id_clase: Number,
        public id_seccion: Number,
        public id_horario: Number,
        public id_asistencia: Number,
    ){
    }
}