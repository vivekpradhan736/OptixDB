import { Cloud, EllipsisVertical, Folder, FolderPlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createFolder, fetchFolders } from '../redux/folderSlice';
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { toast } from 'sonner';
import { Separator } from './ui/separator';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const Folders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { folders, status: folderStatus } = useSelector((state) => state.folders);
    const { files } = useSelector((state) => state.files);
    const [folderName, setFolderName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await dispatch(createFolder({ name: folderName })).unwrap();
          toast.success(`${folderName} folder created successfully`);
          setFolderName("");
        } catch (err) {
          toast.error(`Failed to create folder ${folderName}`, {
            description: err,
          });
        }
    }

    useEffect(() => {
    dispatch(fetchFolders());
  }, [dispatch]);

  const handleFolderClick = (id) => {
    navigate(`/folders/${id}`);
  };

  return (
    <div>
      <div className='flex gap-3 items-baseline'>
        <div className='flex gap-2'>
            <Cloud strokeWidth={1} className='w-5 h-6'/>
            <h1 className='font-semibold'>Home</h1>
        </div>
        <button className='hover:bg-[#e1e1e2] size-6 px-1 rounded'><EllipsisVertical strokeWidth={1}  className='w-4 h-4'/></button>
        <Dialog>
      <form>
        <DialogTrigger asChild>
        <button className='hover:bg-[#e1e1e2] size-6 px-1 rounded'><FolderPlus strokeWidth={1} className='w-[1.10rem] h-5'/></button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center">
                <Folder strokeWidth={2} className='w-[1.10rem] h-4' />
                <h1 className=''>Add Folder</h1>
                </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 my-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Folder Name</Label>
              <Input id="name-1" name="name" placeholder="Enter the folder name" value={folderName} onChange={(e) => setFolderName(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-[#ea6365] hover:bg-[#a33f41]" onClick={(e) => handleSubmit(e)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
      </div>
      <Separator className="mt-3"/>


      <div className='flex flex-col gap-3 max-h-[579px] overflow-y-auto remove-scrollbar'>
      <div className='px-5 py-3'>
        <h1 className='text-[0.83rem] font-semibold font-sans'>Showing {folders?.length} {folders?.length > 1 ? "folders" : "folder"} and {files?.length} {files?.length > 1 ? "assets" : "asset"}</h1>
      </div>

        <div className='file-list px-5 pb-4'>
            {
               folders?.length > 0 ? folders?.map((folder) => (
                <div key={folder._id} className='flex justify-between items-center w-full py-2.5 px-4 cursor-pointer rounded-lg bg-[#ffffff] shadow-sm transition-all hover:shadow-drop-3' onClick={() => handleFolderClick(folder._id)}>
                    <div className='flex justify-center items-center gap-2'>
                        <Folder strokeWidth={2} className='w-3.5 h-3.5'/>
                        <h1 className='text-[0.83rem] font-medium'>{folder.name}</h1>
                    </div>
                    <button className='hover:bg-[#f6e2e4] size-6 px-1 rounded'><EllipsisVertical strokeWidth={1}  className='w-4 h-4'/></button>
                </div>
               )) : (
                <div className='flex gap-2 items-center'>
                    <h1 className='text-[0.83rem]'>No folders found</h1>
                </div>
               ) 
            }
        </div>
        <div>
            {files.length > 0 ? (
        <section className="file-list px-5">
          {files.map((file) => (
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

export default Folders;
