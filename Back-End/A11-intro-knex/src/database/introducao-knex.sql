
CREATE TABLE bands (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL
)

INSERT INTO bands VALUES ('b001', 'nirvana'), ('b002', 'iron');

SELECT * FROM bands;