import Thumbnail from "./Thumbnail";
import { convertFileSize } from "../lib/utils";
import FormattedDateTime from "./FormattedDateTime";
import ActionDropdown from "./ActionDropdown";
import { Link } from "react-router-dom";
import { getFileIcon } from "../lib/utils";
import { Separator } from "./ui/separator";

const Card = ({ file }) => {
    const isImage = file?.type.split("/")[0] === "image" && file?.type.split("/")[1] !== "svg";
  return (
    <Link to={file.url} target="_blank" className="file-card">
      <div className="w-[100%] relative">
        <figure className=" flex-center w-full overflow-hidden p-2 rounded-md">
              <img
                src={isImage ? file.url : getFileIcon(file?.type.split("/")[1], file?.type.split("/")[0])}
                alt="thumbnail"
                width={100}
                height={100}
                className="size-56 object-contain object-center"
              />
            </figure>

        <div className="absolute top-4 right-0">
          <ActionDropdown file={file} />
        </div>
      </div>
      <Separator />

      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{file.filename}</p>
        <FormattedDateTime
          date={file.uploadDate}
          className="body-2 text-light-100"
        />
        <p className="body-2">{convertFileSize(file.size)}</p>
      </div>
    </Link>
  );
};
export default Card;