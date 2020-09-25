import React from 'react';

import { Container } from './styles';
import { useAuth } from '../../contexts/Auth';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const authContext = useAuth();

  return (
    <Container>
        <div> <Link to="/dashboard"> Dashboard</Link></div>
        <div><button onClick={() => authContext?.signOut()}>Sair</button></div>
    </Container>
    );
}

export default Header;