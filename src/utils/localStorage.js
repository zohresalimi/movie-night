export const setLocalStorage = (name, state) => {
  localStorage.setItem(name, JSON.stringify(state));
};

export const getLocalStorage = () => {
  const cachedState = localStorage.getItem("movieNight") || "{}";
  return JSON.parse(cachedState);
};
