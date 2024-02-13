import React, { useContext, useEffect } from 'react';
import FolderStructure from '@components/folder';
import SearchBox from '@components/search';
import useKeyPress from '../../hooks/onKeyPress';
import { folderContext } from '../../context/folderContext';
import { enterKeyHandler, cKeyHandler } from '../../utils/traverseNode';

const Explorer = (): JSX.Element => {
  const { activeItem, folderData } = useContext(folderContext);
  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowDownPressed = useKeyPress('ArrowDown');
  const enterPressed = useKeyPress('Enter');
  const cKeyPress = useKeyPress('c');

  //handlers to check arrow keys , enter and c key press
  useEffect(() => {
    if (arrowUpPressed) {
      console.log('arrowUpPressed');
    }
    if (arrowDownPressed) {
      console.log('arrowDownPressed');
    }
    if (enterPressed) {
      console.log('enterPressed');
      enterKeyHandler(folderData, activeItem);
    }
    if (cKeyPress) {
      //   cKeyHandler(folderData, activeItem);
      console.log('cKeyPress');
    }
  }, [arrowUpPressed, arrowDownPressed, enterPressed, cKeyPress]);
  return (
    <div className="MainContainer">
      <SearchBox />
      <FolderStructure filesData={folderData} />
    </div>
  );
};

export default Explorer;
