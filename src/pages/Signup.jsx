import styled from 'styled-components';
import AuthForm from '../components/AuthForm';

const Signup = () => {
  return (
    <StyledContainer>
      <h2>Signup</h2>
      <hr />
      <AuthForm page={'signup'} />
      <p>
        Already have an account? <a href="/login">Login</a>
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

export default Signup;
