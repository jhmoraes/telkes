/* PRÁTICA GUIADA - Parte 1
Crie um sistema de cadastro de usuários que contenha:
*/

//1. Type Alias para uma pessoa (Person) com as propriedades id, name, email, password e role;

enum ROLE {
    ADMIN = 'admin',
    NORMAL = 'normal'
}

type TPerson = {
    id: string,
    name: string,
    email: string,
    password: string,
}

// como usar

const userOne: TPerson = {
    id: '010101',
    name: 'Juliana',
    email: 'ju@email.com',
    password: '123456',
}

const userTwo: TPerson = {
    id: '020202',
    name: 'Livia',
    email: 'livia@email.com',
    password: '123456',
    
}

// como garantir que o role será somente admin e normal ? -> //"Admin" | "Normal" | ""

/* enum ROLE {
    ADMIN = 'admin',
    NORMAL = 'normal'
} */

const userThree: TPerson = {
    id: "030303",
    name: "João",
    email: "joão@email.com",
    password: "020405",
}

const userFour: TPerson = {
    id: "040404",
    name: "Joana",
    email: "joana@email.com",
    password: "020405",
}

type AdminAccount = {
    account: ROLE.ADMIN,
    permission: true
}

type NormalAccount = {
    account: ROLE.NORMAL,
    permission: false
}

//2.2 Tipo Intersection unindo

type AdminUser = TPerson & AdminAccount
type NormalUser = TPerson & NormalAccount

const userFive: AdminUser = {
    id: '050505',
    name: 'Roberto',
    email: 'ro@email.com',
    password: '123456',
    account: ROLE.ADMIN,
    permission: true
}

const userSix: NormalUser = {
    id: '060606',
    name: 'Bruno',
    email: 'bru@email.com',
    password: '123456',
    account: ROLE.NORMAL,
    permission: false
}

//3. Um array de usuários que permite guardar apenas usuários do tipo Person + Role;

const arrayAdminUser: AdminUser[] = []
const arrayNormalUser: NormalUser[] = []

//arrayAdminUser.push(userFive)
//arrayNormalUser.push(userSix)
//console.log(arrayNormalUser);

const arrayUser: (AdminUser | NormalUser)[] = []

arrayUser.push(userFive)
arrayUser.push(userSix)

console.log(arrayUser);

