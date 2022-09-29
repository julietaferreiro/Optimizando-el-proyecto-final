function convertirTiempo(duration) {
    segundos =Math.floor((duration /1000)%60),
    minutos =Math.floor((duration /(1000*60))%60),
    horas =Math.floor((duration /(1000*60*60))%24);

    horas =(horas <10)?"0"+ horas : horas;
    minutos =(minutos <10)?"0"+ minutos : minutos;
    segundos =(segundos <10)?"0"+ segundos : segundos;
    return `${horas} : ${minutos} : ${segundos}`
}

const cargarVehiculos = () => {
    const garage = obtenerGarage()
    document.querySelector('#garage').innerHTML = ''
    garage.forEach(vehiculo => ingresarVehiculo(vehiculo))
}

function ingresarVehiculo(vehiculo){
    let fila = document.createElement('tr')
    let tbody = document.querySelector('#garage')

    fila.innerHTML = `
    <td>${vehiculo.propietario}</td>
    <td>${vehiculo.patente}</td>
    <td data-time="${vehiculo.entrada}">${new Date(vehiculo.entrada).toLocaleString('es-AR',{hour: 'numeric', minute: 'numeric'})}</td>
    <td>
    <button class='delete'>X</button>
    </td>
    `

    tbody.appendChild(fila)
}

function checkOut(info){
    let tiempoEstacionado = new Date() - new Date(info[2].dataset.time)
    tiempoEstacionado = convertirTiempo(tiempoEstacionado)

    const patente = info[1].textContent

    const mensaje = `El vehiculo con patente ${patente} permanecio ${tiempoEstacionado} estacionado. ¿desea retirarse?`

    const garage = obtenerGarage().filter(vehiculo => vehiculo.patente !== patente)
    localStorage.setItem('garage',JSON.stringify(garage))
    cargarVehiculos()

    return mensaje
}

const obtenerGarage = () => {
    if(localStorage.getItem('garage')===null){
        localStorage.setItem('garage','[]')
    }
    const garage = JSON.parse(localStorage.getItem('garage'))
    return garage
}

function guardarEnLocalStorage(vehiculo){
    const garage = obtenerGarage()
    garage.push(vehiculo)

    localStorage.setItem('garage',JSON.stringify(garage))

    propietario.value = ''
    patente.value = ''
}

datosCompletos = () => {
    if (propietario.value !== '' && patente.value !== "") {
        return true
    } else {
        return false
    }
}

function validarPatente(patente){
    let patenteVieja = /^[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$/
    let patenteNueva = /^[a-zA-Z]{3}[0-9]{3}$/
    if(patenteVieja.test(patente) || patenteNueva.test(patente)){
        return patente
    }
    return patente.value =''
}

function validarNombre(propietario){
    let nombre = /^[a-zA-Z]{3,15}$/
    if(nombre.test(propietario)){
        return propietario
    }else{
    return propietario.value=''}
}