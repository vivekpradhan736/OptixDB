import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { actionsDropdownItems } from "../constants";
import { constructDownloadUrl } from "../lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FileDetails, ShareInput } from "./ActionsModalContent";
import { Link, useLocation } from "react-router-dom";

const extractFileName = (fullName) => {
  const lastDotIndex = fullName.lastIndexOf(".");
  return lastDotIndex !== -1 ? fullName.slice(0, lastDotIndex) : fullName;
};

const ActionDropdown = ({ file }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState(null);
  const [name, setName] = useState(extractFileName(file?.filename));
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState([]);

  const location = useLocation(); 
  const path = location.pathname;

  const downloadFile = (url, filename) => {
  const link = document.createElement("a");
  link.href = url; // or blob URL
  link.download = filename; // optional: suggest filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file?.filename);
    //   setEmails([]);
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    // const actions = {
    //   rename: () =>
    //     renameFile({ fileId: file.$id, name, extension: file.extension, path }),
    //   share: () => updateFileUsers({ fileId: file.$id, emails, path }),
    //   delete: () =>
    //     deleteFile({ fileId: file.$id, bucketFileId: file.bucketField, path }),
    // };

    // success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();

    setIsLoading(false);
  };

  const handleRemoveUser = async (email) => {
    const updatedEmails = emails.filter((e) => e !== email);

    // const success = await updateFileUsers({
    //   fileId: file.$id,
    //   emails: updatedEmails,
    //   path,
    // });

    // if (success) setEmails(updatedEmails);
    closeAllModals();
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <div className="flex items-center gap-2">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          {value === "rename" && (
            <p className="text-sm text-gray-500">
              .{file?.type ? file.type.split("/")[1] : "No extension"}
            </p>
          )}
            </div>
          )}

          {value === "details" && <FileDetails file={file} />}
          {value === "share" && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}
          {value === "delete" && (
            <p className="delete-confirmation">
              Are you sure you want to delete{` `}
              <span className="delete-file-name">{file.filename}</span>?
            </p>
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAllModals} className="modal-cancel-button">
              Cancel
            </Button>
            <Button onClick={handleAction} className="modal-submit-button">
              <p className="capitalize">{value}</p>
              {isLoading && (
                <img
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <img
            src="/assets/icons/dots.svg"
            alt="dots"
            width={34}
            height={34}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {file.filename}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction(actionItem);

                if (
                  ["rename", "share", "delete", "details"].includes(
                    actionItem.value,
                  )
                ) {
                  setIsModalOpen(true);
                }
              }}
            >
              {actionItem.value === "download" ? (
                <div onClick={() => downloadFile(file.url, file.filename)} className="flex items-center gap-2">
                    <img
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
  {actionItem.label}
</div>
              ) : (
                <div className="flex items-center gap-2">
                  <img
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
};
export default ActionDropdown;