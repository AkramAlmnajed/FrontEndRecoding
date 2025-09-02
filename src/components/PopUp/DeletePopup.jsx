
import { createPortal } from "react-dom";

export default function DeletePopup({ onDelete, onCancel }) {
    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Are you sure you want to delete this marker?
                </h2>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-4 mb-4 py-2 bg-cyan-600 text-white rounded-full text-sm font-medium hover:bg-cyan-700 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 mb-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}