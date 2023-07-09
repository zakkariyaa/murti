/* eslint-disable react/prop-types */
import { useRef } from 'react';
import styled from 'styled-components';

const SearchBar = ({ chosenTab, setChosenTab, handleSearch }) => {
  const buttonRef = useRef(null);

  const handleTabChange = (event) => {
    const buttonClassName = event.target.className.split(' ')[0];

    for (let button of buttonRef.current.children) {
      const currentButton = button.className.split(' ')[0];

      if (currentButton === buttonClassName) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    }

    setChosenTab((prevTab) => (prevTab === 'main' ? 'favourite' : 'main'));
  };

  return (
    <StyledContainer>
      <StyledDiv ref={buttonRef}>
        <button
          className={chosenTab === 'main' ? 'active' : ''}
          onClick={handleTabChange}>
          All Poets
        </button>
        <button
          className={chosenTab === 'favourite' ? 'active' : ''}
          onClick={handleTabChange}>
          Favourites
        </button>
      </StyledDiv>

      <StyledForm>
        <input
          type="search"
          name="search"
          placeholder="Search..."
          onChange={handleSearch}
        />
      </StyledForm>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 1rem;
  align-items: center;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid #000;

  @media (max-width: 420px) {
    width: 94%;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  gap: 2rem;

  button {
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    border-radius: 0.3rem;
    border: 1px solid gray;
    cursor: pointer;
  }

  button.active {
    background-color: #003049;
    color: #fff;

    :hover {
      border-color: #219ebc;
      transition: all 400ms;
    }
  }

  @media (max-width: 420px) {
    gap: 0.5rem;
    order: 2;

    button {
      font-size: 1rem;
    }
  }
`;

const StyledForm = styled.form`
  input {
    border: 1px solid gray;
    padding: 0.7rem;
    border-radius: 0%.9rem;
    outline: 1px solid #0077b6;
    border: 1px solid #0077b6;
    width: 98%;

    :focus {
      outline: 1px solid maroon;
      border: 1px solid maroon;
    }
  }
`;

export default SearchBar;
