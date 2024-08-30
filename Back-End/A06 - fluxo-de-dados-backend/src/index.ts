import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'
import { ACCOUNT_TYPE } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})

app.get("/accounts/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = accounts.find((account) => account.id === id)

        if (!result) {
            throw new Error('Conta não encontrada! Verifique o id!')
        }


        res.status(200).send(result)

    } catch (error: any) {

        res.status(404).send(error.message)

    }

})

app.delete("/accounts/:id", (req: Request, res: Response) => {
    try {

        const id = req.params.id

        if (id[0] !== 'a' || id[1] !== '0') {
            res.status(400)
            throw new Error('O id é Inválido. Deve iniciar com a letra "a"')
        }

        const accountIndex = accounts.findIndex((account) => account.id === id)

        console.log(Boolean(accountIndex));

        if (accountIndex === undefined || accountIndex < 0) {
            res.status(404)
            throw new Error("Conta não encontrada! Informe um id válido!")
        } else {
            accounts.splice(accountIndex, 1)
            res.status(200).send("Item deletado com sucesso")
        }

    } catch (error: any) {

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }



})

app.put("/accounts/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id as string | undefined
        const newOwnerName = req.body.ownerName as string | undefined
        const newBalance = req.body.balance as number | undefined
        const newType = req.body.type as ACCOUNT_TYPE | undefined

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("O id deve ser uma string")
            }

            if (newId[0] !== 'a') {
                res.status(400)
                throw new Error("O id deve iniciar com a letra 'a'")
            }
        }

        if (newOwnerName !== undefined) {

            if (newOwnerName.length < 2) {
                res.status(400)
                throw new Error("O nome deve ter no mínimo dois caracteres")
            }
        }

        if (newBalance !== undefined) {
            if (typeof newBalance !== "number") {
                throw new Error('Balance precisa ser um number')
            }

            if (newBalance < 0) {
                throw new Error('O balance deve ser maior ou igual a zero!')
            }
        }

        if (newType !== undefined) {
            if (newType !== ACCOUNT_TYPE.GOLD
                &&
                newType !== ACCOUNT_TYPE.PLATINUM
                &&
                newType !== ACCOUNT_TYPE.BLACK) {
                throw new Error("Informe uma categoria de Type válida!")
            }
        }


        const account = accounts.find((account) => account.id === id)

        if (account) {
            account.id = newId || account.id
            account.ownerName = newOwnerName || account.ownerName
            account.type = newType || account.type
            account.balance = newBalance || account.balance
        }

        res.status(200).send("Atualização realizada com sucesso")
    } catch (error: any) {

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})