let btn = document.querySelector('#send')
let propietario = document.querySelector('#name')
let patente = document.querySelector('#licence')

let localStorage = window.localStorage

cargarVehiculos()

btn.addEventListener('click',()=>{
    const vehiculo = {
        propietario: validarNombre(propietario.value),
        patente: validarPatente(patente.value),
        entrada: new Date()
    }
    if(datosCompletos()){
        if(vehiculo.propietario === ''){
            Swal.fire('INGRESA UN NOMBRE CORRECTO',
                    'EJEMPLO: ANA - LUIS')
        }else if(vehiculo.patente ===''){
            Swal.fire('INGRESA UNA PATENTE CORRECTA',
                    'EJEMPLO: ABC123 - AB123CD')
        }else{
            guardarEnLocalStorage(vehiculo)
            ingresarVehiculo(vehiculo)
        }
    }else{
        Swal.fire('Los campos deben estar completos')
    }
})

let btnDelete = document.querySelector('#garage')
btnDelete.addEventListener('click', e => {
    let propietario = document.querySelector('#name')
    Swal.fire({
        title: 'Desea retirar el auto?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
            if(e.target.className === 'delete'){
                checkOut(e.target.parentElement.parentElement.cells)
            }
            Swal.fire(
            'Su auto fue retirado con éxito.',
          )
        }
      })
})