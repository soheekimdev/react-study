import data from '../assets/data';
import { createContext, useContext } from 'react';

const menuContext = createContext();

const MenuProvider = ({ children }) => {
  return <menuContext.Provider value={{ menu: data.menu }}>{children}</menuContext.Provider>;
};

const useMenu = () => useContext(menuContext);

export { MenuProvider, useMenu };
