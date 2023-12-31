import React, { useState } from 'react';
import './App.css';
import UploadForm from './components/UploadForm';
import DocumentList from './components/DocumentList';

function App() {
  const [updateList, setUpdateList] = useState(false);

  const handleUploadComplete = () => {
    setUpdateList(!updateList); // 切换状态以触发文档列表的更新
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CloudDocHub</h1>
      </header>
      <UploadForm onUploadComplete={handleUploadComplete} />
      <DocumentList key={updateList} />
    </div>
  );
}

export default App;