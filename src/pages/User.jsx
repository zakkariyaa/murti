import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as Realm from 'realm-web';
import styled from 'styled-components';
import getMonthName from '../utils/getMonthName';
import { MdLocationOn } from 'react-icons/md';
import { BiCalendar, BiMessageSquareAdd } from 'react-icons/bi';
import PoemCard from '../components/PoemCard';
import poemCoverImgs from '../utils/poemCoverImgs';

const User = () => {
  const {
    state: { userData },
  } = useLocation();

  // format join date as M-Y
  // const joinDate = userData.created_at.split('-').slice(0, 2);
  const [formShown, setFormShown] = useState(false);
  const [userPoems, setUserPoems] = useState([]);
  const formRef = useRef(null);

  // retrieve user specfic user poems
  useEffect(() => {
    const fetchData = async () => {
      const userId = window.localStorage?.getItem('userId');
      const app = new Realm.App({ id: 'data-ufiyw' });
      const credentials = Realm.Credentials.anonymous();

      try {
        const user = await app.logIn(credentials);
        const userPoems = await user.functions.getUserPoems(userId);
        setUserPoems(userPoems);
      } catch (err) {
        console.error('Failed to log in', err);
      }
    };

    fetchData();
  }, [userPoems]);

  const handleFormShown = () => {
    setFormShown((prevValue) => !prevValue);
  };

  // submit user poems to db
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    const userId = window.localStorage.getItem('userId');

    if (userId) {
      const app = new Realm.App({ id: 'data-ufiyw' });
      const credentials = Realm.Credentials.anonymous();

      try {
        const user = await app.logIn(credentials);
        await user.functions.insertUserPoem({ ...formValues, userId });
      } catch (err) {
        console.error('Failed to log in', err);
      }

      formRef.current.reset();
    }
  };

  return (
    <StyledContainer>
      <StyledHeader>
        <div className="user__avatar">
          <img src={userData.avatar} alt="user profile" />
        </div>

        <div className="user__info">
          <p className="fullname">
            {userData.firstName} {userData.lastName}
          </p>
          <p className="username">{`@${userData.username[0].toUpperCase()}${userData.username.slice(
            1
          )}`}</p>
          <p className="location">
            <MdLocationOn /> {userData.location}
          </p>
          <p className="join__date">
            {' '}
            <BiCalendar />
            {/* {getMonthName(joinDate[1])} {joinDate[0]} */}
          </p>
        </div>
      </StyledHeader>

      <StyledPostsContainer>
        <StyledPoemContainer>
          {userPoems.map((poem, idx) => {
            return (
              <PoemCard
                key={idx}
                title={poem.title}
                image={poemCoverImgs[idx]}
                // show the first couple lines of the poem
                lines={poem.text.split('.').slice(0, 2)}
              />
            );
          })}
        </StyledPoemContainer>

        <button className="add__post" onClick={handleFormShown}>
          <BiMessageSquareAdd />
        </button>

        {formShown && (
          <StyledForm onSubmit={handleSubmit} ref={formRef}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" required />

            <label htmlFor="text">Poem</label>
            <textarea name="text" rows={6} required />

            <button type="submit">Submit</button>
          </StyledForm>
        )}
      </StyledPostsContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin: 1rem auto;
  width: 65%;
`;

const StyledHeader = styled.header`
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid black;

  .user__avatar {
    img {
      width: 7rem;
    }
  }

  .user__info {
    margin-top: 1rem;

    .fullname {
      font-weight: bold;
    }
    .username {
      font-style: italic;
      color: #617289;
    }

    .join__date,
    .location {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }
`;

const StyledPoemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  row-gap: 2rem;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    margin: 1rem auto 2rem auto;
  }
`;

const StyledPostsContainer = styled.div`
  margin: 2rem 0;

  .add__post {
    margin-top: 4rem;
    background: transparent;
    border: transparent;
    font-size: 1.8rem;
    color: #2e7a93;
    cursor: pointer;
  }
`;

const StyledForm = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 1.1rem;
  }

  input,
  button,
  textarea {
    padding: 0.4rem;
    width: 60%;
  }

  button {
    margin-top: 0.5rem;
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

  @media (max-width: 420px) {
    input,
    button,
    textarea {
      font-size: 0.6rem;
      padding: 0.4rem;
      width: 94%;
    }
  }
`;

export default User;
