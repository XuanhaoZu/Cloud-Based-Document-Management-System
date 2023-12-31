import React, { useState } from 'react';

function UploadForm({ onAddDocument }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (file) {
      const base64 = await toBase64(file).catch(error => {
        console.error('Error converting file to base64:', error);
        return;
      });
  
      if (!base64) {
        // 如果文件没有成功转换为 base64，就不继续执行
        console.error('File conversion to base64 failed');
        return;
      }
  
      // 构建请求体
      const data = JSON.stringify({
        file_name: file.name,
        file_content: base64
      });
  
      // 发送 POST 请求到您的 Lambda 函数的 API 网关 URL
      fetch('https://rgdooz55o2.execute-api.us-east-2.amazonaws.com/dev/upload', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json'  
        }
      })
      .then(response => {
        if (!response.ok) {
          // 如果响应状态码不是 2xx, 抛出错误
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        onAddDocument(file.name); // 文件上传后添加到列表
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
      setFile(null);
    }
  };
  

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // 将文件转换为Base64格式的函数
  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadForm;
