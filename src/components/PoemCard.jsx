import { BsArrowRight } from 'react-icons/bs';
import styled from 'styled-components';

const PoemCard = ({ image, title, lines, handleNavigation }) => {
  return (
    <StyledArticle>
      <img src={image} alt="" />
      <h4>{title}</h4>
      <div>
        {lines.map((line, idx) => (
          <p key={idx}>{line.trim()}</p>
        ))}
      </div>
      <button onClick={() => handleNavigation(title)}>
        Read more <BsArrowRight />
      </button>
    </StyledArticle>
  );
};

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    border-radius: 0.4rem;
    width: 18rem;
    height: 15rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 1rem;
    padding: 0.3rem 0;
    cursor: pointer;

    :hover {
      background: transparent;
      border: 1px solid #416d5d;
      transition: all 400ms;
    }
  }

  @media (max-width: 420px) {
    img {
      width: 10rem;
      height: 8rem;
    }
  }
`;

export default PoemCard;
