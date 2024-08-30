import { log } from "console"


/* export class User {
    //ATRIBUTOS
    
    private id: string
    private name: string
    private email: string
    private password: string

    //METODOS
    constructor(id: string, name: string, email: string, password:string){
        this.id = id,
        this.name = name,
        this.email = email,
        this.password = password
    }
    
    //função1
    //função2
} */


export class User {

    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        //private created_at: string
    ) { }

    //pegar info do user private
    public getId(): string {
        return this.id
    }

    //alterar info
    public setId(newId: string): void {
        this.id = newId
    }

    public getName(): string {
        return this.name
    }

    public setName(newName: string): void {
        this.name = newName
    }
    public getEmail(): string {
        return this.email
    }

    public setEmail(newEmail: string): void {
        this.email = newEmail
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(newPassword: string): void {
        this.password = newPassword
    }

    /* public getCreated_at(): string {
        return this.created_at
    }

    public setCreated_at(newCreated_at: string): void {
        this.created_at = newCreated_at
    } */
}

//INSTACIAMENTO



