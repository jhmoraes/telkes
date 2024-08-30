-- Active: 1721174657156@@127.0.0.1@3306

CREATE TABLE 
    books(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        author TEXT NOT NULL,
        page_count INTEGER,
        price REAL NOT NULL
    );

DROP TABLE books;

SELECT * FROM books;

INSERT INTO books (id, name, author, page_count, price)
VALUES("8503012928", "O Quinze", "Rachel de Queiroz", 208, 24.95);

INSERT INTO books (id, name, author, price)
VALUES("8578887239", "Dom Casmurro", "Machado de Assis", 46.77);

INSERT INTO books VALUES("78465354556", "Sitio do picapau", "Monteiro Lobato", 200, 89.99);

--editar um registro
UPDATE books SET page_count=464, author="Ju" WHERE id="8578887239";

--Deletar um registro
DELETE FROM books WHERE id="8503012928";

UPDATE books SET page_count=NULL WHERE id="8578887239";

ALTER TABLE books RENAME COLUMN author TO autor;