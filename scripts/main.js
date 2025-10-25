import { dataCourses } from './dataCourses.js';
var coursesTBody = document.getElementById("courses");
var inputSearchBox = document.getElementById("search-box");
var btnfilterByName = document.getElementById("button-filterByName");
btnfilterByName.onclick = function () { return applyFilterByName(); };
var totalCreditsElement = document.getElementById("total-credits");
renderCoursesInTable(dataCourses);
updateTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    courses.forEach(function (curso) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>".concat(curso.nombre, "</td>\n                                <td>").concat(curso.profesor, "</td>\n                                <td>").concat(curso.creditos, "</td>"); //codigo html
        coursesTBody.appendChild(trElement);
    }); //elemento, indice?, arreglo? => {codigo por cada elmente}
}
function getTotalCredits(courses) {
    var total = 0;
    courses.forEach(function (curso) {
        total = total + curso.creditos;
    });
    return total;
}
function updateTotalCredits(courses) {
    var total = getTotalCredits(courses);
    totalCreditsElement.innerHTML = "<strong>Total Cr\u00E9ditos:</strong> ".concat(total);
}
function clearCoursesInTable() {
    while (coursesTBody.hasChildNodes()) {
        if (coursesTBody.firstChild) {
            coursesTBody.removeChild(coursesTBody.firstChild);
        }
    }
}
//para boton
function applyFilterByName() {
    var nombre = inputSearchBox.value;
    nombre = (nombre == null) ? '' : nombre;
    clearCoursesInTable();
    var cursosFiltrados = searchCourseByName(nombre, dataCourses);
    renderCoursesInTable(cursosFiltrados);
    updateTotalCredits(cursosFiltrados);
}
function searchCourseByName(clave, cursos) {
    var claveLower = clave.toLowerCase();
    return clave === '' ? dataCourses : cursos.filter(function (curso) { return curso.nombre.toLowerCase().includes(claveLower); });
}
