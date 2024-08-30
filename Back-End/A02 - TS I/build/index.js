"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frota_1 = require("./frota");
const buscarCarrosPorMarca = (frota, marca) => {
    if (marca === undefined) {
        return frota;
    }
    return frota.filter((carro) => carro.marca.toLowerCase() === marca.toLowerCase());
};
const contarCarrosPorAno = (frota, ano) => {
    let anoCarro = 0;
    for (const carro of frota) {
        carro.ano === ano && anoCarro++;
    }
    return anoCarro;
};
console.log(contarCarrosPorAno(frota_1.frota, 2020));
//# sourceMappingURL=index.js.map