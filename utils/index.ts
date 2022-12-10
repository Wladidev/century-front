import { IReservation } from 'store/slices/reservation'

export const getReservationTimes = () => {
    var timeIntervals = []

    // Generamos los intervalos de tiempo en formato 'HH:MM'
    for (var h = 13; h <= 20; h++) {
        var time = h.toString().padStart(2, '0') + ':00'
        // Agregamos un objeto a la matriz con el intervalo de tiempo como valor y etiqueta
        timeIntervals.push({ value: time, label: time })
    }
    return timeIntervals
}

export function changeTimeToDate(date: Date, time: string) {
    var d = new Date(date)
    const splittedTime = time.split(':')
    d.setHours(parseInt(splittedTime[0]) - 3)
    d.setMinutes(parseInt(splittedTime[1]))
    d.setSeconds(0)
    d.setMilliseconds(0)
    return d
}

export function checkDateExists(
    date: Date,
    array: Array<IReservation>
): boolean {
    // Convertimos la fecha de entrada en un objeto Date de JavaScript
    var d = date instanceof Date ? date : new Date(date)
    console.log(d)
    // Recorremos la matriz de objetos
    // for (var i = 0; i < array.length; i++) {
    //     let current = new Date(array[i].date).getTime()
    //     console.log('date selected', d)
    //     console.log('date', new Date(array[i].date))
    //     // Si la fecha del objeto coincide con la fecha de entrada, devolvemos 'true'
    //     if (current === d.getTime()) {
    //         return true
    //     }
    // }
    return array.some((a) => new Date(a?.date)?.getTime() === d.getTime())

    // Si recorrimos toda la matriz y no encontramos ningún objeto con la fecha de entrada, devolvemos 'false'
}

export function getReservationsByEmail(
    reservations: Array<IReservation>,
    mail: string
) {
    return reservations.filter(
        (reservation) => reservation.mail.toLowerCase() === mail.toLowerCase()
    )
}

export function getRandomNumber() {
    return Math.floor(Math.random() * 8) + 1
}
