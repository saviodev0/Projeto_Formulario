import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import '../styles/LoginForm.css';

export default function LoginForm() {
  // Configura o React Hook Form com valores iniciais do formulário
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Estados locais para controlar carregamento e mensagens
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Função chamada quando o formulário é enviado com sucesso
  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Envia a requisição de login para o backend
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email: data.email,
        password: data.password
      });

      if (response.data.success) {
        setSuccessMessage('Login realizado com sucesso! ✓');
        setLoggedInUser(response.data.user);
        reset();

        // Limpa a mensagem de sucesso após alguns segundos
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      // Tratamento de erro explícito no catch
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Erro ao fazer login');
      } else if (error.request) {
        setErrorMessage('Erro de conexão. Verifique se o servidor está rodando.');
      } else {
        setErrorMessage('Erro ao enviar formulário: ' + error.message);
      }
      console.error('Erro no login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        
        {/* Exibe informações do usuário após login bem-sucedido */}
        {loggedInUser && (
          <div className="user-info">
            <p>Bem-vindo, <strong>{loggedInUser.name}</strong>!</p>
            <p>Email: {loggedInUser.email}</p>
            <button 
              onClick={() => setLoggedInUser(null)}
              className="logout-button"
            >
              Sair
            </button>
          </div>
        )}

        {/* Exibe o formulário apenas quando não há usuário logado */}
        {!loggedInUser && (
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            {/* Campo Email */}
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder="seu@email.com"
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email inválido'
                  }
                })}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            {/* Campo Senha */}
            <div className="form-group">
              <label htmlFor="login-password">Senha</label>
              <input
                id="login-password"
                type="password"
                placeholder="Sua senha"
                {...register('password', {
                  required: 'Senha é obrigatória'
                })}
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>

            {/* Mensagens de sucesso e erro */}
            {successMessage && (
              <div className="success-message">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="error-alert">
                {errorMessage}
              </div>
            )}

            {/* Botão de envio */}
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'Autenticando...' : 'Entrar'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
