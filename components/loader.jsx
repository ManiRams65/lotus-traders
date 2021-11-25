export default function Loader({ text }) {
    return (
        <div className="fixed w-screen h-screen top-0 left-0 z-50 bg-gray-800 bg-opacity-50 text-white flex items-center justify-center">
            <img src="/eclipse.svg" alt="loader" className="h-20 w-20 mr-4" />
            <span>{text}</span>
        </div>
    )
}