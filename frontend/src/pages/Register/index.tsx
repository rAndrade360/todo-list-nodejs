import React, {useRef} from 'react';
import api from '../../services/api';
import { useHistory, Link } from 'react-router-dom';
import { Container, FormContainer, Form, InputBlock } from './styles';
import Input from '../../components/Input';
import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';

interface FormData {
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const history = useHistory();
    const formRef = useRef<FormHandles>(null);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {

            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().min(6).required(),
            });

            await schema.validate(data, {abortEarly: false});

            await api.post('/users', data);
            alert('Cadastrado com sucesso!');
            history.push('/login');
        } catch (error) {
            const validationErrors: {[key: string]: string} = {};

            if(error instanceof Yup.ValidationError) {
                error.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                })
            }
            formRef.current?.setErrors(validationErrors);
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
