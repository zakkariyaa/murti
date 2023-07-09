/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import { AvatarGenerator } from 'random-avatar-generator';
const generator = new AvatarGenerator();

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userId = JSON.parse(localStorage?.getItem('userId'));
        const app = new Realm.App({ id: 'data-ufiyw' });
        const credentials = Realm.Credentials.anonymous();

        const user = await app.logIn(credentials);
        const response = await user.functions.verifyUser(userId);

        const avatar = generator.generateRandomAvatar(response.username);

        setIsAuthenticated(true);
        setUserData({ ...response, avatar });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [userData.username]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
