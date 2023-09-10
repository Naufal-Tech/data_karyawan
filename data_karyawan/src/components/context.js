import { useState } from "react";
import { createContext } from "react";

const AppContext = createContext();

const AppProvider = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{ isSidebarOpen, setIsSidebarOpen, isModalOpen, setIsModalOpen }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
