import { Cloud } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFolders } from '../redux/folderSlice';
import { Separator } from './ui/separator';
import Card from './Card';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFolderFiles, toggleRefetch } from '../redux/fileSlice';
import axios from 'axios';

const SingleFolder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id }  = useParams();
    const { folderFiles, refetch: folderFilesRefetch, } = useSelector((state) => state.files);
    const [folderName, setFolderName] = useState("")

    useEffect(() => {
    (async () => {
    try {
      const data = await dispatch(fetchFolderFiles({ folderId: id })).unwrap();
      setFolderName(data.folderName)

      dispatch(toggleRefetch());
    } catch (err) {
      console.error("Error fetching folder files", err);
    }
  })();
  }, [dispatch, id, folderFilesRefetch]);

  const handleFolderBack = () => {
    navigate(`/folders`);
  };

  return (
    <div>
      <div className='flex gap-3 items-baseline'>
        <div className='flex gap-2 items-center'>
            <button className='hover:bg-[#e1e1e2] size-6 px-1 rounded-md'>
                <Cloud strokeWidth={1} className='w-5 h-6' onClick={() => handleFolderBack()}/>
            </button>
            <h1 className='text-xs font-semibold'>{`>`}</h1>
            <h1 className='font-semibold'>{folderName}</h1>
        </div>
      </div>
      <Separator className="mt-3"/>


      <div className='flex flex-col gap-3 max-h-[579px] overflow-y-auto remove-scrollbar'>
      <div className='px-5 py-3'>
        <h1 className='text-[0.83rem] font-semibold font-sans'>Showing {folderFiles?.length} {folderFiles?.length > 1 ? "assets" : "asset"}</h1>
      </div>
        <div>
            {folderFiles?.length > 0 ? (
        <section className="file-list px-5">
          {folderFiles.map((file) => (
            <Card key={file._id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
        </div>
      </div>
    </div>
  )
}

export default SingleFolder;
