// Check if a specific cookie exists
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  console.log("parts",parts)
  if (parts.length === 2) return parts.pop().split(';').shift();
  console.log("parts 2",parts)
  return null;
};

export const clearTokenCookie = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
};

// Check if the 'token' cookie exists
export const hasTokenCookie = () => {
  return !!getCookie('token');
};