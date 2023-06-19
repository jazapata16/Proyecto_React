import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './AppContext';
import AlbumMakerApp from './AlbumMakerApp';

ReactDOM.render(
  <AppProvider>
    <AlbumMakerApp />
  </AppProvider>,
  document.getElementById('root')
);
