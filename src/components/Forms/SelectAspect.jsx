import { useEffect, useRef, useState } from "react";
import { useAspectData } from "../context/AspectsDataContext";

export default function SelectAspectSaC({ onSelectionChange, initialValues = {} }) {
  const { aspects, subAspects, categories, fetchAspects, fetchSubAspects, fetchCategories } = useAspectData();

  const [aspectId, setAspectId] = useState("");
  const [subAspectId, setSubAspectId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const initialized = useRef(false);
  const hasInitialAspect = useRef(!!initialValues.aspectId);

  useEffect(() => {
    fetchAspects();

    if (initialValues.aspectId) {
      fetchSubAspects(initialValues.aspectId).then(() => {
        if (initialValues.subAspectId) {
          fetchCategories(initialValues.subAspectId);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!initialized.current && initialValues.aspectId) {
      setAspectId(initialValues.aspectId);
      setSubAspectId(initialValues.subAspectId || "");
      setCategoryId(initialValues.categoryId || "");
      setCategoryName(initialValues.categoryName || "");
      initialized.current = true;
    }
  }, [initialValues]);

  useEffect(() => {
    if (hasInitialAspect.current) return;

    if (aspectId) {
      fetchSubAspects(aspectId);
      setSubAspectId("");
      setCategoryId("");
    }
  }, [aspectId]);

  useEffect(() => {
    if (hasInitialAspect.current) return;

    if (subAspectId) {
      fetchCategories(subAspectId);
      setCategoryId("");
    }
  }, [subAspectId]);

  useEffect(() => {
    if (aspectId && hasInitialAspect.current) {
      hasInitialAspect.current = false;
    }
  }, [aspectId]);

  useEffect(() => {
    onSelectionChange({ aspectId, subAspectId, categoryId, categoryName });
  }, [aspectId, subAspectId, categoryId, categoryName, onSelectionChange]);

  return (
    <div className="space-y-3">
      {/* Aspect */}
      <div className="relative flex items-center">
        <img src="/assets/Aspect.png" alt="Icon" className="absolute left-2 h-6 w-4 md:h-7" />
        <select
          className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none"
          value={aspectId}
          onChange={(e) => setAspectId(e.target.value)}
          disabled={aspects.length === 0}
        >
          <option value={""} disabled>
            {aspects.length ? "Aspect" : "No Aspect"}
          </option>
          {(aspects || []).map((aspect, index) => (
            <option key={index} value={aspect.id}>{aspect.name}</option>
          ))}
        </select>
      </div>

      {/* Sub-aspect */}
      <div className="relative flex items-center">
        <img src="/assets/Sub-Aspect.png" alt="Icon" className="absolute left-2 h-6 w-4 md:h-7" />
        <select
          className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none"
          value={subAspectId}
          onChange={(e) => setSubAspectId(e.target.value)}
          disabled={!aspectId}
        >
          <option value="" disabled>Sub-aspect</option>
          {(subAspects[aspectId] || []).map((subAspect) => (
            <option key={subAspect.id} value={subAspect.id}>
              {subAspect.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className="relative flex items-center">
        <img
          src="/assets/Category.png"
          alt="Icon"
          className="absolute left-2 h-4 w-4"
        />

        <select
          className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none"
          value={categoryId}
          onChange={(e) => {
            const selectedId = e.target.value;
            const selectedName = e.target.options[e.target.selectedIndex].text;
            setCategoryId(selectedId);
            setCategoryName(selectedName);
          }}
          disabled={!subAspectId}
        >
          <option value="" disabled>Category</option>
          {(categories[subAspectId] || []).map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}