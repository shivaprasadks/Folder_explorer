import React from 'react';
import FolderContextProvider from './context/folderContext';
import Explorer from '@components/explorer';

const App = (): JSX.Element => (
  <FolderContextProvider>
    <Explorer />
  </FolderContextProvider>
);

export default App;
