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

// busca todas as contas
app.get("/accounts", (req: Request, res: Response) => {
    res.status(200).send(accounts)
})

//busca conta por id
app.get("/accounts/:id", (req: Request, res: Response) => {

    const { id } = req.params

    const result = accounts.filter((account) => {
        return account.id === id
    })

    res.status(200).send(result)
})

// Deletar conta
app.delete("/accounts/:id", (req: Request, res: Response) => {

    const { id } = req.params

    const accountResult = accounts.findIndex((account) => {
        return account.id === id
    })

    accountResult < 0 ? res.status(404).send("Item não encontrado")
        : accounts.splice(accountResult, 1)


    res.status(200).send('Conta deletada com sucesso')

})

// Atualizar conta
app.put("/accounts/:id", (req: Request, res: Response) => {

    const { id } = req.params
    console.log('id', id);
    
    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.ownerName as string | undefined
    const newBalance = req.body.balance as number | undefined
    const  newType = req.body.type as ACCOUNT_TYPE | undefined

    if(!id || id === ':id'){
        res.status(400).send('É necessário um id válido')
    }

    const accountFind = accounts.find((account)=>{
        return account.id === id
    })

    if(accountFind === undefined) res.status(400).send("Id não encontrado")

    accountFind.id = newId || accountFind.id
    accountFind.ownerName = newOwnerName || accountFind.ownerName
    accountFind.balance = newBalance || accountFind.balance
    accountFind.type = newType || accountFind.type

    res.status(200).send('Conta atualizada com sucesso!')
})
