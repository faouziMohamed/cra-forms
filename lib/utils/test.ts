import { createHash } from 'crypto';

export const generateUniqueId = (str: string, size = 8) => {
  if (!size) throw new Error('Size must not be 0');
  const decideStart = () => (size > 0 ? [0, size] : [size]);

  const fullId = createHash('sha256').update(str).digest('hex');
  return { fullId, id: fullId.slice(...decideStart()) };
};

export const generateKTId = (str: string, size = -8) => {
  const { fullId, id } = generateUniqueId(str, size);
  return { id: `KT${id}`, fullId };
};

console.log(generateKTId('test', -8));
console.log(generateUniqueId('tests.@', 78));
console.log(generateUniqueId('tests.@', -5));
console.log(generateUniqueId('tests.@', 0));

console.log('Faouzi'.slice(-1));
