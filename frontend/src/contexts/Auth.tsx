import React, { createContext, useState, useContext, useEffect} from 'react';
import api from '../services/api';


interface Login {
    email: string;
    password: string;
}

interface IAppContext {
    signed: boolean;
    token: string;
    user: object|null;
    signIn: ({ email, password }: Login) => Promise<void>;
    signOut: () => any;
    loading: Boolean ;
}

const AuthContext = createContext<IAppContext | null>(null);


export default function AuthProvider(props: React.PropsWithChildren<React.ReactNode>) {
    const [user, setUser] = useState<object|null>(null);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoredData() {
            const storedToken = localStorage.getItem('@AuthToken');
            const storedUser = localStorage.getItem('@AuthUser');
            if(storedToken && storedUser) {
                const loggedUser = JSON.parse(storedUser);
                setUser(loggedUser);
                setToken(storedToken);
                api.defaults.headers.common['authorization'] = storedToken;
                api.interceptors.response.use(
                    (response) => response,
                    (error) => {
                      if (error.response && error.response.status === 401) {
                        alert('Sua sessão expirou, faça login novamente!');
                        return signOut();
                      }
                      return Promise.reject(error);
                    }
                  );
            }
            setLoading(false);
        }
        loadStoredData();
    }, []);

    async function signIn({email, password}: Login) {
        try {
            const response = await api.post('/users/login', {email, password});
            const responseToken = `Bearer ${response.data.token}`;
            localStorage.setItem('@AuthUser', JSON.stringify(response.data.user));
            localStorage.setItem('@AuthToken', responseToken);
            setUser(response.data.user);
            setToken(responseToken);
            api.defaults.headers.common['authorization'] = responseToken;
        } catch (error) {
            alert('Email ou senha inválidos!');
            throw new Error(error);
        }
    }

    async function signOut() {
        setLoading(true);
        localStorage.clear();
        setUser(null);
        setLoading(false);
    }

    if(loading) {
        return (
            <div>
                Carregando...
            </div>
        )
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, token, user, signIn, signOut, loading }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);