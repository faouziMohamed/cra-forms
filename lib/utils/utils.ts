export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmail = (email: string) => emailRegex.test(email);

export const startCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const startCaseAll = (str: string) => str.replace(/\w\S*/g, startCase);
export const removeExtraSpaces = (str: string) => str.replace(/\s+/g, ' ');
export const capitalize = (str: string) => startCase(str);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PostFC = <D = any>(url: string, data: D) => Promise<any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postData: PostFC = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const { error } = <{ error: string }>await response.json();
    return { error };
  }

  if (response.status === 201) {
    const { message } = <{ message: string }>await response.json();
    return { message };
  }

  return response.json();
};
