-- Active: 1722555300740@@127.0.0.1@3306
DROP TABLE users;

DROP TABLE phone;

CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

CREATE TABLE
    phone(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        phone_number TEXT NOT NULL UNIQUE,
        user_id TEXT NOT NULL,  -- 1:m pq esse campo não é unique
        FOREIGN KEY(user_id) REFERENCES users(id)
    );

INSERT INTO users
VALUES ( "001","Fulano","fulano@email.com","1234"), ("002","Cicrano","Cicrano@email.com","5678"), ("003","Beltrano","beltrano@email.com","9012");

INSERT INTO phone
VALUES ("p001", "912345678", "002"), ("p002", "900002211", "002"), ("p003", "911110041", "001");

SELECT * FROM users;

SELECT * FROM phone;

SELECT users.name, phone.phone_number FROM users INNER JOIN phone ON phone.user_id = users.id;

SELECT * FROM users INNER JOIN phone ON phone.user_id = users.id;

SELECT * FROM phone INNER JOIN users ON users.id = phone.user_id;

--================================================



CREATE TABLE
    licenses (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        register_number TEXT UNIQUE NOT NULL,
        category TEXT NOT NULL
    );

CREATE TABLE
    drivers (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL, -- FORMA DE GARANTIR QUE NÃO VAI REPETIR A PESSOA - PODERIA SER CPF
        password TEXT NOT NULL,
        license_id TEXT UNIQUE NOT NULL, -- POR ISSO MINHA TABELA É 1:1
        FOREIGN KEY(license_id) REFERENCES licenses(id)
    );

-- Quem será populado primeiro?

INSERT INTO licenses
VALUES ("L001", "11111111", "B"), ("L002", "22222222", "A"), ("L003", "33333333", "AB");

INSERT INTO drivers VALUES
("D001", "Fulano", "fulano@email.com", "1234", "L002"),
("D002", "Cicrano", "cicrano@email.com", "4567", "L001"),
("D003", "Beltrano", "beltrano@email.com", "8975", "L003");

SELECT * FROM licenses;

SELECT * FROM drivers;

--Inner join de drives e license, retornando apenas o nome da pessoa, o numero da cnh e a categoria (nessa ordem)
SELECT drivers.name, licenses.register_number, licenses.category FROM licenses INNER JOIN drivers ON license_id = licenses.id;

-- Faça o mesmo renomeando as colunas 
SELECT drivers.name, licenses.register_number AS cnh, licenses.category FROM licenses INNER JOIN drivers ON license_id = licenses.id;

-- TABELA PHONE

-- Mostrar o nome e o numero de telefone do Cicrano, pesquisando apenas pelo inicio do nome
SELECT
    users.name,
    phone.phone_number
FROM users
    INNER JOIN phone ON phone.user_id = users.id
WHERE users.name LIKE 'Ci%';


SELECT users.name, phone.phone_number FROM phone
INNER JOIN users ON phone.user_id = users.id
GROUP BY users.name
ORDER BY phone.phone_number;