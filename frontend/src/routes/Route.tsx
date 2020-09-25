import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';
import AuthLayout from '../pages/_layouts/authLayout';
import DefaultLayout from '../pages/_layouts/defaultLayout';

export default function RouteWrapper({component: Component, isPrivate, ...rest}: any) {
  const authContext = useAuth();
  

  if (!authContext?.signed && isPrivate) {
    return <Redirect to="/login" />;
  }
  
  if (authContext?.signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }
  const Layout = authContext?.signed ? AuthLayout : DefaultLayout ;

  return (
    <Route {...rest} render={(props) => (
      <Layout>
         {React.createElement(Component, props)}
      </Layout> 
      )} />
  );
}