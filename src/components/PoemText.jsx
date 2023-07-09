/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { AiOutlineStar } from 'react-icons/ai';

const PoemText = ({ lines, number }) => {
  return (
    <StyledArticle>
      <p>
        <span>{number + 1}</span>&mdash; {lines[1]}
      </p>
      <p>{lines[2]}</p>
      <p>{lines[3]}</p>
      <p>{lines[4]}</p>
      <p className="star__icon">
        <AiOutlineStar />
      </p>
    </StyledArticle>
  );
};

const StyledArticle = styled.div`
  p {
    font-size: 1.1rem;
    line-height: 2;
    word-spacing: 2;
  }

  .star__icon {
    margin: 1.5rem 11rem;
    color: red;

    @media (max-width: 420px) {
      margin: 1.5rem 7rem;
    }
  }
`;

export default PoemText;
