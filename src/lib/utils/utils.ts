import { createHash } from 'crypto';

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

interface IHash {
  fullId: string;
  id: string;
}

/**
 * @summary Generate the same id (hash) for the same string
 * @param str - String to be hashed
 * @param size - Size of the hash
 * size can be positive or negative
 * - positive: the id will be the first size characters
 * - negative: the id will be the last size characters
 * @returns fullId: string; id: string;
 * - fullId: the full hash
 * - id: the hash resized according to the size parameter
 */
export const generateUniqueId = (str: string, size = 8): IHash => {
  if (!size) throw new Error('Size must not be 0');
  const decideStart = () => (size > 0 ? [0, size] : [size]);
  const fullId = createHash('sha256').update(str).digest('hex');
  return { fullId, id: fullId.slice(...decideStart()) };
};

/**
 * Generate an ID {@link generateUniqueId} prefixed by KT standing for KENITRA
 *
 * Exemple:
 *
 *```js
 *  const {id, fullId} = generateKTId('test', -8)
 *  console.log(fullId) // 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
 *  console.log(id) // KTb0f00a08
 * // or
 *  const {id, fullId} = generateKTId('test', 8)
 *  console.log(fullId) // 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
 *  console.log(id) // KT9f86d08
 *```
 * */
export const generateKTId = (str: string, size = -8) => {
  const { fullId, id } = generateUniqueId(str, size);
  return { id: `KT${id}`, fullId };
};
