import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../contexts/Auth';

import { Container, TopContainer, MainContainer } from './styles';

const General: React.FC = () => {
    const [todos, setTodos] = useState<Array<any>>([]);
    const [completed, setCompleted] = useState<Array<any>>([]);
    const [newTodo, setNewTodo] = useState('');
    const authContext = useAuth();
    useEffect(() => {
        async function getAllTodos() {
            const response = await api.get('/tasks', {headers: {authorization: authContext?.token}});
            const completed = response.data.filter((todo: any) => todo.completed === 1);
            const notCompleted = response.data.filter((todo: any) => todo.completed !== 1);
            setTodos(notCompleted);
            setCompleted(completed);
        }
        getAllTodos();
    }, [authContext]);

    const onAddTodo = async () => {
        try {
            const response = await api.post('/tasks', {name: newTodo});
            
            setTodos([...todos, {name: newTodo, id: response.data.task[0], completed: false}]);
            setNewTodo('');
        } catch (error) {
            alert(error);
            return;
        }
        
    }

    const onImportant = async (todo: any) => {
        try {
            await api.post(`/tasks/importants/${todo.id}`, {is_important: !todo.is_important});
          console.log(todo);
           
            todo.is_important = !todo.is_important;
            if(todo.completed === true || todo.completed === 1){
              setCompleted(completed.map((savedTodo: any) => {
                  if(todo.id === savedTodo.id){
                      savedTodo.is_important = todo.is_important;
                  }
                  return savedTodo;
              }))
            }else{
                setTodos(todos.map((savedTodo: any) => {
                    if(todo.id === savedTodo.id){
                        savedTodo.is_important = todo.is_important;
                    }
                    return savedTodo;
                }))
            }
            
        } catch (error) {
          alert(error);
          return;
        }
    }

    const onCompleteTodo = async(todo: any) => {
      try {
          await api.post(`/tasks/completed/${todo.id}`, {completed: !todo.completed});
        console.log(todo);
         
          todo.completed = !todo.completed;
          if(todo.completed === true || todo.completed === 1){
            setCompleted([...completed, todo]);
          setTodos(todos.filter(savedTodo => savedTodo.id !== todo.id));
          }else{
            setTodos([...todos, todo]);
            setCompleted(completed.filter(savedTodo => savedTodo.id !== todo.id));
          }
          
      } catch (error) {
        alert(error);
        return;
      }
    }

  return (
    <Container>
        <TopContainer>
            <h1>Gerais</h1>
            <div>
                <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} type="text"/>
                <button onClick={() => onAddTodo()}>Add todo</button>
            </div>
        </TopContainer>
        <MainContainer>
            <ul>
  {todos.map((todo:any) => <li key={todo?.id}><button onClick={() => onCompleteTodo(todo)}>{todo?.name}</button> <button onClick={() => onImportant(todo)}>{todo.is_important? 'remove From Important': 'save as Important'}</button></li>)}
            </ul>
            <p>Completed</p>
            <ul>
                {completed.map((todo:any) => <li key={todo?.id}><button onClick={() => onCompleteTodo(todo)}>{todo?.name}</button></li>)}
            </ul>
        </MainContainer>
    </Container>
  );
}

export default General;