import React, {useState, SyntheticEvent, FormEvent} from 'react';
import api from '../../services/api';
import { Container, FormContainer, Form, InputBlock } from './styles';


const Register: React.FC = () => {
    const [form, setForm] = useState({name: '', email: '', password: ''});

    const onChangeForm = (event: SyntheticEvent<EventTarget>) => {
        let eventTarget = event.target as HTMLInputElement;
        setForm({...form, [eventTarget.name]: eventTarget.value});
    }

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await api.post('/users', form);
            alert('Cadastrado com sucesso!');
        } catch (error) {
            alert('Não foi possivel cadastrar, tente novamente!');
        }
    }
  return (
    <Container>
        <FormContainer>
            <h1>Faça seu cadastro!</h1>
            <Form onSubmit={onSubmit}>
                <InputBlock>
                    <label>nome</label>
                    <input value={form.name} name="name" onChange={onChangeForm} />
                </InputBlock>
                <InputBlock>
                    <label>email</label>
                    <input value={form.email} name="email" onChange={onChangeForm} />
                </InputBlock>
                <InputBlock>
                    <label>senha</label>
                    <input value={form.password} type="password" name="password" onChange={onChangeForm} />
                </InputBlock>
                
                <button>Cadastrar</button>
            </Form>
        </FormContainer>
    </Container>
  );
}

export default Register;