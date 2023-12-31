import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);

    const fetchDocuments = () => {
        axios.get('https://ognqmkerw1.execute-api.us-east-2.amazonaws.com/dev/retrieve')
            .then(response => {
                const docList = JSON.parse(response.data.body);
                setDocuments(docList);
            })
            .catch(error => {
                console.error('There was an error fetching the documents: ', error);
            });
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <div>
            <h2>Document List</h2>
            <ul>
                {documents.map((doc, index) => (
                    <li key={index}>
                        {doc.name} - Uploaded on {doc.last_modified}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DocumentList;
