import React from 'react';

export default ({ template, onClick }) => {
  return (
    <img
      style={{ width: 200 }}
      key={template.id}
      src={template.url}
      alt={template.name}
      onClick={onClick}
    />
  );
};
