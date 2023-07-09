/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

const PoetCard = ({
  id,
  image,
  name,
  poems,
  favoured,
  handleFavourite,
  handleNavigation,
}) => {
  return (
    <StyledArticle favoured={favoured}>
      <img src={image} alt="cool" onClick={() => handleNavigation(id)} />
      <hr />
      <h4>{name}</h4>

      <div>
        <p>{poems > 1 ? `${poems} Poems` : `${poems} Poem`}</p>
        <span onClick={() => handleFavourite(id)}>
          {favoured ? (
            <AiFillHeart className="heart__icon" />
          ) : (
            <AiOutlineHeart className="heart__icon" />
          )}
        </span>
      </div>
    </StyledArticle>
  );
};

const StyledArticle = styled.section`
  padding: 0.5rem;
  box-shadow: 4px 4px 10px -2px rgba(0, 0, 0, 0.5);
  background-color: #d8e4e1;

  img {
    width: 100%;
    height: 10rem;
    cursor: pointer;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-style: italic;
      font-weight: 600;
      color: #3a86ff;
    }

    .heart__icon {
      color: ${({ favoured }) => (favoured ? `maroon` : '')};
      font-size: 1.6rem;
      cursor: pointer;
    }
  }

  :hover {
    box-shadow: 0 3rem 3rem rgba(0, 0, 0, 0.3);
    z-index: 1;
    transition: all 500ms;
  }

  @media (max-width: 420px) {
    div .heart__icon {
      font-size: 1rem;
    }
  }
`;

export default PoetCard;
