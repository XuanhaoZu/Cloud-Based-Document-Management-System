import React, { useState } from 'react';

function UploadForm({ onAddDocument }) {
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // 这里应该有代码来处理文件上传
    // 暂时我们只是将文件名添加到列表中
    if (file) {
      onAddDocument(file.name);
      setFile(null);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadForm;