import React from 'react';
import Router from '../router';
import AppNavBar from '../components/AppNavBar';

/**
 * The context is created to share the selected car between the Brand and CarForm components.
 * The selected car is stored in the context and is used to display the selected car in the CarForm component.
 * The setSelectedCar function is used to set the selected car in the context.
 * The context is then provided to the AppNavBar and Router components.
 */
export const SelectedCarContext = React.createContext<{
  selectedCar: string | undefined;
  setSelectedCar: (car: string) => void;
}>({
  selectedCar: undefined,
  setSelectedCar: () => {
    //
  },
});

function App() {
  const [selectedCar, setSelectedCar] = React.useState<string | undefined>();
  return (
    <div>
      <SelectedCarContext.Provider value={{ selectedCar, setSelectedCar }}>
        <AppNavBar />
        <div className="container mx-auto p-4">
          <Router />
        </div>
      </SelectedCarContext.Provider>
    </div>
  );
}

export default App;
