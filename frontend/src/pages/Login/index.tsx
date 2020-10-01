import React, {useRef} from 'react';
import { Container, FormContainer, Form, InputBlock } from './styles';
import {useAuth} from '../../contexts/Auth';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import { FormHandles, SubmitHandler } from '@unform/core';

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const auth = useAuth();
    const formRef = useRef<FormHandles>(null);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
          await auth?.signIn(data);
          alert('Logado com sucesso!');
        } catch (error) {
          alert("Não foi possível fazer login");
        }
    }
  return (
    <Container>
        <FormContainer>
            <h1>Faça seu login!</h1>
            <Form ref={formRef} onSubmit={onSubmit}>
                <InputBlock>
                    <Input name="email" label="email" />
                </InputBlock>
                <InputBlock>
                    <Input name="password" type="password" label="senha" />
                </InputBlock>
                
                <button>Entrar</button>
            </Form>
           <p> Não é cadastrado? <Link to="/register"> Cadastre-se.</Link></p>            
        </FormContainer>
    </Container>
  );
}

export default Login;
