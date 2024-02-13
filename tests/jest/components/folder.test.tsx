import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FolderStructure from '../../../src/components/folder';

describe('FolderStructure', () => {
  const mockFilesData = {
    type: 'folder',
    id: 'folderId',
    name: 'FolderName',
    isExpanded: false,
    data: [
      {
        type: 'file',
        id: 'fileId',
        name: 'FileName',
      },
    ],
  };

  // test('renders FolderStructure component', () => {
  //   render(<FolderStructure filesData={mockFilesData} />);
  //   const folderStructureElement = screen.getByText('FolderName');
  //   expect(folderStructureElement).toBeInTheDocument;
  // });

  test('handles click on folder', () => {
    render(<FolderStructure filesData={mockFilesData} />);
    const folderElement = screen.getByText('FolderName');
    fireEvent.click(folderElement);
  });

  test('handles right click on folder', () => {
    render(<FolderStructure filesData={mockFilesData} />);
    const folderElement = screen.getByText('FolderName');
    fireEvent.contextMenu(folderElement);
  });

  test('handles click on file', () => {
    const fileData = {
      type: 'file',
      id: 'fileId',
      name: 'FileName',
    };
    render(<FolderStructure filesData={fileData} />);
    const fileElement = screen.getByText('FileName');
    fireEvent.click(fileElement);
  });
});
