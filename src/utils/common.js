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

const getServerURL = ({
  isProd = false,
  serverType = "lambda",
  returnObject = false,
  port = 7000,
} = {}) => {
  const connectToLambda = serverType === "lambda";
  const LAMBDA_PROD = "https://bubblegum-lambda.netlify.app/.netlify/functions";
  const HEROKU_PROD = "https://bubblegum-server.herokuapp.com";
  const LOCAL_SERVER = `http://localhost:${port}`;

  let baseURL;

  if (isProd) baseURL = connectToLambda ? LAMBDA_PROD : HEROKU_PROD;
  else baseURL = LOCAL_SERVER;

  const responseObj = {
    baseURL,
    serverURL: `${baseURL}/api`,
    graphqlURL: `${baseURL}/graphql`,
  };

  return returnObject ? responseObj : `${baseURL}/api`;
};

export { generateSlug, copyToClipboard, checkScrollAtBottom, getServerURL };
