async function cargarReporteClientes() {
    try {
        const querySnapshot = await getDocs(collection(db, "formulariocredito"));
        const reporteClienteList = document.getElementById('reporteClienteList');

            row.addEventListener('click', () => {
                window.location.href = `reportedetallecliente.html?clienteId=${doc.id}`;
            });
        });
    } catch (error) {
        console.log("Error al cargar el reporte de clientes: ", error);
    }
}
