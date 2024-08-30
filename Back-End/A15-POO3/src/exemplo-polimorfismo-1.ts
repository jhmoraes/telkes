import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

interface Animal { //é contrato que precisa ser seguido
    makeSound(): void;
}

class Dog implements Animal {
    makeSound(): void{
        console.log("Au! Au!");
    }
}

class Cat implements Animal {
    makeSound(): void {
        console.log("Miau! Miau!");
    }
}

class Vaca implements Animal {
    makeSound(): void {
        console.log("Moo! Moo!");
    }
}

const reproduzirSomAnimal = (animal: Animal) =>{
    animal.makeSound()
}

const dog = new Dog
const cat = new Cat
const vaca = new Vaca

console.log("========================");

reproduzirSomAnimal(vaca)

console.log("========================");