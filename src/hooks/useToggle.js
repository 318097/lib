import { useState } from "react";

/*
 * Custom hook to toogle values
 * @param {Object} initialState
 * @returns {[boolean, function, function]} -return visibility status, toggle & set visibility functions
 */
const useToggle = (initialState = false) => {
  const [visible, setVisibility] = useState(initialState);

  const toggle = () => setVisibility((prev) => !prev);

  const setToggleStatus = (value) => setVisibility(Boolean(value));

  return [visible, toggle, setToggleStatus];
};

export default useToggle;
