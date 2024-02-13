export type FolderProps = {
  type: string;
  name: string;
  data?: FolderProps[];
  meta?: string;
};

export type StructuredProps = {
  type: string;
  name: string;
  data?: StructuredProps[];
  meta?: string;
  isExpanded?: boolean;
  id?: string;
  showOptions?: boolean;
};
