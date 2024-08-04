import { useState, useEffect, useRef } from 'react';
import './TodoList.css';
import Icon from './assets/icon.png';

function TodoList() {
    // Recupera a lista de tarefas do localStorage, se existir; caso contrário, inicializa como uma lista vazia
    const listaStorage = localStorage.getItem('Lista');
    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState('');
    const inputRef = useRef(null);  // Referência ao input para manipular o foco

    // Efeito colateral que sincroniza a lista com o localStorage sempre que a lista é atualizada
    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista));
    }, [lista]);

    // Função para adicionar um novo item à lista
    function addItem(form) {
        form.preventDefault();  // Previne o comportamento padrão do formulário
        if (!novoItem) {
            return;  // Não adiciona se o campo de entrada estiver vazio
        }
        setLista([...lista, { text: novoItem, isCompleted: false }]);  // Adiciona o novo item à lista
        setNovoItem('');  // Limpa o campo de entrada
        inputRef.current.focus();  // Foca no campo de entrada para facilitar a adição de mais itens
    }

    // Função para alternar o status de conclusão de um item
    function handleClick(index) {
        const listAux = [...lista];
        listAux[index].isCompleted = !listAux[index].isCompleted;  // Alterna o estado de conclusão
        setLista(listAux);  // Atualiza a lista com o novo estado
    }

    // Função para deletar um item da lista
    function deleteItem(index) {
        const listAux = [...lista];
        listAux.splice(index, 1);  // Remove o item do array
        setLista(listAux);  // Atualiza a lista
    }

    // Função para deletar todos os itens da lista
    function deleteAll() {
        setLista([]);  // Define a lista como vazia
    }

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={addItem}>
                <input
                    ref={inputRef}  // Referência ao input para foco
                    type='text'
                    value={novoItem}
                    onChange={(e) => setNovoItem(e.target.value)}
                    placeholder='Adicione tarefas' />
                <button className='add' type='submit'>Add</button>
            </form>
            <div className='taskList'>
                <div style={{ textAlign: 'center' }}>
                    {lista.length < 1 ? (
                        <img className='icon-central' src={Icon} />  // Exibe o ícone se não houver tarefas
                    ) : (
                        // Se a lista contiver itens, renderiza cada item
                        lista.map((item, index) => (
                            <div
                                key={index} // Chave única para cada item
                                className={item.isCompleted ? 'item completed' : 'item'}
                            >
                                <span onClick={() => handleClick(index)}>{item.text}</span>
                                <button onClick={() => deleteItem(index)} className='del'>Delete</button>
                            </div>
                        ))
                    )}
                    {lista.length > 0 && (
                        // Exibe o botão "Delete All" se houver itens
                        <button onClick={deleteAll} className='deleteAll'>Delete All</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TodoList;
