import React, { useState } from 'react';
import './App.css';
import UploadForm from './components/UploadForm';
import DocumentList from './components/DocumentList';

function App() {
  const [documents, setDocuments] = useState([]);

  const addDocument = (newDocument) => {
    setDocuments([...documents, newDocument]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CloudDocHub</h1>
      </header>
      <UploadForm onAddDocument={addDocument} />
      <DocumentList documents={documents} />
    </div>
  );
}

export default App;