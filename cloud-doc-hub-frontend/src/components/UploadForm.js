import React, { useState } from 'react';

function UploadForm({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploadStatus('');

    if (file) {
      const base64 = await toBase64(file).catch(error => {
        console.error('Error converting file to base64:', error);
        return;
      });

      if (!base64) {
        setUploadStatus('File conversion to base64 failed');
        return;
      }

      const data = JSON.stringify({
        file_name: file.name,
        file_content: base64
      });

      fetch('https://rgdooz55o2.execute-api.us-east-2.amazonaws.com/dev/upload', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json'  
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUploadStatus('File uploaded successfully!');
        onUploadComplete(); // 通知父组件上传完成
      })
      .catch((error) => {
        console.error('Error:', error);
        setUploadStatus('Error uploading file.');
      });

      setFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </form>
  );
}

export default UploadForm;
