import { useState } from "react";
import {
  InputContainer,
  ListaContainer,
  ListaTarefasContainer,
  Tarefa,
  TaskInput,
  AddTaskButton,
  RemoveButton,
} from "./styled";
import bin from "../../assets/bin.png";


export function ListaTarefas() {

  const [novaTarefa, setNovaTarefa] = useState("");
  const [lista, setLista] = useState([])


  const onChangeTarefa = (event) => {
    setNovaTarefa(event.target.value);
  };

  const adicionaTarefa = () => {
    //lista.push(novaTarefa)
    setLista([...lista, novaTarefa])
    setNovaTarefa('')
  };

  const removeTarefa = (item) => {
    const listaFiltrada = lista.filter((cadaTarefa)=> cadaTarefa !== item)

    setLista(listaFiltrada)
  };

  return (
    <ListaTarefasContainer>

      <InputContainer>
        <TaskInput
          placeholder="Digite aqui uma tarefa"
          value={novaTarefa}
          onChange={onChangeTarefa}
        />
        <AddTaskButton onClick={adicionaTarefa}>Adicionar</AddTaskButton>

      </InputContainer>

      <ListaContainer>
        <ul>
          {lista.map((item, indice) => {
            return <Tarefa>
              <p>{item.toUpperCase()}</p>
              <RemoveButton onClick={()=>removeTarefa(item)}>
                <img src={bin} alt="" width="16px" />
              </RemoveButton>
            </Tarefa>
          })}

        </ul>
      </ListaContainer>

    </ListaTarefasContainer>
  );
}
