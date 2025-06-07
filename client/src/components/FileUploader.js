import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { cn, convertFileToUrl, getFileType } from "../lib/utils";
import Thumbnail from "./Thumbnail";
import { MAX_FILE_SIZE } from "../constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../redux/fileSlice";
import { useLocation, useParams } from "react-router-dom";

const FileUploader = ({ className }) => {
  const location = useLocation(); 
    const pathname = location.pathname;
    const { id }  = useParams();
  const { user } = useSelector((state) => state.auth);
  const { status, error } = useSelector((state) => state.files); // Access status and error
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const validFiles = acceptedFiles.filter((file) => file.size <= MAX_FILE_SIZE);
      const invalidFiles = acceptedFiles.filter((file) => file.size > MAX_FILE_SIZE);

      // Show toast for oversized files
      if (invalidFiles.length > 0) {
        invalidFiles.forEach((file) =>
          toast.error(`${file.name} is too large`, {
            description: `Max file size is ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(2)} MB`,
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        );
      }

      setFiles(validFiles); // Only keep valid files in state

      // Upload valid files
      const uploadPromises = validFiles.map(async (file) => {
        try {
          if(id){
            await dispatch(uploadFile({ file, apiKey: user.apiKey, folderId: id })).unwrap();
          }
          else{
            await dispatch(uploadFile({ file, apiKey: user.apiKey })).unwrap();
          }
          toast.success(`${file.name} uploaded successfully`);
        } catch (err) {
          toast.error(`Failed to upload ${file.name}`, {
            description: err,
          });
        }
      });

      await Promise.all(uploadPromises);

      // Clear files after upload
      setFiles([]);
    },
    [dispatch, user, id]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (e, fileName) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  // Show error toast if upload fails
  // if (error && status === 'failed') {
  //   toast.error('Upload failed', {
  //     description: error,
  //   });
  // }

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn("uploader-button", className)}>
        <img src="/assets/icons/upload.svg" alt="upload" width={24} height={24} />
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100">Uploading</h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li key={`${file.name}-${index}`} className="uploader-preview-item">
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)} // Use local file URL for preview
                  />
                  <div className="preview-item-name">
                    {file.name}
                    <img
                      src="/assets/icons/file-loader.gif"
                      width={80}
                      height={26}
                      alt="Loader"
                    />
                  </div>
                </div>
                <img
                  src="/assets/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="Remove"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;

