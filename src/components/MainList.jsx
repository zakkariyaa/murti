import { useEffect, useState } from 'react';
import { usePoets } from '../context/PoetProvider';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import PoetCard from './PoetCard';
import styled from 'styled-components';

const MainList = () => {
  const { poets } = usePoets();
  const [isLoading, setIsLoading] = useState(true);
  const [poetData, setPoetData] = useState([]);
  const [chosenTab, setChosenTab] = useState('main');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  // fetch data
  useEffect(() => {
    if (poets) {
      setPoetData(poets.map((poet) => ({ ...poet, favoured: false })));
      setIsLoading(false);
    }
  }, [poets]);

  // toggle favourite
  const handleFavourite = (id) => {
    setPoetData((prevValues) =>
      prevValues.map((el) =>
        id === el._id ? { ...el, favoured: !el.favoured } : el
      )
    );
  };

  // navigate to individual poet page
  const handleNavigation = (id) => {
    const chosenPoetData = poetData.filter((poet) => poet._id === id);
    navigate(`/poet/${id}`, { state: { data: chosenPoetData[0] } });
  };

  // search and filter functionality
  const handleSearch = (e) => {
    const keyword = e.target.value;
    const filteredResults = poetData.filter((poet) =>
      poet.name.toLowerCase().includes(keyword.toLowerCase())
    );

    setFilteredData(filteredResults);
  };

  // all poets tab elements
  const allPoetCards = poetData.map((poet) => (
    <PoetCard
      key={poet._id}
      id={poet._id}
      name={poet.name}
      poems={poet.poems.length}
      image={poet.img}
      favoured={poet.favoured}
      handleFavourite={handleFavourite}
      handleNavigation={handleNavigation}
    />
  ));

  // favourite poets
  const favouritePoetCards = poetData
    .filter((poet) => poet.favoured)
    .map((poet) => (
      <PoetCard
        key={poet._id}
        id={poet._id}
        name={poet.name}
        poems={poet.poems.length}
        image={poet.img}
        favoured={poet.favoured}
        handleFavourite={handleFavourite}
      />
    ));

  // // cards that should be displayed on the page
  const poetCards =
    filteredData.length > 0
      ? filteredData.map((poet) => (
          <PoetCard
            key={poet._id}
            id={poet._id}
            name={poet.name}
            poems={poet.poems.length}
            image={Image}
            favoured={poet.favoured}
            handleFavourite={handleFavourite}
            handleNavigation={handleNavigation}
          />
        ))
      : chosenTab === 'main'
      ? allPoetCards
      : favouritePoetCards;

  return (
    <StyledSection>
      <SearchBar
        chosenTab={chosenTab}
        setChosenTab={setChosenTab}
        handleSearch={handleSearch}
      />
      {isLoading ? (
        <Loader>
          <TailSpin color="#00BFFF" height={100} width={100} />
        </Loader>
      ) : (
        <StyledPoetContainer>{poetCards}</StyledPoetContainer>
      )}
    </StyledSection>
  );
};

const StyledSection = styled.section`
  margin: 15rem auto 2rem auto;
  width: 85%;

  @media (max-width: 420px) {
    margin: 5rem auto 2rem auto;
  }
`;

const StyledPoetContainer = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  row-gap: 3rem;

  img {
    width: 100%;
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr 1fr;
    margin: 1rem auto 2rem auto;
  }
`;

const Loader = styled.div`
  display: grid;
  place-items: center;
  margin-top: 20rem;
`;

export default MainList;
