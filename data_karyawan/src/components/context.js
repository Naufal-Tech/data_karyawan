import { createContext, useState } from "react";

// Create a new context named AppContext variable:
const AppContext = createContext();

const AppProvider = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // Inject AppContext with some states: isSidebarOpen and isModalOpen
    // This provider allows its children components to access and update the state defined within it.
    <AppContext.Provider
      value={{ isSidebarOpen, setIsSidebarOpen, isModalOpen, setIsModalOpen }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
