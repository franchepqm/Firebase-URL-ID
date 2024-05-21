function cargarDetalleCredito() {
    const urlParams = new URLSearchParams(window.location.search);
    const idDocumento = urlParams.get('clienteId');
    const detalleCredito = document.getElementById('detalleCredito');
    const cuotasSelector = document.getElementById('cuotasSelector');
    const montoPagoParcialInput = document.getElementById('montoPagoParcial');
    const montoTotalInput = document.getElementById('montoTotal');

    const docRef = doc(db, "formulariocredito", idDocumento);
    getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            const montoTotal = parseFloat(doc.data().montoTotal);
            const cuotas = parseInt(doc.data().cuotas);
            const valorCuota = montoTotal / cuotas;

            detalleCredito.innerHTML = `
            <div id="datosreporte">
            <p style="display: flex; justify-content: space-between; margin: 0; margin-bottom: 0;">
                <strong style="align-self: start;">Contacto:</strong>
                <span style="align-self: end;">${doc.data().nombre}</span>
            </p>
            <p style="display: flex; justify-content: space-between; margin: 0; margin-top: 0; ">
                <strong style="align-self: start;">Fecha de transacción:</strong>
                <span style="align-self: end;">${doc.data().fechaActual}</span>
            </p>

            <div style="display: flex; flex-direction: row;">

                <div style="margin-right: auto; margin-top: 20px;">
                    <p style="display: flex; flex-direction: column; justify-content: space-between; margin: 0;">
                        <strong style="align-self: start;">Descripcion</strong>
                    </p>
                </div>

                <div style="margin-left: auto; margin-top: 20px;">
                    <p style="display: flex; flex-direction: column; justify-content: space-between; margin: 0;">
                        <strong style="align-self: start;">Valor</strong>
                    </p>
                </div>
            </div>
            <div style="display: flex; flex-direction: row;">
                <div style="margin-right: auto;">
                    <p style="display: flex; flex-direction: column; justify-content: space-between; margin: 0;">
                        <span style="align-self: end;">${doc.data().articulo}</span>
                    </p>
                </div>
                <div style="margin-left: auto; margin-bottom: 20px;" >
                    <p style="display: flex; flex-direction: column; justify-content: space-between; margin: 0;">
                        <span style="align-self: end;">${doc.data().montoTotal}</span>
                    </p>
                </div>
            </div>
            <div class="line"></div>
            <h2 style="display: flex; justify-content: space-between;">
                <strong style="align-self: start;">Total:</strong>
                <strong style="align-self: end;"><span>${doc.data().montoTotal}</span></strong>
            </h2>
        </div>
            `;
            for (let i = 1; i <= doc.data().cuotas; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                cuotasSelector.appendChild(option);
            }

            montoPagoParcialInput.value = valorCuota.toFixed(2);
            montoTotalInput.value = valorCuota.toFixed(2);

            const nombreCliente = doc.data().nombre;
            cargarHistorial(nombreCliente); // Llama a la función cargarHistorial con el nombre del cliente
        } else {
            console.log("No se encontró el documento.");
        }
    }).catch((error) => {
        console.log("Error al cargar el detalle del crédito: ", error);
    });
}
