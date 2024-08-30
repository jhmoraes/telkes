import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses } from './database'
import { log } from 'console'
import { TCourse } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003');
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// Requisição get que retorna todos os cursos
app.get('/courses', (req: Request, res: Response) => {
    res.status(200).send(courses)
})

// Requisição pesquisando pelo nome do curso
app.get('/courses/search', (req: Request, res: Response) => {

    //const { q } = req.query
    const q = req.query.q as string

    console.log(q);

    const result = courses.filter((course)=>{
        return course.name.toLowerCase().includes(q.toLowerCase())
        //return course.name.toLowerCase() === q.toLowerCase()
    })    

    res.status(200).send(result)
})

app.post('/courses', (req: Request, res: Response)=>{

    const {id, name, lessons, stack } = req.body

    const newCourse: TCourse = {
        id,
        name,
        lessons,
        stack
    }

    courses.push(newCourse)

    res.status(201).send('Curso cadastrado com sucesso!')
})