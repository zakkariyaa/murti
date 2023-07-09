import * as Realm from 'realm-web';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AuthForm = ({ page }) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let formValues = Object.fromEntries(formData.entries());
    formValues = { ...formValues, created_at: new Date() };

    const app = new Realm.App({ id: 'data-ufiyw' });
    const credentials = Realm.Credentials.anonymous();

    try {
      const user = await app.logIn(credentials);

      // auth functionality depending on the page.
      // might've complicated the code a bit here due to laziness :)
      let userId;

      if (page === 'signup') {
        const response = await user.functions.insertUser(formValues);
        userId = response.insertedId;
      } else {
        const response = await user.functions.getUser(formValues);
        userId = response._id;
      }

      localStorage.setItem('userId', JSON.stringify(userId));
      setErrorMessage(false);
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error('Failed to log in', err);
      setErrorMessage(true);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {page === 'signup' && (
        <>
          <label htmlFor="firstName">First name</label>
          <input type="text" name="firstName" id="firstName" required />

          <label htmlFor="lastName">Last name</label>
          <input type="text" name="lastName" id="lastName" required />

          <label htmlFor="location">Location</label>
          <input type="text" name="location" id="location" required />
        </>
      )}

      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" required />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" required />

      {errorMessage && <p className="error__message">Wrong credentials</p>}

      <button type="submit">{page === 'signup' ? `Signup` : 'Login'}</button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 1.1rem;
  }

  input,
  button {
    padding: 0.5rem;
    width: 70%;
  }

  button {
    margin-top: 2rem;
    font-size: 1.1rem;
    cursor: pointer;
    background: #409cbb;
    color: #fff;
    border: 1px solid black;

    :hover {
      background: #2c7790;
      border: 1px solid white;
    }
  }

  .error__message {
    width: 70%;
    padding: 0.3rem;
    background: maroon;
    color: #fff;
  }

  @media (max-width: 420px) {
    input,
    button,
    .error__message {
      padding: 0.5rem;
      width: 94%;
    }

    .error__message {
      padding: 0.3rem;
    }
  }
`;

export default AuthForm;
