import React, {useEffect, useState} from 'react';
import { Container, MainContainer, InputContainer, ListContainer } from './styles';
import api from '../../services/api';
import ProjectItem from '../../components/ProjectItem';
import ProjectInterface from '../../interfaces/ProjectInterface';

const Dashboard: React.FC = () => {
    const [projects, setProjects] = useState<Array<ProjectInterface>>([]);
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

            const toAddProject: ProjectInterface = {
                name: newProject, 
                id: response.data.project[0]
            };

            setProjects([...projects, toAddProject]);
            setNewProject('');
        } catch (error) {
            alert("Não foi possível realizar a operação");
            return;
        }
    }

    const deleteProject = async (project: ProjectInterface) => {
        try {
            await api.delete(`/projects/${project.id}/delete`);
            setProjects(projects.filter(savedProject => savedProject.id !== project.id));
        } catch (error) {
            alert("Não foi possível realizar a operação");
            return;
        }
    }

    const onEditProject = async(name: string, project: ProjectInterface) => {
        try {
            await api.put(`/projects/${project.id}/update`, {name});

            const projectsState = projects;
            projectsState.find((savedProject: ProjectInterface) => savedProject.id === project.id )!.name = name;

            setProjects(projectsState);
                     
        } catch (error) {
          alert("Não foi possível realizar a operação");
          return;
        }
      }

  return (
    <Container>
        <MainContainer>
        <h1>Escolha um projeto!</h1>
            <InputContainer>
                <input type="text" value={newProject} onChange={(e) =>setNewProject(e.target.value)} />
                <button onClick={() => addProject()} >Adicionar</button>
            </InputContainer>
            <ListContainer>
                {projects.map((project: ProjectInterface) => (
                  <ProjectItem
                    project={project}
                    onDeleteProject={deleteProject}
                    onEditProject={onEditProject} 
                />
            ))}                  
            </ListContainer>            
        </MainContainer>
    </Container>
  );
}

export default Dashboard;