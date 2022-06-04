
var db = openDatabase('mydbJesu ', '1.0', 'Test DB', 2 * 1024 * 1024);

btnS.addEventListener('click',()=>{accion()})

btnM.addEventListener('click',()=>{accion2()})

function accion2(){
    Limpiar();
}

var selectedRow = null

Agregar();


function accion(){
    var Datos= Leer();
    crearTable(Datos);
    if (selectedRow == null){
        LimpiarTabla();
        Agregar();
    }else
    Actualizar(Datos)
    Limpiar();

}

function Borrar(){
    db.transaction(function (tx) { 
        tx.executeSql('drop table Motocicletas '); 

    }); 
}

function Leer() {
    var formData = {};
    formData["Placa"] = document.getElementById("placa").value;
    formData["Marca"] = document.getElementById("marca").value;
    formData["Kilometro"] = document.getElementById("kilometro").value;
    formData["Precio"] = document.getElementById("precio").value; 
    return formData;
}

function crearTable(Datos){
    db.transaction(function (tx) { 
        tx.executeSql('CREATE TABLE IF NOT EXISTS Motocicletas (placa VARCHAR(12), marca VARCHAR(12), kilometro VARCHAR(12), precio VARCHAR(12))'); 
        tx.executeSql('INSERT INTO Motocicletas (placa,marca,kilometro,precio) VALUES (?, ?, ?, ?)', [Datos.Placa, Datos.Marca,Datos.Kilometro,Datos.Precio]);
    }); 
}


function Agregar(){

    db.transaction(function (tx) { 
        tx.executeSql('SELECT * FROM Motocicletas', [], function (tx, results) { 
           var len = results.rows.length, i; 
           for (i = 0; i < len; i++) { 
            var table = document.getElementById("table").getElementsByTagName('tbody')[0];
            var newRow = table.insertRow(table.length);
            cell1 = newRow.insertCell(0);
            cell1.innerHTML = results.rows.item(i).placa;
            cell2 = newRow.insertCell(1);
            cell2.innerHTML = results.rows.item(i).marca;
            cell3 = newRow.insertCell(2);
            cell3.innerHTML = results.rows.item(i).kilometro;
            cell4 = newRow.insertCell(3);
            cell4.innerHTML =  results.rows.item(i).precio;
            cell5 = newRow.insertCell(4);
            cell5.innerHTML = `<td class="text-center"><a onClick="Editar(this)" data-bs-toggle="modal" data-bs-target="#exampleModal"
                data-bs-whatever="@mdo" class="btnEditar btn btn-primary">Editar</a><a  onClick="Eliminar(this)" class="btnEliminar btn btn-danger">Borrar</a></td>`;
          } 
        }, null); 
     });

}

function LimpiarTabla(){
    $("#table > tbody").empty();
}

function Limpiar() {
    document.getElementById("placa").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("kilometro").value = "";
    document.getElementById("precio").value = "";
    selectedRow = null;
}

function Editar(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("placa").value = selectedRow.cells[0].innerHTML;
    document.getElementById("marca").value = selectedRow.cells[1].innerHTML;
    document.getElementById("kilometro").value = selectedRow.cells[2].innerHTML;
    document.getElementById("precio").value = selectedRow.cells[3].innerHTML;
}

function Actualizar(datos) {

    selectedRow.cells[0].innerHTML =datos.Placa;
    selectedRow.cells[1].innerHTML = datos.Marca;
    selectedRow.cells[2].innerHTML = datos.Kilometro;
    selectedRow.cells[3].innerHTML = datos.Precio;

    db.transaction(function (tx) { 
        tx.executeSql('delete from Motocicletas where placa = ?',[datos.Placa]); 
        tx.executeSql('INSERT INTO Motocicletas (placa,marca,kilometro,precio) VALUES (?, ?, ?, ?)', [datos.Placa, datos.Marca,datos.Kilometro,datos.Precio]);
    }); 
}


function Eliminar(td) {
    if (confirm('Seguro que quiere borrar?')) {
        row = td.parentElement.parentElement;
        db.transaction(function (tx) { 
            tx.executeSql('delete from Motocicletas where placa = ?',[row.cells[0].innerHTML]); 
         }); 
         document.getElementById("table").deleteRow(row.rowIndex);
        resetForm();
    }
}

