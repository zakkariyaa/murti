import Navbar from '../components/Navbar';
import Header from '../components/Header';
import MainList from '../components/MainList';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Home = () => {
  return (
    <StyledContainer>
      <Navbar />
      <Header />
      <MainList />
      <Footer />
    </StyledContainer>
  );
};

export default Home;

const StyledContainer = styled.div``;
