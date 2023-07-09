import styled from 'styled-components';
import Rose from '../assets/rose1.png';

const Header = () => {
  return (
    <StyledHeader>
      <div>
        <blockquote>
          In joy or sorrow, it paints the scenes, <br />
          Enchanting minds, transcending routines. <br />
          For in the realm of poetic expression, <br />
          Lies the power to shape and teach a lesson.
        </blockquote>
        <blockquote>
          So let us treasure this gift profound, <br />
          Let poetry's symphony resound, <br />
          For in its rhythm and soulful art, <br />
          Lies the essence of the human heart.
        </blockquote>
        <p>
          <strong>
            <cite>— Anonymous</cite>
          </strong>
        </p>
      </div>
      <img src={Rose} alt="a rose" />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background-color: #edf2f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin: 3rem auto;
  width: 80%;
  height: 80vh;

  div {
    line-height: 2;
    font-size: 1.2rem;
    font-style: italic;

    blockquote:nth-child(2) {
      margin-top: 2rem;
    }
  }

  @media (max-width: 420px) {
    flex-direction: column;
    width: 100%;
    height: auto;
    margin: 1rem auto;

    img {
      width: 40%;
    }
  }
`;

export default Header;
