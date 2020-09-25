import React, {useEffect, useState} from 'react';

import { Container, TopContainer, MainContainer } from './styles';
import api from '../../services/api';

const Dashboard: React.FC = () => {
    const [projects, setProjects] = useState<Array<any>>([]);
    const [newProject, setNewProject] = useState('');
    useEffect(() => {
        async function getAllProjects() {
            const response = await api.get('/projects');
            setProjects(response.data);
        }
        getAllProjects();
    }, []);
    const addProject = async () => {
        try {
            const response = await api.post('/projects', {name: newProject});
            setProjects([...projects, {name: newProject, id: response.data.project[0]}]);
            setNewProject('');
        } catch (error) {
            alert(error);
            return;
        }
    }
  return (
    <Container>
        <h1>Escolha um projeto!</h1>
        <TopContainer>
            <ul>
                <li>
                    <p>Gerais</p>
                </li>
                <li>
                    <p>Importantes</p>
                </li>
            </ul>
        </TopContainer>
        <MainContainer>
            <h2>Projetos</h2>
            <ul>
                {projects.map(project => <li><p>{project.name}</p></li>)}
            </ul>
            <div>
                <input type="text" value={newProject} onChange={(e) =>setNewProject(e.target.value)} />
                <button onClick={() => addProject()} >Adicionar</button>
            </div>
        </MainContainer>
    </Container>
  );
}

export default Dashboard;