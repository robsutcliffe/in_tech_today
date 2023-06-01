import {
    Square3Stack3DIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline'

export default function Header({ date }) {
    return (
            <div className="md:flex md:items-center md:justify-between bg-white p-6">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl leading-7 text-gray-800 flex gap-3 sm:truncate sm:text-3xl sm:tracking-tight">
                        <Square3Stack3DIcon className="h-8 w-8 m-1" /> Blog Summary <i>for</i> <b className="font-bold">{date}</b>
                    </h2>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <button
                        type="button"
                        className="rounded-md flex gap-2 bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-900"
                    >
                        <PencilSquareIcon className="h-5 w-5" /> Edit on Github
                    </button>
                </div>
            </div>
        )
}