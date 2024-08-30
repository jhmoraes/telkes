import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", (req: Request, res: Response) => {

    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.get("/bands", async (req: Request, res: Response) => {
    try {

        const result = await db.raw(`SELECT * FROM bands`)

        res.status(200).send(result)

    } catch (error: any) {
        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/bands", async (req: Request, res: Response) => {

    try {

        const { id, name } = req.body

        if (!id || !name) {
            res.status(400)
            throw new Error("informar id ou name")
        }

        await db.raw(`
            INSERT INTO bands
            VALUES("${id}", "${name}")
        `)

        res.status(200).send({ message: "Banda Cadastrada" })

    } catch (error: any) {
        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.put("/bands/:id", async (req: Request, res: Response) => {

    try {

        const id = req.params.id

        const newId = req.body.newId
        const newName = req.body.newName

        if (newId !== undefined) {
            if (typeof newId !== "string") {

                res.status(400)
                throw new Error("'id' deve ser string")
            }

            if (newId.length < 2) {
                res.status(400)
                throw new Error("'id' deve possuir no mínimo 2 caractere")
            }

            if (newId[0] !== 'b') {
                res.status(400)
                throw new Error("'id' deve possuir iniciar com a letra b")
            }

        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {

                res.status(400)
                throw new Error("'name' deve ser string")
            }

            if (newName.length < 2) {
                res.status(400)
                throw new Error("'name' deve possuir no mínimo 2 caractere")
            }
        }

        const [band] = await db.raw(`SELECT * FROM bands WHERE id = "${id}"`)

        console.log(band);

        if (band) {
            await db.raw(`
                UPDATE bands
                SET id = "${newId || band.id}", name = "${newName || band.name}"
                WHERE id = "${id}"
            `)
        }else{
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        res.status(200).send("Edição feita com sucesso!")

    } catch (error: any) {
        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})