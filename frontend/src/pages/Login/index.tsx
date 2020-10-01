import React, {useRef} from 'react';
import { Container, FormContainer, Form, InputBlock } from './styles';
import {useAuth} from '../../contexts/Auth';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const auth = useAuth();
    const formRef = useRef<FormHandles>(null);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
          formRef.current?.setErrors({});
            
          const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
          });

          await schema.validate(data, {abortEarly: false});

          await auth?.signIn(data);
          alert('Logado com sucesso!');
        } catch (error) {
          const validationErrors: {[key: string]: string} = {};

            if(error instanceof Yup.ValidationError) {
                error.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                })
            }else {
                alert("Ocorreu um erro ao fazer login. Tente novamente mais tarde.");
            }
            formRef.current?.setErrors(validationErrors);
        }
    }
  return (
    <Container>
        <FormContainer>
            <h1>Faça seu login!</h1>
            <Form ref={formRef} onSubmit={onSubmit}>
                <InputBlock>
                    <Input name="email" label="email" type="email" />
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
