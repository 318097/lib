import { useState } from "react";

/*
 * Custom hook to handle object states
 * @param {Object} initialState
 * @return {[Object, function, function]} -return a stateful value, updater & reset function
 */
const useObject = (initialState = {}) => {
  const [object, setObject] = useState(initialState);

  const setData = (update) => setObject((prev) => ({ ...prev, ...update }));

  const resetData = () => setObject(initialState);

  return [object, setData, resetData];
};

export default useObject;
