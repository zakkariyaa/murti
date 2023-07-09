import styled from 'styled-components';
import AuthForm from '../components/AuthForm';

const Login = () => {
  return (
    <StyledContainer>
      <h2>Login</h2>
      <hr />
      <AuthForm page={'login'} />
      <p>
        Don't have an account yet? <a href="/signup">Signup</a>
      </p>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin: 2rem auto;
  width: 65%;

  hr {
    width: 70%;
    margin: 0;
  }

  p {
    font-size: 1.1rem;
    margin-top: 2rem;

    a {
      text-decoration: none;
      color: blueviolet;
    }
  }

  @media (max-width: 420px) {
    width: 85%;

    hr {
      width: 90%;
    }
  }
`;

export default Login;
