// AutoCompleteChips.tsx
import React, { useState, useEffect, useRef, KeyboardEvent, FocusEvent, ChangeEvent } from 'react';

interface Chip {
  id: number;
  label: string;
  icon: string;
}

const AutoCompleteChips: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<Chip[]>([]);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const items: Chip[] = [
    { id: 1, label: 'Nick Giannopoulos', icon: './icon.jpeg' },
    { id: 2, label: 'John Doe', icon: './icon.jpeg' },
    { id: 3, label: 'Jane Smith', icon: './icon.jpeg' },
    { id: 4, label: 'Alice Johnson', icon: './icon.jpeg' },
    { id: 5, label: 'shubh singh', icon: './icon.jpeg' },
    { id: 6, label: 'shahsi', icon: './icon.jpeg' },
    { id: 6, label: 'Priya', icon: './icon.jpeg' },
  ];

  useEffect(() => {
    setFilteredItems(
      items.filter(
        (item) =>
          !chips.find((chip) => chip.label === item.label) &&
          item.label.toLowerCase().startsWith(inputValue.toLowerCase())
      )
    );
  }, [chips, items, inputValue, isInputFocused]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsInputFocused(true);
  };

  const handleItemClick = (item: Chip) => {
    setChips((prevChips) => [...prevChips, { id: Date.now(), label: item.label, icon: item.icon }]);
    setInputValue('');
    setIsInputFocused(true);
    inputRef.current?.focus();
  };

  const handleChipRemove = (id: number) => {
    setChips((prevChips) => prevChips.filter((chip) => chip.id !== id));
    setIsInputFocused(true);
    inputRef.current?.focus();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !inputValue && chips.length > 0) {
      // Highlight the last chip
      inputRef.current?.blur();
      const lastChip = chips[chips.length - 1];
      alert(`Highlighted: ${lastChip.label}`);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    // Delay hiding the list to allow clicking on the list items
    setTimeout(() => {
      if (listRef.current && !listRef.current.contains(event.relatedTarget as Node)) {
        setIsInputFocused(false);
      }
    }, 200);
  };

  const handleListClick = (event: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (event.target instanceof HTMLLIElement) {
     // const clickedItem = filteredItems.find((item) => item.label === event.target.innerText);
      const clickedItem = filteredItems.find((item) => item.label === (event.target as HTMLLIElement).innerText);
      if (clickedItem) {
        handleItemClick(clickedItem);
      }
    }
    setIsInputFocused(true);
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center w-full mt-3 " >
        {chips.map((chip) => (
          <div key={chip.id} className="bg-slate-400 text-black text-white font-bold py-1 px-2 w-fit mr-3 rounded-full flex  justify-center items-center">
            <img src={chip.icon} alt="Profile Icon" className="w-5 rounded-full mr-2 "  />
            <span className="text-sm" >{chip.label}</span>
            <button onClick={() => handleChipRemove(chip.id)} className="ml-2">&times;</button>
          </div>
        ))}
      </div>
      <input
      className="mt-5 w-60 p-2 text-sm border-b-2  outline-none opacity-50 border-blue-400"
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Add a new user..."

      />
      {isInputFocused && (
          <ul ref={listRef} className="shadow-2xl  p-2" onClick={handleListClick}>
          {filteredItems.map((item) => (
            <li key={item.id} className="cursor-pointer   pt-2 pb-2 pl-3 pr-3 flex hover:bg-sky-700">
              <img src={item.icon} alt="Profile Icon"  className="w-7 rounded-full mr-3" />
              {item.label}
            </li>
          ))}
        </ul>
      )}

    </div>
    
  );
};

export default AutoCompleteChips;
