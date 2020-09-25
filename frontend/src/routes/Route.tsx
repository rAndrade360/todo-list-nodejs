import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';

export default function RouteWrapper({component: Component, isPrivate, ...rest}: any) {
  const authContext = useAuth();
  

//   const Layout = signed ? DefaultLayout : AuthLayout;
if (!authContext?.signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (authContext?.signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Route render={(props) => (React.createElement(Component, props))} />
  );
}