import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectInterface from '../../interfaces/ProjectInterface';
import { Container } from './styles';

interface IProjectItem {
    project: ProjectInterface;
    onDeleteProject: (project: any) => Promise<void>;
    onEditProject: (name:string, project: any) => Promise<void>;
}

const ProjectItem: React.FC<IProjectItem> = ({project, onDeleteProject, onEditProject}) => {
    const [editing, setEditing] = useState(false);
    const [newValue, setNewValue] = useState(project.name);
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.keyCode === 13 ) {
            setEditing(false);
            onEditProject(newValue, project);
        }
    }
  return (

    <Container key={project?.id} onDoubleClick={()=>{setEditing(true)}}>
         {editing ? (
            <input
               type="text"
               value={newValue}
               onChange={(e) => {
                   setNewValue(e.target.value)
                }}
                onKeyDown={handleKeyDown}
            />
         ) : (
            <>           
              <p> <Link to={`/dashboard/project/${project.id}`}>{newValue}</Link> </p>
              <button onClick={()=>onDeleteProject(project)}>Deletar</button>
            </>
         )}
         </Container>
    
     
    );
}

export default ProjectItem;
