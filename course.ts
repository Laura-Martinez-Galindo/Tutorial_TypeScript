export class Course{
    nombre: string;
    profesor: string;
    creditos: number;
    
    constructor(nombre: string, profesor: string, creditos: number){
        this.nombre = nombre;
        this.profesor = profesor;
        this.creditos = creditos;
    }
}