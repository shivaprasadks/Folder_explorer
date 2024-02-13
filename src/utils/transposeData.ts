import { FolderProps, StructuredProps } from '@components/folder/types';

export const transposeFileData = (tree: FolderProps) => {
  const structuredData = JSON.parse(JSON.stringify(tree));

  const updateNewKeys = (branch: StructuredProps) => {
    if (branch.type === 'folder') {
      branch.isExpanded = false;
      branch.id = branch.type + branch.name;
      branch.data?.map((item) => {
        updateNewKeys(item);
      });
    } else {
      branch.isExpanded = false;
      branch.id = branch.type + branch.name;
    }
  };
  updateNewKeys(structuredData);

  return structuredData;
};

export const updateTreeData = (tree: StructuredProps, id: string, value: boolean, keyPressed = 'Enter') => {
  if (tree.id === id) {
    if (keyPressed === 'Enter') {
      tree.isExpanded = value;
    } else {
      tree.showOptions = value;
    }
  } else {
    tree.data?.map((item) => {
      updateTreeData(item, id, value);
    });
  }

  return tree;
};
