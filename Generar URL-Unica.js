async function cargarReporteClientes() {
    try {
        const querySnapshot = await getDocs(collection(db, "formulariocredito"));
        const reporteClienteList = document.getElementById('reporteClienteList');
        
        querySnapshot.forEach((doc) => {
            const nombre = doc.data().nombre;
            const articulo = doc.data().articulo;
            const cuotas = doc.data().cuotas;
            const montoTotal = doc.data().montoTotal;
            const fechaCobro = doc.data().fechaCobro;
            const valorCuota = doc.data().valorCuota; // Agrega el valor de la cuota
            
            // Crear una nueva fila de la tabla
            const row = reporteClienteList.insertRow();

            // Insertar datos en las celdas de la fila
            row.insertCell().textContent = nombre;
            row.insertCell().textContent = articulo;
            row.insertCell().textContent = cuotas;
            row.insertCell().textContent = valorCuota; // Agrega la columna de valor de cuota
            row.insertCell().textContent = montoTotal;
            row.insertCell().textContent = fechaCobro;

            row.addEventListener('click', () => {
                window.location.href = `reportedetallecliente.html?clienteId=${doc.id}`;
            });
        });
    } catch (error) {
        console.log("Error al cargar el reporte de clientes: ", error);
    }
}
