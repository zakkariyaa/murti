import { useAuth } from '../context/AuthProvider';
import styled from 'styled-components';
import { FiBookOpen } from 'react-icons/fi';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, loading, userData } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    window.localStorage.removeItem('userId');
    window.location.reload();
  };

  const handleHomeIcon = () => {
    navigate(`/users/${userData.username}`, { state: { userData } });
  };

  return (
    <>
      {loading ? (
        <Loader>
          <TailSpin color="#00BFFF" height={100} width={100} />
        </Loader>
      ) : (
        <>
          <StyledNavbar>
            <FiBookOpen className="heart__icon" />
            <ul>
              <li>
                <a href="/">Home</a>
              </li>

              <li>|</li>

              <li>
                {isAuthenticated ? (
                  <button className="logout__btn" onClick={handleLogOut}>
                    Log out
                  </button>
                ) : (
                  <a href="/signup">Sign Up</a>
                )}
              </li>
              <li>
                {isAuthenticated ? (
                  <img
                    src={userData.avatar}
                    alt="user avatar icon"
                    onClick={handleHomeIcon}
                    className="user__avatar"
                  />
                ) : (
                  <a href="/login">Log In</a>
                )}
              </li>
            </ul>
          </StyledNavbar>
          <StyledBottomLine />
        </>
      )}
    </>
  );
};

const StyledNavbar = styled.nav`
  padding: 0 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .heart__icon {
    color: #0c1e50;
    font-size: 2.4rem;
    @media (max-width: 420px) {
      font-size: 1.9rem;
    }
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 1rem;

    li:nth-child(1) {
      margin-right: 2rem;
    }

    li:nth-child(2) {
      font-size: x-large;
      border-radius: 0.6rem;
      color: #006d77;
      background-color: #006d77;
    }

    .logout__btn {
      border: transparent;
      background: transparent;
      cursor: pointer;
    }

    a,
    .logout__btn {
      position: relative;
      text-decoration: none;
      color: #0c1e50;
      font-size: 1.2rem;
      ::after {
        content: '';
        height: 2px;
        background-color: black;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform: scaleX(0);
        transition: all 400ms ease;
      }

      :hover {
        ::after {
          opacity: 1;
          transform: scaleX(1);
        }
      }
    }

    .user__avatar {
      cursor: pointer;
      width: 3rem;
    }
  }

  @media (max-width: 420px) {
    padding: 1rem 2rem;

    ul {
      a {
        font-size: 1.1rem;
      }

      .logout__btn {
        font-size: 1rem;
      }
    }
  }
`;

const StyledBottomLine = styled.hr`
  width: 94%;
`;

const Loader = styled.div`
  display: grid;
  place-items: center;
  margin-top: 20rem;
`;

export default Navbar;
