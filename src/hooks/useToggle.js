import { useState } from "react";

const useToggle = (initialState = false) => {
  const [visible, setVisibility] = useState(initialState);

  const toggle = () => setVisibility((prev) => !prev);

  const setToggleStatus = (value) => setVisibility(Boolean(value));

  return [visible, toggle, setToggleStatus];
};

export default useToggle;
