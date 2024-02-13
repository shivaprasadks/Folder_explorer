import { StructuredProps } from "@components/folder/types";

interface File {
  type: string;
  name: string;
  data?: File[];
  meta?: string;
  isExpanded?: boolean;
  id: string;
}

export const enterKeyHandler = (tree: StructuredProps, id: string) => {
  if (tree.type === "folder") {
    if (tree.id === id) tree.isExpanded = !tree.isExpanded;

    tree.data?.map((item) => {
      enterKeyHandler(item, id);
    });
  }
  return;
};

export const cKeyHandler = (tree: StructuredProps, id: string) => {
  if (tree.type === "folder") {
    if (tree.id === id) tree.showOptions = !tree.showOptions;

    tree.data?.map((item) => {
      enterKeyHandler(item, id);
    });
  }
  return;
};

const flattenFiles = (file: StructuredProps): File[] => {
  let result: File[] = [file];
  if (file.type === "folder" && file.data && file.isExpanded) {
    result = result.concat(...file.data.map(flattenFiles));
  }
  return result;
};

export const getNextItemId = (file: File, currentId: string): string | null => {
  const flatFiles = flattenFiles(file);

  const currentIndex = flatFiles.findIndex((item) => item.id === currentId);

  if (currentIndex !== -1 && currentIndex < flatFiles.length - 1) {
    return flatFiles[currentIndex + 1].id;
  }

  return currentId; 
};

export const getPreviousItemId = (
  file: File,
  currentId: string
): string | null => {
  const flatFiles = flattenFiles(file);

  const currentIndex = flatFiles.findIndex((item) => item.id === currentId);

  if (currentIndex > 0) {
    return flatFiles[currentIndex - 1].id;
  }

  return currentId; 
};
