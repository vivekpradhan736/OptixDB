import { Link, useLocation } from "react-router-dom";
import ActionDropdown from "./ActionDropdown";
import { Chart } from "./Chart";
import { FormattedDateTime } from "./FormattedDateTime";
import { Thumbnail } from "./Thumbnail";
import { Separator } from "./ui/separator";
import { convertFileSize, getUsageSummary } from "../lib/utils";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchFiles, fetchFileTypeSummary, fetchStorageUsage, setFiles } from '../redux/fileSlice.js';
import { toast } from "sonner";

const Dashboard = () => {
    const { user, token } = useSelector((state) => state.auth); 
    const dispatch = useDispatch();
    const { files } = useSelector((state) => state.files);
    const { storageUsage, status: storageUsageStatus, error: storageUsageError } = useSelector((state) => state.files);
    const { fileTypeSummary, status: fileTypeSummaryStatus, error: fileTypeSummaryError } = useSelector((state) => state.files);

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
        dispatch(fetchStorageUsage());
        dispatch(fetchFileTypeSummary());
      }
    }, [token, dispatch]);

  //   useEffect(() => {
  //   if (fileTypeSummaryStatus === 'failed' && fileTypeSummaryError) {
  //     toast.error('Failed to fetch file type summary', {
  //       description: fileTypeSummaryError,
  //     });
  //   }
  // }, [fileTypeSummaryStatus, fileTypeSummaryError]);

  //   useEffect(() => {
  //   if (storageUsageStatus === 'failed' && storageUsageError) {
  //     toast.error('Failed to fetch storage usage', {
  //       description: storageUsageError,
  //     });
  //   }
  // }, [storageUsageStatus, storageUsageError]);

  // Get usage summary
  const usageSummary = getUsageSummary(fileTypeSummary);

  return (
    <div className="dashboard-container">
      <section className="max-h-[620px] overflow-y-auto pr-2 remove-scrollbar">
  <Chart used={storageUsage.totalSize} total={storageUsage?.monthlyLimit} />

  {/* Uploaded file type summaries */}
  <ul className="dashboard-summary-list mt-4">
    {usageSummary.map((summary) => (
      <Link
        to={summary.url}
        key={summary.title}
        className="dashboard-summary-card"
      >
        <div className="space-y-4">
          <div className="flex justify-between gap-3">
            <img
              src={summary.icon}
              width={100}
              height={100}
              alt="uploaded"
              className="summary-type-icon"
            />
            <h4 className="summary-type-size">
              {convertFileSize(summary.size) || 0}
            </h4>
          </div>

          <h5 className="summary-type-title">{summary.title}</h5>
          <Separator className="bg-light-400" />
          <FormattedDateTime
            date={summary.latestDate}
            className="text-center"
          />
        </div>
      </Link>
    ))}
  </ul>
</section>


      {/* Recent files uploaded */}
<section className="h-full rounded-[20px] bg-white p-5 xl:p-8">
  <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>

  {files?.length > 0 ? (
    // 🔽 Add scroll container
    <div className="mt-5 max-h-[500px] overflow-y-auto pr-2 remove-scrollbar">
      <ul className="flex flex-col gap-5">
        {files?.map((file) => (
          <div
            key={file?._id}
            className="flex items-center gap-2 sm:gap-3 w-full p-2 sm:p-3 hover:bg-gray-100/70 rounded-lg transition-colors duration-200"
          >
            <Link
              to={file?.url}
              target="_blank"
              className="flex items-center flex-grow gap-2 sm:gap-3 min-w-0"
            >
              <div className="flex-shrink-0">
                <Thumbnail
                  type={file?.type.split("/")[0]}
                  extension={file.type.split("/")[1]}
                  url={file?.url}
                  className="w-10 h-10 sm:w-12 sm:h-12"
                  imageClassName="w-full h-full"
                />
              </div>

              <div className="flex flex-col flex-grow min-w-0">
                <p className="subtitletext-sm sm:text-base font-medium text-gray-900 truncate">
                  {file?.filename}
                </p>
                <FormattedDateTime
                  date={file?.uploadDate}
                  className="text-xs sm:text-sm text-gray-500"
                />
              </div>
            </Link>

            <div className="flex-shrink-0">
              <ActionDropdown file={file} />
            </div>
          </div>
        ))}
      </ul>
    </div>
  ) : (
    <p className="empty-list">No files uploaded</p>
  )}
</section>

    </div>
  );
};

export default Dashboard;