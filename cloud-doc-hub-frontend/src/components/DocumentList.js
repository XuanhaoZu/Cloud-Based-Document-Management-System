import React from 'react';

function DocumentList({ documents }) {
  return (
    <div>
      <h2>Uploaded Documents</h2>
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>{doc}</li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentList;