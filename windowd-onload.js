window.onload = function() {
    cargarDetalleCredito(); 
    cargarHistorial(); 

    const urlParams = new URLSearchParams(window.location.search);
    const idDocumento = urlParams.get('clienteId');
    const docRef = doc(db, "formulariocredito", idDocumento);
    getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            const nombreContacto = doc.data().nombre;
            const searchInput = document.getElementById('searchInput');
            searchInput.value = nombreContacto;
        }
    }).catch((error) => {
        console.log("Error al cargar el nombre del contacto: ", error);
    });
};
