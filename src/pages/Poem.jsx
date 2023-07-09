import { useState } from 'react';
import { MdOutlineLightMode, MdDarkMode } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import PoemText from '../components/PoemText';
import styled from 'styled-components';
import calculateReadTime from '../utils/calculateReadTime';
import formatPoem from '../utils/formatPoem';

const Poem = () => {
  const {
    state: { data },
  } = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const readTime = calculateReadTime(data.text);

  const handleLightnessChange = () => {
    setIsDarkMode((prevValue) => !prevValue);
  };

  // format the poem as a 4 line groups
  const formatedText = formatPoem(data.text);
  const poemElements = formatedText.map((lineGroup, idx) => (
    <PoemText key={idx} lines={lineGroup} number={idx} />
  ));

  return (
    <StyledPoetText>
      <div className="poem__header">
        <h3>{data.title}</h3>
        <p>{readTime > 1 ? `${readTime} Minutes` : `${1} Minute`}</p>
        <button onClick={handleLightnessChange}>
          {isDarkMode ? <MdDarkMode /> : <MdOutlineLightMode />}
        </button>
      </div>

      <div className="text__container">{poemElements}</div>
    </StyledPoetText>
  );
};

const StyledPoetText = styled.div`
  margin: 0 auto 4rem auto;
  width: 60%;
  text-align: center;

  .poem__header {
    border-bottom: 1px solid #617289;
    padding-bottom: 1rem;

    h3 {
      color: #0c1e50;
    }

    p {
      color: #617289;
    }

    button {
      font-size: 2rem;
      border: transparent;
      cursor: pointer;
      background: transparent;
    }
  }

  .text__container {
    margin-top: 3rem;
    text-align: left;
  }

  @media (max-width: 420px) {
    width: 80%;
  }
`;

export default Poem;
