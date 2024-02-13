import { transposeFileData, updateTreeData } from '../../../src/utils/transposeData';

describe('transposeFileData', () => {
  test('should transpose file data correctly', () => {
    const mockTree = {
      type: 'folder',
      name: 'parent',
      data: [
        {
          type: 'file',
          name: 'example.txt',
        },
        {
          type: 'folder',
          name: 'child',
          data: [
            {
              type: 'file',
              name: 'child-file.txt',
            },
          ],
        },
      ],
    };

    const transposedData = transposeFileData(mockTree);
    expect(transposedData.type).toBe('folder');
    expect(transposedData.isExpanded).toBe(false);
    expect(transposedData.id).toBe('folderparent');
    expect(transposedData.data?.[1]?.data?.[0]?.id).toBe('filechild-file.txt');
  });
});

describe('updateTreeData', () => {
  test('should update tree data correctly for expanding/collapsing folders', () => {
    const mockTree = {
      type: 'folder',
      name: 'parent',
      id: 'folderparent',
      isExpanded: false,
      data: [
        {
          type: 'file',
          name: 'example.txt',
        },
        {
          id: 'folderchild',
          type: 'folder',
          name: 'child',
          isExpanded: false,
          data: [
            {
              type: 'file',
              name: 'child-file.txt',
            },
          ],
        },
      ],
    };

    const updatedTree = updateTreeData(mockTree, 'folderchild', true, 'Enter');
    expect(updatedTree.data?.[1]?.isExpanded).toBe(true);
  });

  test('should update tree data correctly for showing/hiding options', () => {
    const mockTree = {
      type: 'folder',
      name: 'parent',
      id: 'folderparent',
      isExpanded: true,
      showOptions: false,
      data: [
        {
          type: 'file',
          id: 'fileexample.txt',
          showOptions: false,
          name: 'example.txt',
        },
        {
          type: 'folder',
          name: 'child',
          showOptions: false,
          isExpanded: false,
          data: [
            {
              type: 'file',
              showOptions: false,
              name: 'child-file.txt',
            },
          ],
        },
      ],
    };

    const updatedTree = updateTreeData(mockTree, 'folderparent', true, 'c');
    expect(updatedTree.showOptions).toBe(true);
  });
});
