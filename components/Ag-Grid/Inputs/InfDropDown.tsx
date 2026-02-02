"use client";
import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";

const IngredientDropDownEditor = forwardRef((props: any, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const highlightRef = useRef(0);

  const [value, setValue] = useState(props.value || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  // Expose value to AG Grid
  useImperativeHandle(ref, () => ({
    getValue: () => value,
    isCancelAfterEnd: () => false,
  }));

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    // Use a slight delay to ensure the DOM is ready
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        // Select the text so the user can immediately type over it
        inputRef.current.select();
      }
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  // 🔎 Filter ingredients
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typed = e.target.value;
    setValue(typed);

    if (typed.length < 2) {
      setShowDropdown(false);
      return;
    }

    const filtered = props.context.allIngredients.filter((ing: any) =>
      ing.name.toLowerCase().includes(typed.toLowerCase()),
    );
    setSuggestions(filtered);
    setShowDropdown(true);
    setHighlightIndex(0);
    highlightRef.current = 0;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) {
      if (e.key === "Enter" || e.key === "Tab") {
        return;
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex =
        highlightRef.current < suggestions.length - 1
          ? highlightRef.current + 1
          : highlightRef.current;

      highlightRef.current = newIndex;
      setHighlightIndex(newIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = highlightRef.current > 0 ? highlightRef.current - 1 : 0;

      highlightRef.current = newIndex;
      setHighlightIndex(newIndex);
    } else if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      e.stopPropagation();

      const selected = suggestions[highlightRef.current];

      if (selected) {
        selectIngredient(selected);
      } else {
        finish();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setShowDropdown(false);
      props.stopEditing(true);
    }
  };

  const selectIngredient = (ingredient: any) => {
    setValue(ingredient.name);

    props.context.updateRowData((prev: any[]) =>
      prev.map((row: any, index: number) => {
        if (index !== props.node.rowIndex) return row;
        return {
          ...row,
          name: ingredient.name,
          role: ingredient.role,
          physicalChar: ingredient.physicalChar,
          flash_point: ingredient.flash_point,
          quantity: ingredient.quantity,
        };
      }),
    );

    setShowDropdown(false);

    props.stopEditing(false);
  };

  const finish = () => {
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      props.context.updateRowData((prev: any[]) =>
        prev.filter((_: any, index: number) => index !== props.node.rowIndex),
      );
    }
    props.stopEditing();
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(finish, 150)}
        // Added styling to make it fill the cell and look professional
        className="w-full h-full px-3 py-2 mt-1 text-sm text-gray-900 bg-white outline-none border-none placeholder-gray-400"
        placeholder="Search ingredient..."
      />

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute left-0 mt-2 z-50 w-72 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-100">
          {/* Optional Header - makes it feel like a real app */}
          <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50 border-b">
            Ingredients
          </div>

          <div className="max-h-60 overflow-y-auto">
            {suggestions.map((item, index) => (
              <li
                key={item.name}
                onMouseDown={() => selectIngredient(item)}
                className={`px-3 py-2.5 cursor-pointer flex flex-col gap-0.5 transition-colors border-l-2 ${
                  index === highlightIndex
                    ? "bg-blue-50 border-blue-600"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm font-semibold ${index === highlightIndex ? "text-blue-700" : "text-gray-900"}`}
                  >
                    {item.name}
                  </span>
                  {/* Tag for the role */}
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      index === highlightIndex
                        ? "bg-blue-200 text-blue-800"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.role}
                  </span>
                </div>

                {/* Secondary Info Line */}
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <span>{item.physicalChar}</span>
                  {item.flash_point && (
                    <>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>FP: {item.flash_point}°C</span>
                    </>
                  )}
                </div>
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
});

export default IngredientDropDownEditor;
