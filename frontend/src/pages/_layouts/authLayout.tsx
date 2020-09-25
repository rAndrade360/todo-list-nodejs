import React from 'react';
import Header from '../../components/Header';

// import { Container } from './styles';

const authLayout: React.FC = ({children}) => {
  return (
  <div>
      <Header />
      {children}
  </div>
  );
}

export default authLayout;