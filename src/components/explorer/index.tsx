import React, { useContext, useEffect } from "react";
import FolderStructure from "@components/folder";
import SearchBox from "@components/search";
import useKeyPress from "../../hooks/onKeyPress";
import { folderContext } from "../../context/folderContext";
import { enterKeyHandler, cKeyHandler } from "../../utils/traverseNode";
import { getNextItemId, getPreviousItemId } from "../../utils/traverseNode";
interface File {
  type: string;
  name: string;
  data?: File[];
  meta?: string;
}
const Explorer = (): JSX.Element => {
  const { activeItem, folderData, updateHandler } = useContext(folderContext);
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const enterPressed = useKeyPress("Enter");
  const cKeyPress = useKeyPress("c");

  //handlers to check arrow keys , enter and c key press
  useEffect(() => {
    if (arrowUpPressed) {
      if (activeItem === "") updateHandler({ activeItem: folderData.id });
      const nextItem = getPreviousItemId(folderData, activeItem);
      updateHandler({ activeItem: nextItem });
    }
    if (arrowDownPressed) {
      if (activeItem === "") updateHandler({ activeItem: folderData.id });

      const nextItem = getNextItemId(folderData, activeItem);
      updateHandler({ activeItem: nextItem });
    }
    if (enterPressed) {
      enterKeyHandler(folderData, activeItem);
    }
    if (cKeyPress) {
      //   cKeyHandler(folderData, activeItem);
      console.log("cKeyPress");
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
