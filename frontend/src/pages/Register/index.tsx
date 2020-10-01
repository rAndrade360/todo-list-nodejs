import React, {useRef} from 'react';
import api from '../../services/api';
import { useHistory, Link } from 'react-router-dom';
import { Container, FormContainer, Form, InputBlock } from './styles';
import Input from '../../components/Input';
import { FormHandles, SubmitHandler } from '@unform/core';

interface FormData {
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const history = useHistory();
    const formRef = useRef<FormHandles>(null);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            await api.post('/users', data);
            alert('Cadastrado com sucesso!');
            history.push('/login');
        } catch (error) {
            alert('Não foi possivel cadastrar, tente novamente!');
        }
    }
  return (
    <Container>
        <FormContainer>
            <h1>Faça seu cadastro!</h1>
            <Form ref={formRef} onSubmit={onSubmit}>
                <InputBlock>
                    <Input name="name" label="name" />
                </InputBlock>
                <InputBlock>
                  <Input name="email" label="email" type="email" />
                </InputBlock>
                <InputBlock>
                  <Input name="password" label="senha" type="password" />
                </InputBlock>                
                <button>Cadastrar</button>
            </Form>
           <p> Já é cadastrado? <Link to="/login"> Faça login.</Link></p>
        </FormContainer>
    </Container>
  );
}

export default Register;
