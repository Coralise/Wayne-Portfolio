export default function Tag({ children }) {
    return (
        <div className="py-0.5 px-2 rounded-lg bg-gray-700 w-fit h-fit text-sm select-none">
            {children}
        </div>
    );
}