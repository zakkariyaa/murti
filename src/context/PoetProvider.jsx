/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import * as Realm from 'realm-web';

const PoemContext = createContext();
export const usePoets = () => {
  return useContext(PoemContext);
};

const PoetProvider = ({ children }) => {
  const [poets, setPoets] = useState(null);

  useEffect(() => {
    const fetchPoets = async () => {
      const app = new Realm.App({ id: 'data-ufiyw' });
      const credentials = Realm.Credentials.anonymous();

      try {
        const user = await app.logIn(credentials);
        const poets = await user.functions.getPoets();
        setPoets(poets);
      } catch (err) {
        console.error('Failed to log in', err);
      }
    };

    fetchPoets();
  }, []);

  return (
    <PoemContext.Provider value={{ poets, setPoets }}>
      {children}
    </PoemContext.Provider>
  );
};

export default PoetProvider;
