import { useState } from "react";

const useObject = (initialState = {}) => {
  const [object, setObject] = useState(initialState);

  const setData = (update) => setObject((prev) => ({ ...prev, ...update }));

  const resetData = () => setObject(initialState);

  return [object, setData, resetData];
};

export default useObject;
