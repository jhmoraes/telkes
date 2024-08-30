import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})


/* 
    Esse é um exemplo de implementação de polimorfismo e interface
*/


//1. Definindo a Interface de Pagamento
//Primeiro, criamos uma interface que define o comportamento básico de um método de pagamento: 

interface MetodoPagamento {
    processaPagamento(quantia: number): void;
    reembolsoPagamento(idTransacao: string): void
}


// 2. Criando uma Classe Abstrata para Métodos de Pagamento
//Uma classe abstrata pode ser usada para fornecer implementação parcial, além de garantir que todos os métodos de pagamento sigam o mesmo contrato definido pela interface:

// A classe é abstrata porque ela está destinada a ser uma classe base para outros métodos de pagamento que implementam comportamentos específicos. Sendo abstrata ela somente é acessível por herança.

abstract class FormaDePagamentoClass implements MetodoPagamento {

     /* O método processPayment é abstrato na classe AbstractPaymentMethod porque cada método de pagamento específico (como Cartão de Crédito e PayPal) tem uma maneira única de processar um pagamento. Ao marcar processPayment como abstrato, a classe AbstractPaymentMethod força todas as subclasses que a estendem a fornecer sua própria implementação específica para esse método. */

    abstract processaPagamento(quantia: number): void; 

    reembolsoPagamento(idTransacao: string): void {
        console.log(`O reembolso foi processado para a transação ${idTransacao}`);

    }

    protected registrarTransacao(idTransacao: string): void {
        console.log(`Transação ${idTransacao} registrada`);
    }

}

// 3. Implementando Diferentes Métodos de Pagamento
//Agora, vamos implementar diferentes métodos de pagamento que herdam da classe abstrata e oferecem sua própria lógica específica:


class CartaoDeCredito extends FormaDePagamentoClass {

    processaPagamento(quantia: number): void {
        const idTransacao = 'CC123'
        console.log(`Processando pgto no cartão de crédito no valor de ${quantia}`)
        this.registrarTransacao(idTransacao)

    }

}

class PayPal extends FormaDePagamentoClass {

    processaPagamento(quantia: number): void {
        const idTransacao = 'PP456'
        console.log(`Processando pgto via PayPal no valor de ${quantia}`)
        this.registrarTransacao(idTransacao)

    }

}

class Pix extends FormaDePagamentoClass {

    processaPagamento(quantia: number): void {
        const idTransacao = 'PX789'
        console.log(`Processando pgto via pix no valor de ${quantia}`)
        this.registrarTransacao(idTransacao)

    }

}


class Reembolso extends FormaDePagamentoClass {

    processaPagamento(quantia: number): void {
        const idTransacao = 'RE101'
        console.log(`Processando pgto de reembolso no valor de ${quantia}`)
        this.reembolsoPagamento(idTransacao)
    }

} 

// 4. Usando o Polimorfismo para Processar Pagamentos
// Agora, podemos criar uma função que aceita qualquer método de pagamento e processa o pagamento sem se preocupar com a implementação específica:

export const processaMetodoPagamento = (metodoPg: MetodoPagamento, quantia: number): void => {
    metodoPg.processaPagamento(quantia)
}

const cartao = new CartaoDeCredito()
const payPal = new PayPal()
const pix = new Pix()
const reembolso = new Reembolso()

console.log('=============================');

processaMetodoPagamento(pix, 100)

console.log('=============================');

