import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PoemCard from '../components/PoemCard';
import styled from 'styled-components';
import poemCoverImgs from '../utils/poemCoverImgs';

const Poet = () => {
  const {
    state: { data },
  } = useLocation();

  const navigate = useNavigate();
  const handleNavigation = (title) => {
    const poem = data.poems.filter((poem) => poem.title === title);
    navigate(`/poet/${data.id}/${title}`, { state: { data: poem[0] } });
  };

  const poemCardElements = data.poems.map((poem, idx) => {
    return (
      <PoemCard
        key={idx}
        title={poem.title}
        image={poemCoverImgs[idx]}
        // show the first couple lines of the poem
        lines={poem.text.split('.').slice(0, 2)}
        handleNavigation={handleNavigation}
      />
    );
  });

  return (
    <StyledContainer>
      <Navbar />
      <h2>{data.name}</h2>
      <StyledPoemContainer>{poemCardElements}</StyledPoemContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  h2 {
    margin: 1rem auto;
    width: 85%;
  }
`;

const StyledPoemContainer = styled.section`
  margin: 2rem auto;
  width: 85%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  row-gap: 2rem;

  @media (max-width: 420px) {
    grid-template-columns: 1fr 1fr;
    margin: 1rem auto 2rem auto;
  }
`;

export default Poet;
