
const MarkerForm = ({
    aspect,
    subAspects,
    selectedSubAspect,
    handleSubAspectChange,
    title,
    ButtonText,
    categories
}) => {
    return (
        <div>
            <div className="flex items-center mb-4 space-x-2 font-light">
                <img src="/assets/Marker.png" alt="Marker" className="h-6 w-6" />
                <span className="text-sm">{title}</span>
            </div>

            {/* Aspect input */}
            <div className="relative flex items-center">
                <img src="/assets/Aspect.png" alt="Icon" className="absolute left-2 h-4 w-4" />
                <input
                    type="text"
                    placeholder="Aspect"
                    value={aspect || ""}
                    readOnly
                    className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm text-gray-500 bg-gray-100 focus:outline-none"
                />
            </div>

            {/* Sub-aspect select */}
            <div className="relative flex items-center">
                <img src="/assets/Sub-Aspect.png" alt="Icon" className="absolute left-2 h-7 w-4" />
                <select
                    className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none"
                    value={selectedSubAspect}
                    onChange={handleSubAspectChange}
                    disabled={subAspects.length === 0}
                >
                    <option value="" disabled selected={!subAspects.length}>
                        {subAspects.length ? " Sub-aspect" : "No Sub-aspects"}
                    </option>
                    {subAspects.map((subAspect, index) => (
                        <option key={index} value={subAspect}>{subAspect}</option>
                    ))}
                </select>
            </div>
            <div className="relative flex items-center">
                <img
                    src="/assets/Category.png"
                    alt="Icon"
                    className="absolute left-2 h-4 w-4"
                />
                <select className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none">
                    <option>Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="relative flex items-center">
                <img
                    src="/assets/Pen.png"
                    alt="Icon"
                    className="absolute left-2 h-4 w-4"
                />
                <input
                    type="text"
                    placeholder="Location name"
                    className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm focus:outline-none"
                />
            </div>

            <div className="relative flex items-center">
                <img
                    src="/assets/Descrip.png"
                    alt="Icon"
                    className="absolute left-2 h-4 w-4"
                />
                <textarea
                    placeholder="Description"
                    className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none"
                ></textarea>
            </div>

            <div className="relative flex items-center mt-2">
                <img
                    src="/assets/Uplode.png"
                    alt="Upload"
                    className="absolute left-2 h-4 w-4"
                />
                <input
                    type="file"
                    className="relative flex items-center mt-2"
                    id="upload"
                    accept="image/*"
                    placeholder="Upload Image"
                    style={{ display: "none" }} // Hides the default file input
                />

                <label
                    htmlFor="upload"
                    className="absolute left-10 text-gray-500 text-sm mt-1 cursor-pointer"
                >
                    Upload Image
                </label>


            </div>
            <div className="flex space-x-2 mt-6">
                <button className="flex-1 py-2 bg-cyan-600 text-white rounded-full text-sm hover:bg-cyan-700">
                    {ButtonText}
                </button>
                <button className="flex-1 py-2 border border-cyan-600 text-cyan-600 rounded-full text-sm hover:bg-cyan-50">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default MarkerForm;
