import React from 'react';

function FilePreview({ file, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-3xl">
        <button onClick={onClose} className="text-red-500 mb-4">Close</button>
        {file.type.startsWith('image') ? (
          <img src={file.url} alt={file.filename} className="max-w-full max-h-[80vh]" />
        ) : (
          <video src={file.url} controls className="max-w-full max-h-[80vh]" />
        )}
        <p>{file.filename}</p>
        <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        <p>{file.type}</p>
        <p>{new Date(file.uploadDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default FilePreview;