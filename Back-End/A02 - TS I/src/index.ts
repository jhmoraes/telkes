//console.log('hello, word!');

// função que retorne os carros de determinada marca
// se não passar a marca, retorna todos os carros

import { log } from "console"
import { TCarro, frota } from "./frota"


const buscarCarrosPorMarca = (frota: TCarro[], marca?: string): TCarro[] => {

    if (marca === undefined) {
        return frota
    }

    return frota.filter((carro) => carro.marca.toLowerCase() === marca.toLowerCase())

}

//console.log(buscarCarrosPorMarca(frota, 'Chevrolet'))
//console.log(buscarCarrosPorMarca(frota))

// função que a quantidade de carros por ano

const contarCarrosPorAno = (frota: TCarro[], ano: number):number => {

    let anoCarro:number = 0

    for (const carro of frota) {
       carro.ano === ano && anoCarro++ 
    }

    return anoCarro

}

console.log(contarCarrosPorAno(frota, 2020))


// tarefa de casa
// faça uma função que receba um objeto e adicione uma cor ao objeto carro





