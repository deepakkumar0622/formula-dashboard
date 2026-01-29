"use client";
import React, { useRef, useState, forwardRef } from "react";

const IngredientAutoCompleteEditor = forwardRef((props: any, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(props.value || "");
  const isDeleting = useRef(false);

  const getMatch = (text: string) => {
    if (text.length < 3) return null;
    return props.context.allIngredients.find((ing: any) =>
      ing.name.toLowerCase().startsWith(text.toLowerCase()),
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const typed = input.value;

    if (isDeleting.current) {
      setValue(typed);
      return;
    }

    const match = getMatch(typed);

    if (match && input.selectionStart === typed.length) {
      const fullMatch = match.name;
      setValue(fullMatch);

      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(typed.length, fullMatch.length);
        }
      });
    } else {
      setValue(typed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const input = inputRef.current!;
    isDeleting.current = e.key === "Backspace";

    if (e.key === "Backspace") {
      if (input.selectionStart !== input.selectionEnd) {
        e.preventDefault();
        const newValue = value.substring(0, input.selectionStart!);
        setValue(newValue);
      }
    }

    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      finish();
    }
  };

  const finish = () => {
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      props.context.updateRowData((prev: any[]) =>
        prev.filter((_, index) => index !== props.node.rowIndex),
      );
    } else {
      const ingredient = props.context.allIngredients.find(
        (ing: any) => ing.name.toLowerCase() === trimmedValue.toLowerCase(),
      );

      props.context.updateRowData((prev: any[]) =>
        prev.map((row: any, index: number) => {
          if (index !== props.node.rowIndex) return row;
          if (!ingredient) return { ...row, name: trimmedValue };
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
    }
    props.stopEditing();
  };

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={handleChange}
      className="w-full h-full px-2 outline-none bg-transparent"
      onKeyDown={handleKeyDown}
      onBlur={finish}
      autoFocus
    />
  );
});

export default IngredientAutoCompleteEditor;
