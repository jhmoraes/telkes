export const createDogObjectFromUrl = (url) => {
  const breedWithDash = url.split("/")[4]
  const breedNormalized = breedWithDash.replace("-", " ")

  return {
    id: url,
    breed: breedNormalized,
    url: url
  }
}

/*
 Exemplo de url que a API retorna
 "https://images.dog.ceo/breeds/pinscher-miniature/n02107312_2478.jpg"

 toda resposta da API devolve uma url nessa estrutura,
 então essa lógica abaixo sempre funcionará

PASSO 1
url.split("/") quebra a url em um array:

PASSO 2
[
  "https:",
  "",
  "images.dog.ceo",
  "breeds",
  "pinscher-miniature",
  "n02107312_2478.jpg"
]

PASSO 3
url.split("/")[4] pega o índice 4 do array
"pinscher-miniature"

PASSO 4
breedWithDash.replace("-", " ") normaliza a string removendo os tracinhos "-"
"pinscher miniature"

PASSO 5
e retornamos um objeto estruturado com id, breed e url
{
  id: "https://images.dog.ceo/breeds/pinscher-miniature/n02107312_2478.jpg",
  breed: "pinscher miniature",
  url: "https://images.dog.ceo/breeds/pinscher-miniature/n02107312_2478.jpg"
)

a id só está se repetindo no objeto com o valor de url,
  porque toda url de cada dog é única
    e não existe outro valor nessa API que funciona como id
*/