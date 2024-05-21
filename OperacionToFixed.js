let sumaAbonos = 0;
querySnapshot.forEach((doc) => {
    const montoPagoParcial = doc.data().montoPagoParcial;
    sumaAbonos += montoPagoParcial;
});

const sumaAbonosElement = document.getElementById('sumaAbonos');
sumaAbonosElement.textContent = `Total Abonos: ${sumaAbonos.toFixed(2)}`;
