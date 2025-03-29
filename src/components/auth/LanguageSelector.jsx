import React, { memo, useMemo } from 'react';

const LanguageSelector = memo(() => {
  const languages = useMemo(() => [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' }
  ], []);

  return (
    <div className="absolute top-4 right-6 z-50 flex justify-center items-center">
      <img 
        src="/Global.png" 
        alt="Language" 
        className="w-6 h-6 object-contain"
        loading="lazy"
      />
      <select className="bg-transparent px-2 py-2 text-sm text-gray-600 focus:outline-none">
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default LanguageSelector;