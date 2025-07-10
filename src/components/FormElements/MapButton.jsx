import { Icon } from '@iconify/react';

export default function MapButton({ onClick, icon, title = '', className = '' }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`absolute bg-white border border-gray-300 rounded p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      <Icon icon={icon} width="22" height="24" />
    </button>
  );
}
