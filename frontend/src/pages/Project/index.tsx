import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../contexts/Auth';
import TodoItem from '../../components/TodoItem';

import { Container, ListContainer, MainContainer, InputContainer } from './styles';
import { useParams } from 'react-router-dom';

const Project: React.FC = () => {
    const [todos, setTodos] = useState<Array<any>>([]);
    const [completed, setCompleted] = useState<Array<any>>([]);
    const [project, setProject] = useState({name:'', project_id:null});
    const [newTodo, setNewTodo] = useState('');
    const { id } = useParams();
    const authContext = useAuth();
    useEffect(() => {
        async function getAllTodos() {
            const response = await api.get('/tasks', {headers: {authorization: authContext?.token, project_id: id}});
            const responseProject = await api.get(`/projects/show/${id}`);
            const completed = response.data.filter((todo: any) => todo.completed === 1);
            const notCompleted = response.data.filter((todo: any) => todo.completed !== 1);
            responseProject.data.name && setProject({name: responseProject.data.name, project_id: responseProject.data.id});
            setTodos(notCompleted);
            setCompleted(completed);
        }
        getAllTodos();
    }, [authContext, id]);

    const onAddTodo = async () => {
        try {
            const response = await api.post('/tasks', {name: newTodo, project_id: project.project_id});
            
            setTodos([...todos, {name: newTodo, id: response.data.task[0], completed: false}]);
            setNewTodo('');
        } catch (error) {
            alert("Não foi possível realizar a operação");
            return;
        }
        
    }

    const onImportant = async (todo: any) => {
        try {
            await api.post(`/tasks/importants/${todo.id}`, {is_important: !todo.is_important});
           
            todo.is_important = !todo.is_important;
            if(todo.completed){
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
            alert("Não foi possível realizar a operação");
          return;
        }
    }

    const onCompleteTodo = async(todo: any) => {
      try {
          await api.post(`/tasks/completed/${todo.id}`, {completed: !todo.completed});
         
          todo.completed = !todo.completed;
          if(todo.completed === true || todo.completed === 1){
            setCompleted([...completed, todo]);
          setTodos(todos.filter(savedTodo => savedTodo.id !== todo.id));
          }else{
            setTodos([...todos, todo]);
            setCompleted(completed.filter(savedTodo => savedTodo.id !== todo.id));
          }
          
      } catch (error) {
        alert("Não foi possível realizar a operação");
        return;
      }
    }
    const onDeleteTodo = async(todo: any) => {
        try {
            await api.delete(`/tasks/${todo.id}/delete`);

            todo.completed = !todo.completed;
            if(todo.completed === true || todo.completed === 1){
              setCompleted(completed.filter(savedTodo => savedTodo.id !== todo.id));
            }else{
                setTodos(todos.filter(savedTodo => savedTodo.id !== todo.id));
            }
            
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
                {todos.map((todo: any) =>( 
                  <TodoItem 
                    todo={todo}
                    onDeleteTodo={onDeleteTodo}
                    onCompleteTodo={onCompleteTodo}
                    onImportant={onImportant}
                    onEditTodo={onEditTodo}
                  />
                ))}
            </ListContainer>
            <ListContainer>
            <p>Concluído</p>
                {completed.map((todo:any) => <li onClick={() => onCompleteTodo(todo)} style={{cursor: "pointer"}} key={todo?.id}><p >{todo?.name}</p></li>)}
            </ListContainer>
        </MainContainer>
    </Container>
  );
}

export default Project;