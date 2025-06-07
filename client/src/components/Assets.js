import React, { useEffect } from "react";
import Sort from "./Sort";
import Card from "./Card";
import { convertFileSize, getFileTypesParams } from "../lib/utils";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles, setFiles } from '../redux/fileSlice.js';
import { useLocation } from "react-router-dom";

const Assets = ({ searchParams, params }) => {
    const { user, token } = useSelector((state) => state.auth); 
    const dispatch = useDispatch();
    const { files } = useSelector((state) => state.files);
    const { storageUsage} = useSelector((state) => state.files);

//   const type = ((await params)?.type) || "";
//   const searchText = ((await searchParams)?.query) || "";
//   const sort = ((await searchParams)?.sort) || "";

//   const types = getFileTypesParams(type);

//   const files = await getFiles({ types, searchText, sort });

  useEffect(() => {
        // const fetchFiles = async () => {
        //   try {
        //     const res = await axios.get('http://localhost:5000/api/file/files', {
        //       withCredentials: true,
        //     });
        //     dispatch(setFiles(res.data));
        //   } catch (err) {
        //     console.error(err);
        //   }
        // };
        if (token){
            dispatch(fetchFiles());
        }
      }, [token, dispatch]);

  return (
    <div className="page-container">
      <section className="w-full">
        {/* <h1 className="h1 capitalize">{type}</h1> */}

        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">{convertFileSize(storageUsage.totalSize)}</span>
          </p>
        </div>
      </section>

      {/* Render the files */}
      {files.length > 0 ? (
        <section className="file-list px-5 max-h-[550px] overflow-y-auto remove-scrollbar">
          {files.map((file) => (
            <Card key={file._id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default Assets;