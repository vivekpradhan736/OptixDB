import { CheckCheck, ChevronUp, Copy, Info, KeyRound } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Button } from './ui/button'
import { useSelector } from 'react-redux'

const GetApiKey = () => {
    const [productEnvironmentCollapsed, setProductEnvironmentCollapsed] = useState(false)
    const { user, token } = useSelector((state) => state.auth); 
    const [copied, setCopied] = useState(false);

    console.log("user",user)

    const handleCopy = (content) => {
      navigator.clipboard.writeText(content)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    };
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg">
          <div
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => setProductEnvironmentCollapsed(!productEnvironmentCollapsed)}
          >
            <h2 className="text-xl font-semibold text-gray-800">Product Environment</h2>
            <ChevronUp
              className={`h-5 w-5 text-gray-500 transition-transform ${productEnvironmentCollapsed ? "rotate-180" : ""}`}
            />
          </div>

          {!productEnvironmentCollapsed && (
            <div className="p-6 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Cloud name</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-900">{user?.cloudName}</span>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => handleCopy(user?.cloudName)}>
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                    <Dialog>
        <DialogTrigger asChild>
                    <button className="bg-[#fa7275] hover:bg-[#ea6365] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">Get API Keys</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center">
                <KeyRound className="text-black" strokeWidth={2} />
                <h1 className=''>Your API Key</h1>
                </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 my-4">
            <div className="grid gap-3">
                <div className="bg-[#f9fafb] hover:bg-[#ebebeb] flex justify-between group cursor-pointer text-[#ea6365] p-4 rounded-lg font-mono text-sm">
                                      {user.apiKey}
                                      <button onClick={() => handleCopy(user.apiKey)} className=" text-black hover:bg-[#ffffff] px-2 rounded-md">{copied ? "Copied" : "Copy"} {copied ? (<CheckCheck className="inline w-3 h-4 text-[#1ca25a]" strokeWidth={2} />) : (<Copy className="inline w-3 h-4" strokeWidth={2} />)}</button>
                                    </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="bg-[#fa7275] hover:bg-[#ea6365] text-white hover:text-white">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Folder mode</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-900">Fixed folders</span>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
  )
}

export default GetApiKey
