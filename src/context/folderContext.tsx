import React, { ReactNode, createContext, useState } from 'react';
import { Files } from '../data/structureData';
import { transposeFileData, updateTreeData } from '../utils/transposeData';
import { StructuredProps } from '@components/folder/types';

const DEFAULT_STATE = {
  searchStr: '',
  searchResult: '',
  activeItem: '',
  showOptions: false,
  folderData: transposeFileData(Files),
  updateHandler: (val = {}) => {
    console.log(val);
  },
  updateTreeState: ({ tree = {}, id = '', value = false }) => {
    console.log({ tree, id, value });
  },
  expandAll: false,
};
export const folderContext = createContext(DEFAULT_STATE);
interface UpdateTreeProps {
  tree: StructuredProps;
  id: string;
  value: boolean;
  keyPressed?: 'Enter' | 'c';
}
const FolderContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [initialState, setContextState] = useState(DEFAULT_STATE);
  const updateHandler = (state = {}) => {
    setContextState({ ...initialState, ...state });
  };
  const updateTreeState = ({ tree, id, value, keyPressed = 'Enter' }: UpdateTreeProps) => {
    const updatedTree = updateTreeData(tree, id, value, keyPressed);
    setContextState({ ...initialState, folderData: { ...updatedTree } });
  };

  return (
    <folderContext.Provider
      value={{
        searchStr: initialState.searchStr,
        activeItem: initialState.activeItem,
        searchResult: initialState.searchResult,
        expandAll: initialState.expandAll,
        folderData: initialState.folderData,
        showOptions: initialState.showOptions,
        updateHandler,
        updateTreeState,
      }}
    >
      {children}
    </folderContext.Provider>
  );
};

export default FolderContextProvider;
