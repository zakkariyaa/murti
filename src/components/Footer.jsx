import styled from 'styled-components';

const Footer = () => {
  return (
    <StyledFooter>
      <hr />
      <p>&copy; 2023 – Zakarie Yaris. All Rights Reserved</p>
      <p>Made with 🧡 in London, UK</p>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  margin-top: 15rem;
  text-align: center;

  hr {
    width: 80%;
  }

  p {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.5;
    color: #457b9d;

    span {
      font-style: italic;
      color: #e76f51;
      font-weight: bold;
    }
  }

  @media (max-width: 420px) {
    margin-top: 5rem;
  }
`;

export default Footer;
