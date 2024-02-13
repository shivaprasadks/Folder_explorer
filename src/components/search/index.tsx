import React, { useContext, useState } from 'react';
import { folderContext } from '../../context/folderContext';
import './styles.scss';

const SearchBox = (): JSX.Element => {
  const { updateHandler } = useContext(folderContext);
  const [searchVal, setVal] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target?.value);
  };
  const handleSubmit = ({ key }: { key: string }) => {
    if (key === 'Enter') {
      updateHandler({ searchResult: searchVal });
    }
  };
  return (
    <input
      className="inputBox"
      type="text"
      placeholder="Search"
      value={searchVal}
      onKeyDown={(e) => {
        handleSubmit(e);
      }}
      onChange={(e) => {
        handleInputChange(e);
      }}
    />
  );
};

export default SearchBox;
