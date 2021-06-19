const generateSlug = ({ title = "", seperator = "-", prevSlug }) => {
  const slug = title
    .trim()
    .replace(/-/, " ")
    .replace(/\//, "-")
    .replace(/&/, "and")
    .replace(/[^a-zA-Z0-9\-\s]/gi, "")
    .replace(/\s+/gi, seperator)
    .toLowerCase();
  const timestamp = prevSlug
    ? prevSlug.split(seperator).pop()
    : new Date().getTime();

  return slug ? `${slug}${seperator}${timestamp}` : "";
};

const copyToClipboard = (text) => {
  const textField = document.createElement("textarea");
  textField.innerHTML = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
};

const checkScrollAtBottom = (node) => {
  const { scrollHeight, clientHeight, scrollTop } = node;
  return scrollHeight - clientHeight - scrollTop <= 1 && scrollTop > 0;
};

export { generateSlug, copyToClipboard, checkScrollAtBottom };
