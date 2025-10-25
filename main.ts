import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';

const coursesTBody: HTMLElement = document.getElementById("courses")!;
const inputSearchBox: HTMLInputElement = document.getElementById("search-box")! as HTMLInputElement;
const btnfilterByName = document.getElementById("button-filterByName")!;
btnfilterByName.onclick = () => applyFilterByName();
const totalCreditsElement: HTMLElement = document.getElementById("total-credits")!;

renderCoursesInTable(dataCourses);
updateTotalCredits(dataCourses);

function renderCoursesInTable(courses: Course[]): void{
    courses.forEach(curso => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${curso.nombre}</td>
                                <td>${curso.profesor}</td>
                                <td>${curso.creditos}</td>`; //codigo html
        coursesTBody.appendChild(trElement);
    }); //elemento, indice?, arreglo? => {codigo por cada elmente}
}

function getTotalCredits(courses: Course[]): number{
    let total: number=0;
    courses.forEach(curso => {
        total = total + curso.creditos;
    })
    return total;
}

function updateTotalCredits(courses: Course[]): void {
    const total = getTotalCredits(courses);
    totalCreditsElement.innerHTML = `<strong>Total Créditos:</strong> ${total}`;
}

function clearCoursesInTable(): void {
    while (coursesTBody.hasChildNodes()) {
        if (coursesTBody.firstChild) {
            coursesTBody.removeChild(coursesTBody.firstChild);
        }
    }
}

//para boton
function applyFilterByName(){
    let nombre = inputSearchBox.value;
    nombre = (nombre == null) ? '': nombre;
    clearCoursesInTable();
    let cursosFiltrados: Course[] = searchCourseByName(nombre, dataCourses);
    renderCoursesInTable(cursosFiltrados);
    updateTotalCredits(cursosFiltrados);
}

function searchCourseByName(clave: string, cursos: Course[]) {
    const claveLower = clave.toLowerCase();
    return clave === ''? dataCourses : cursos.filter(curso => curso.nombre.toLowerCase().includes(claveLower));
}
