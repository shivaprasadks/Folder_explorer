import { StructuredProps } from '@components/folder/types';

export const enterKeyHandler = (tree: StructuredProps, id: string) => {
  if (tree.type === 'folder') {
    if (tree.id === id) tree.isExpanded = !tree.isExpanded;

    tree.data?.map((item) => {
      enterKeyHandler(item, id);
    });
  }
  return;
};

export const cKeyHandler = (tree: StructuredProps, id: string) => {
  if (tree.type === 'folder') {
    if (tree.id === id) tree.showOptions = !tree.showOptions;

    tree.data?.map((item) => {
      enterKeyHandler(item, id);
    });
  }
  return;
};
