import React from 'react';

export const HighlightText = ({ itemName, searchResult }: { itemName: string; searchResult: string }): JSX.Element => {
  const parts = itemName.split(new RegExp(`(${searchResult})`, 'gi'));
  return (
    <span style={{marginLeft: 5}}>
      {parts.map((part, index: number) =>
        part.toLowerCase() === searchResult.toLowerCase() ? (
          // eslint-disable-next-line react/jsx-key
          <span key={`${part}${index}`} style={{ background: 'yellow', color: '#000' }}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
};
