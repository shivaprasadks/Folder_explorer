import React from 'react';
import style from './styles.scss';

const ModelComp = () => {
  const renameHandler = () => {
    console.log('Rename');
  };
  const deleteHandler = () => {
    console.log('Delete ');
  };

  const copyHandler = () => {
    console.log('File Copied');
  };

  return (
    <div className={style.ModelWrapper}>
      <ul>
        <li onClick={renameHandler}>Rename</li>
        <li onClick={copyHandler}>Copy</li>
        <li onClick={deleteHandler}>Delete</li>
      </ul>
    </div>
  );
};

export default ModelComp;
