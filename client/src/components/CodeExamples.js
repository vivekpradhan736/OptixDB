import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCheck, Copy, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";

const CodeExamples = ({selectedSDK}) => {
    console.log("selectedSDK Vivek",selectedSDK)

    const nodeCode = `// Required dependencies
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

// Replace with your actual API key and file path
const API_KEY = 'your-api-key-here';
const FILE_PATH = path.join(__dirname, 'example.jpg'); // Replace with the actual file path

// Optional folder name or folderId
const folderName = 'my-folder'; // or leave blank ''

// Create form data
const formData = new FormData();
formData.append('file', fs.createReadStream(FILE_PATH));
if (folderName) formData.append('folder', folderName);

// Make the POST request
axios.post('https://optixdb-backend.onrender.com/api/file/upload', formData, {
  headers: {
    ...formData.getHeaders(),
    Authorization: \`Bearer \${apiKey}\`,
  },
})
.then(response => {
  console.log('✅ File uploaded successfully:', response.data);
})
.catch(error => {
  console.error('❌ Upload failed:', error.response?.data || error.message);
});
`;

  const reactCode = `const uploadFile = async () => {
  const file = fileInput?.files[0];
  if (!file) {
    console.error('No file selected');
    return;
  }

  const apiKey = 'your-api-key-here'; // Replace with your actual API key
  const folderName = 'my-folder';     // Optional: set folder name

  const formData = new FormData();
  formData.append('file', file);
  if (folderName) formData.append('folder', folderName);

  try {
    const response = await fetch('https://optixdb-backend.onrender.com/api/file/upload', {
      method: 'POST',
      headers: {
        Authorization: \`Bearer \${apiKey}\`,
      },
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Upload failed');
    }

    console.log('File uploaded successfully:', result);
  } catch (error) {
    console.error('Error uploading file:', error.message);
  }
};

`;

const nextCode = `import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    if (!file) return alert('Please select a file first');

    const apiKey = 'your-api-key-here'; // Replace with your actual API key
    const folderName = 'my-folder';     // Optional

    const formData = new FormData();
    formData.append('file', file);
    if (folderName) formData.append('folder', folderName);

    try {
      const res = await fetch('https://optixdb-backend.onrender.com/api/file/upload', {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${apiKey}\`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');

      setStatus('✅ File uploaded successfully');
      console.log(data);
    } catch (err) {
      console.error(err);
      setStatus(\`❌ \${err.message}\`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-semibold">Upload File</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {status && <p>{status}</p>}
    </div>
  );
}
`;

const pythonCode = `import requests

# Replace with your actual API key and file path
api_key = "your-api-key-here"
file_path = "path/to/your/file.jpg"  # Update this to your actual file
folder_name = "my-folder"  # Optional

# API endpoint
url = "https://optixdb-backend.onrender.com/api/file/upload"

# Prepare the file and form data
with open(file_path, "rb") as file:
    files = {
        "file": (file_path, file, "application/octet-stream")
    }
    data = {}
    if folder_name:
        data["folder"] = folder_name

    headers = {
        "Authorization": f"Bearer {api_key}"
    }

    try:
        response = requests.post(url, headers=headers, files=files, data=data)
        response.raise_for_status()
        print("✅ Upload successful!")
        print("Response:", response.json())
    except requests.exceptions.HTTPError as err:
        print("❌ Upload failed:", err)
        print("Details:", response.text)
`;

const [activeTab, setActiveTab] = useState(selectedSDK);
const [copied, setCopied] = useState(false);

const handleCopy = () => {
      navigator.clipboard.writeText(activeTab)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-[#fa7275] text-white rounded-full flex items-center justify-center font-bold">
          3
        </div>
        <div className="flex justify-between w-full items-center">
        <h2 className="text-lg font-medium text-gray-900">Upload, Optimize and Transform</h2>
        <div className="flex gap-2">
            <Link to="/api-key" >
                  <Button size="sm" className="bg-[#fa7275] hover:bg-[#ea6365]"> <KeyRound className="text-white" strokeWidth={1} />
                    View API Keys
                  </Button>
                  </Link>
                </div>
        </div>
      </div>

      <div className="flex items-stretch gap-10">
      <div className=" w-[0.10rem] self-stretch ml-5 border border-dashed border-[#d1d6e0]"></div>

      <Card className="overflow-hidden group">
        
        <div className="px-4">
            {(() => {
              switch (selectedSDK) {
                case "nodejs":
                  return (
                    <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">index.js</Badge>
                <button onClick={handleCopy} className="group-hover:block block sm:hidden text-black text-sm font-normal hover:bg-[#e2e2e2] px-2 rounded">{copied ? "Copied" : "Copy"} {copied ? (<CheckCheck className="inline w-3 h-4 text-[#1ca25a]" strokeWidth={2} />) : (<Copy className="inline w-3 h-4" strokeWidth={2} />)}</button>
              </div>
              <div className="bg-gray-900 text-gray-300 p-6 rounded-lg overflow-auto">
                <pre className="text-sm leading-relaxed">
                  <code>{nodeCode}</code>
                </pre>
              </div>
            </div>
                  );
                case "react":
                    return (
                    <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">App.js</Badge>
                <button onClick={handleCopy} className="group-hover:block block sm:hidden text-black text-sm font-normal hover:bg-[#e2e2e2] px-2 rounded">{copied ? "Copied" : "Copy"} {copied ? (<CheckCheck className="inline w-3 h-4 text-[#1ca25a]" strokeWidth={2} />) : (<Copy className="inline w-3 h-4" strokeWidth={2} />)}</button>
              </div>
              <div className="bg-gray-900 text-gray-300 p-6 rounded-lg overflow-auto">
                <pre className="text-sm leading-relaxed">
                  <code>{reactCode}</code>
                </pre>
              </div>
            </div>
                  );
                case "nextjs":
                    return (
                    <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">page.jsx</Badge>
                <button onClick={handleCopy} className="group-hover:block block sm:hidden text-black text-sm font-normal hover:bg-[#e2e2e2] px-2 rounded">{copied ? "Copied" : "Copy"} {copied ? (<CheckCheck className="inline w-3 h-4 text-[#1ca25a]" strokeWidth={2} />) : (<Copy className="inline w-3 h-4" strokeWidth={2} />)}</button>
              </div>
              <div className="bg-gray-900 text-gray-300 p-6 rounded-lg overflow-auto">
                <pre className="text-sm leading-relaxed">
                  <code>{nextCode}</code>
                </pre>
              </div>
            </div>
                  );
                case "python":
                    return (
                    <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">main.py</Badge>
                <button onClick={handleCopy} className="group-hover:block block sm:hidden text-black text-sm font-normal hover:bg-[#e2e2e2] px-2 rounded">{copied ? "Copied" : "Copy"} {copied ? (<CheckCheck className="inline w-3 h-4 text-[#1ca25a]" strokeWidth={2} />) : (<Copy className="inline w-3 h-4" strokeWidth={2} />)}</button>
              </div>
              <div className="bg-gray-900 text-gray-300 p-6 rounded-lg overflow-auto">
                <pre className="text-sm leading-relaxed">
                  <code>{pythonCode}</code>
                </pre>
              </div>
            </div>
                  );
                default:
                  return null;
              }
            })()}
        </div>
      </Card>
      </div>
    </div>
  );
};

export default CodeExamples;