import React, { useContext, useRef, useState } from 'react';
import { StructuredProps } from './types';
import style from './styles.scss';
import ModelComp from '@components/model';
import useOnClickOutside from '../../hooks/onClickOutside';
import { folderContext } from '../../context/folderContext';
import { HighlightText } from './highlight';
interface FolderStructureProp {
  filesData: StructuredProps;
}

const FolderStructure = ({ filesData }: FolderStructureProp): JSX.Element => {
  const [expandFolder, setExpand] = useState(false);
  const [showOptionsLocal, setOptionsLocal] = useState(false);
  const { activeItem, updateHandler, searchResult, expandAll, folderData, updateTreeState } = useContext(folderContext);

  const ref = useRef(null);
  const folderRef = useRef(null);

  const handleRightClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const payload = { tree: folderData, id: activeItem, value: false, keyPressed: 'C' };
    if (ref.current.style.display === 'none') payload.value = true;
    else payload.value = false;

    updateTreeState(payload);
    setOptionsLocal(payload.value);
  };

  const setHovered = () => {
    // console.log('hover');
  };

  const handleClick = (filesData: StructuredProps) => {
    if (filesData.type === 'folder') {
      const payload = { tree: folderData, id: filesData.id, value: !expandFolder, keyPressed: 'Enter' };
      updateTreeState(payload);
      setExpand(!expandFolder);
    }
    updateHandler({ activeItem: filesData.id });
  };

  useOnClickOutside(ref, () => {
    // const payload = { tree: folderData, id: activeItem, value: false, keyPressed: 'C' };
    // console.log(payload);
    // if (showOptionsLocal) updateTreeState(payload);
    setOptionsLocal(false);
  });

  return (
    <ul className={style.Folder} ref={folderRef}>
      {filesData.type === 'folder' ? (
        <>
          <li
            style={{ background: activeItem === filesData.id ? '#44475A' : 'none' }}
            onMouseEnter={() => setHovered()}
            onMouseLeave={() => setHovered()}
            onContextMenu={(e) => {
              handleRightClick(e);
            }}
            onClick={() => {
              handleClick(filesData);
            }}
          >
            {filesData.isExpanded || expandAll ? '📂' : '📁'}
            <HighlightText itemName={filesData.name} searchResult={searchResult} />
          </li>
          <div
            style={{
              display: filesData.isExpanded || expandAll ? 'block' : 'none',
            }}
          >
            {filesData.data.map((item) => (
              <li key={item.name}>
                <FolderStructure filesData={item} />
              </li>
            ))}
          </div>
          <div ref={ref} style={{ display: showOptionsLocal ? 'block' : 'none' }}>
            <ModelComp />
          </div>
        </>
      ) : (
        <li className={style.File} style={{ background: activeItem === filesData.id ? '#44475A' : 'none' }}>
          <div
            onClick={() => {
              handleClick(filesData);
            }}
            onContextMenu={(e) => {
              handleRightClick(e);
            }}
          >
            📄 <HighlightText itemName={filesData.name} searchResult={searchResult} />
          </div>
          <div ref={ref} style={{ display: showOptionsLocal ? 'block' : 'none' }}>
            <ModelComp />
          </div>
        </li>
      )}
    </ul>
  );
};

export default FolderStructure;
