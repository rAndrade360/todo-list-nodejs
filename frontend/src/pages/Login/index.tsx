import React, {useState, SyntheticEvent, FormEvent} from 'react';
import { Container, FormContainer, Form, InputBlock } from './styles';
import {useAuth} from '../../contexts/Auth';
import { Link } from 'react-router-dom';


const Login: React.FC = () => {
    const [form, setForm] = useState({ email: '', password: ''});
    const auth = useAuth();

    const onChangeForm = (event: SyntheticEvent<EventTarget>) => {
        let eventTarget = event.target as HTMLInputElement;
        setForm({...form, [eventTarget.name]: eventTarget.value});
    }

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await auth?.signIn(form);
            alert('Logado com sucesso!');
        } catch (error) {
            alert(error);
        }
    }
  return (
    <Container>
        <FormContainer>
            <h1>Faça seu login!</h1>
            <Form onSubmit={onSubmit}>
                <InputBlock>
                    <label>email</label>
                    <input value={form.email} name="email" onChange={onChangeForm} />
                </InputBlock>
                <InputBlock>
                    <label>senha</label>
                    <input value={form.password} type="password" name="password" onChange={onChangeForm} />
                </InputBlock>
                
                <button>Entrar</button>
            </Form>
           <p> Não é cadastrado? <Link to="/register"> Cadastre-se.</Link></p>
            
        </FormContainer>
    </Container>
  );
}

export default Login;
