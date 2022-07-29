import { MdWarningAmber } from 'react-icons/md'

const NotSupported = () => {
  return (
    <div className="flex items-center rounded-md border border-transparent bg-red-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm">
      <MdWarningAmber className="mr-2 h-5 w-5" />
      Not Supported
    </div>
  )
}

export default NotSupported
