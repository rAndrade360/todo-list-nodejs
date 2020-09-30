import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../contexts/Auth';
import TodoItem from '../../components/TodoItem';

import { Container, ListContainer, MainContainer, InputContainer } from './styles';
import { useParams } from 'react-router-dom';
import TodoInterface from '../../interfaces/TodoInterface';

const Project: React.FC = () => {
    const [todos, setTodos] = useState<Array<TodoInterface>>([]);
    const [project, setProject] = useState({name:'', project_id:null});
    const [newTodo, setNewTodo] = useState('');
    const { id } = useParams();
    const authContext = useAuth();
    useEffect(() => {
        async function getAllTodos() {
            const response = await api.get('/tasks', {headers: {authorization: authContext?.token, project_id: id}});
            const responseProject = await api.get(`/projects/show/${id}`);
            responseProject.data.name && setProject({name: responseProject.data.name, project_id: responseProject.data.id});
            setTodos(response.data);
        }
        getAllTodos();
    }, [authContext, id]);

    const onAddTodo = async () => {
        try {
            const response = await api.post('/tasks', {name: newTodo, project_id: project.project_id});

            const todoToAdd: TodoInterface = {
              name: newTodo, 
              id: response.data.task[0], 
              completed: false, 
              is_important: false,
              project_id: project.project_id
            };
            
            setTodos([...todos, todoToAdd]);
            setNewTodo('');
        } catch (error) {
            alert("Não foi possível realizar a operação");
            return;
        }
        
    }

    const onImportant = async (todo: TodoInterface) => {
        try {
          await api.post(`/tasks/importants/${todo.id}`, {is_important: !todo.is_important});
           
          todo.is_important = !todo.is_important;

          const todoState = todos;
          todoState.find(todoImportant => todoImportant.id === todo.id)!.is_important = todo.is_important;

          setTodos(todoState);
            
        } catch (error) {
            alert("Não foi possível realizar a operação");
          return;
        }
    }

    const onCompleteTodo = async(todo: TodoInterface) => {
      try {
          await api.post(`/tasks/completed/${todo.id}`, {completed: !todo.completed});
         
          todo.completed = !todo.completed;

          const todoState = todos;
          todoState.find(todoComplete => todoComplete.id === todo.id)!.completed = todo.completed;

          setTodos(todoState);
          
      } catch (error) {
        alert("Não foi possível realizar a operação");
        return;
      }
    }
    const onDeleteTodo = async(todo: any) => {
        try {
            await api.delete(`/tasks/${todo.id}/delete`);
            
            setTodos(todos.filter(savedTodo => savedTodo.id !== todo.id));
            
        } catch (error) {
            alert("Não foi possível realizar a operação");
          return;
        }
      }

      const onEditTodo = async(name: string, todo: any) => {
        try {
            await api.put(`/tasks/${todo.id}/update`, {name});

            setTodos(todos.map(savedTodo => {
                if(savedTodo === todo.id) {
                    savedTodo.name = name;
                }
                return savedTodo;
            }));
            
            
        } catch (error) {
            alert("Não foi possível realizar a operação");
          return;
        }
      }

  return (
    <Container>
        <MainContainer>

            <h1>{project.name}</h1>
            <InputContainer>
                <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} type="text"/>
                <button onClick={() => onAddTodo()}>Adicionar</button>
            </InputContainer>

            <ListContainer>
                {todos.map((todo: TodoInterface) =>(
                  todo.completed ? null : (
                  <TodoItem 
                    todo={todo}
                    onDeleteTodo={onDeleteTodo}
                    onCompleteTodo={onCompleteTodo}
                    onImportant={onImportant}
                    onEditTodo={onEditTodo}
                  />
                  )
                ))}
            </ListContainer>
            <ListContainer>
            <p>Concluído</p>
                {todos.map((todo:TodoInterface) => (todo.completed ? (
                <li onClick={() => onCompleteTodo(todo)} style={{cursor: "pointer"}} key={todo?.id}><p >{todo?.name}</p></li>
                ):null))}
            </ListContainer>
        </MainContainer>
    </Container>
  );
}

export default Project;