
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password)
VALUES
("U001", "Fulano", "fulano@gmail.com", "123"),
("U002", "Ciclano", "ciclano@gmail.com", "456"),
("U003", "Beltrano", "beltrano@gmail.com", "789");

SELECT * FROM users;

CREATE TABLE follows (
    follower_id TEXT NOT NULL, --SEGUIDOR 
    followed_id TEXT NOT NULL, --SEGUIDO
    FOREIGN KEY (follower_id) REFERENCES users(id),
    FOREIGN KEY (followed_id) REFERENCES users(id)
);

-- pessoa A segue B C
-- pessoa B segue A
-- pessoa C não segue ninguem

INSERT INTO follows VALUES
("U001", "U002"), -- A -> B
("U001", "U003"), -- A -> C
("U002", "U001"); -- B -> A

SELECT * FROM follows;
SELECT * FROM users;

SELECT * FROM follows
INNER JOIN users
ON follows.follower_id = users.id;

SELECT * FROM follows
RIGHT JOIN users
ON follows.follower_id = users.id;

SELECT * FROM users
LEFT JOIN follows
ON users.id = follows.follower_id;

-- junção com o nome da pessoa seguida

SELECT * FROM follows
RIGHT JOIN users ON follows.follower_id = users.id
RIGHT JOIN follows AS follows2 ON users.id = follows2.followed_id;


SELECT users.id, users.name, follows.followed_id, users2.name FROM users
LEFT JOIN follows ON users.id = follows.follower_id
LEFT JOIN users AS users2 ON follows.followed_id = users2.id