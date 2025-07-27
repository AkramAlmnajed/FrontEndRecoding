import { Icon } from '@iconify/react';

export default function MapButton({ onClick, icon, title = '', className = '' }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`group absolute bg-white border border-gray-300 rounded p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${className}`}
    >
      <Icon icon={icon} width="20" height="20" className="md:w-5 md:h-5  group-hover:text-blue-500" />
    </button>
  );
}