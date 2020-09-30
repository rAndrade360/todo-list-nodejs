import React, { useState } from 'react';
import TodoInterface from '../../interfaces/TodoInterface';
import { Container, DeleteButton } from './styles';

interface ITodoItem {
    todo: TodoInterface;
    onDeleteTodo: (todo: any) => Promise<void>;
    onCompleteTodo: (todo: any) => Promise<void>;
    onImportant: (todo: any) => Promise<void>;
    onEditTodo: (name:string, todo: any) => Promise<void>;
}

const TodoItem: React.FC<ITodoItem> = ({todo, onCompleteTodo, onImportant, onDeleteTodo, onEditTodo}) => {
    const [editing, setEditing] = useState(false);
    const [newValue, setNewValue] = useState(todo.name);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.keyCode === 13 ) {
            setEditing(false);
            onEditTodo(newValue, todo);
        }
    }

  return (
    <Container key={todo?.id} onDoubleClick={()=>{setEditing(true)}}>
         {editing ? (
             <input type="text" value={newValue} onChange={(e) => {setNewValue(e.target.value)}} onKeyDown={handleKeyDown} />
         ) : (
             <>
            <a>{newValue}</a> 
            <button onClick={() => onImportant(todo)}>{todo.is_important? 'importante': 'não importante'}</button> 
            <button onClick={() => onCompleteTodo(todo)}>Feito!</button> 
            <DeleteButton onClick={() => onDeleteTodo(todo)}>Delete</DeleteButton>
            </>
         )}
         </Container>
    );
}

export default TodoItem;