import React, { useState } from 'react';
import TopBar from './components/AppBar/TopBar';
import Content from './views/Content/Content';
import GameContext from './contexts/GameContext';
import InstructionsContext from './contexts/InstructionsContext';
import DataContext from './contexts/DataContext';
import FlagContext from './contexts/FlagContext';

function App() {
  const [gameOn, setGameOn] = useState(false);
  const [instructionsOn, setInstructionsOn] = useState(false);
  const [data, setData] = useState({});
  const [flags, setFlags] = useState(JSON.parse(localStorage.getItem('flags')));

  return (
    <div className="App">
      <GameContext.Provider value={{ gameOn, setGameOn }}>
      <InstructionsContext.Provider value={{ instructionsOn, setInstructionsOn }}>
        <DataContext.Provider value={{ data, setData }}>
          <FlagContext.Provider value={{ flags, setFlags }}>
            <TopBar />
            <Content />
          </FlagContext.Provider>
        </DataContext.Provider>
      </InstructionsContext.Provider>
      </GameContext.Provider>
    </div>
  );
}

export default App;
