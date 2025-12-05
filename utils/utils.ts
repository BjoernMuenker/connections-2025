import { colors } from '~/content/colors';
import type { Color } from '~/types/Color';

export function shuffleArray<T>(a: Array<T>) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export function countOccurrences(arr: string[]): Record<string, number> {
  return arr.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

export function _countOccurrences(arr: string[]): { value: string; count: number }[] {
  const counts = arr.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

export function groupArrayByKey(array: any[], key: string) {
  return array.reduce((hash, obj) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {});
}

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) return { r: 0, b: 0, g: 0 };

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
};

export const hexToRgbString = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
};

export async function preloadImages(urls: string[]) {
  try {
    await Promise.all(urls.map((url) => preloadImage(url)));
    return true;
  } catch (e) {
    return false;
  }
}

function preloadImage(url: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => reject(new Error('unable to load image from url' + url));
  });
}

export function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function sortAlphabetically<T>(array: T[], direction: 'asc' | 'desc' = 'asc', path?: string) {
  const sorted = [...array].sort((a, b) => {
    const aVal = path ? getObjectValueByPath(a as { [key: string]: any }, path) : a;
    const bVal = path ? getObjectValueByPath(b as { [key: string]: any }, path) : b;
    return String(aVal).localeCompare(String(bVal));
  });

  return direction === 'asc' ? sorted : sorted.reverse();
}

export function sortNumerically<T>(array: T[], direction: 'asc' | 'desc' = 'asc', path?: string): any[] {
  return array.sort((a, b) => {
    if (direction === 'asc') {
      return path
        ? Number(getObjectValueByPath(a as { [key: string]: any }, path)) - Number(getObjectValueByPath(b as { [key: string]: any }, path))
        : Number(a) - Number(b);
    } else {
      return path
        ? Number(getObjectValueByPath(b as { [key: string]: any }, path)) - Number(getObjectValueByPath(a as { [key: string]: any }, path))
        : Number(b) - Number(a);
    }
  });
}

export function sumArray(array: any[], defaultValue = 0) {
  return array.reduce((a, b) => {
    return a + b;
  }, defaultValue);
}

export function sortObjectByCustomOrder<T extends Record<string, any>>(obj: T, order: string[]): T {
  const sorted: any = {};

  for (const key of order) {
    if (key in obj) {
      sorted[key] = obj[key];
    }
  }

  return sorted;
}

export function randomNumber(min: number, max: number, stepSize?: number) {
  if (!stepSize) return Math.floor(Math.random() * (max - min + 1) + min);
  return clamp(min, max, Math.round(Math.floor(Math.random() * (max - min + 1) + min) / stepSize) * stepSize);
}

export function probability(chance: number) {
  return !!chance && Math.random() <= chance;
}

export function getChanges(previous: any, current: any): any {
  // not required for this example but aid readability of the main function
  const typeOf = (o: any) => Object.prototype.toString.call(o);
  const isObject = (o: any) => o !== null && !Array.isArray(o) && typeOf(o).split(' ')[1].slice(0, -1) === 'Object';

  const isPrimitive = (o: any) => {
    switch (typeof o) {
      case 'object': {
        return false;
      }
      case 'function': {
        return false;
      }
      default: {
        return true;
      }
    }
  };

  if (isPrimitive(previous) && isPrimitive(current)) {
    if (previous === current) {
      return '';
    }

    return current;
  }

  if (isObject(previous) && isObject(current)) {
    const diff = getChanges(Object.entries(previous), Object.entries(current)) as any[];

    return diff.reduce((merged, [key, value]) => {
      return {
        ...merged,
        [key]: value,
      };
    }, {});
  }

  const changes: any[] = [];

  if (JSON.stringify(previous) === JSON.stringify(current)) {
    return changes;
  }

  for (let i = 0; i < current.length; i++) {
    const item = current[i];

    if (JSON.stringify(item) !== JSON.stringify(previous[i])) {
      changes.push(item);
    }
  }

  return changes;
}

export function getByProbability<T>(values: T[], probabilites: number[]) {
  const find = (arr: any[], x: number, start = 0, end = arr.length) => {
    if (end < start) return -1;
    else if (end == start) return end;
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] === x) return mid + 1;
    else if (arr[mid] < x) return find(arr, x, mid + 1, end);
    else return find(arr, x, start, mid);
  };

  return values[find(probabilites, Math.random())];
}

export function toKebabCase(value: string) {
  const match = value.replace(/_/g, ' ').match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g);
  if (!match) return value;

  return match
    .filter(Boolean)
    .map((x) => x.toLowerCase())
    .join('-');
}

export const toPascalCase = (value: string) => {
  return `${value}`
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+(.)(\w*)/g, (_$0, $1, $2) => `${$1.toUpperCase() + $2.toLowerCase()}`)
    .replace(/\w/, (s) => s.toUpperCase());
};

export const toCamelCase = (value: string) => {
  const pascalCase = toPascalCase(value);
  return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
};

export function getObjectValueByPath(object: { [key: string]: any }, path: string): any {
  if (!path) return object;
  const properties = path.split('.');
  return getObjectValueByPath(object[properties.shift()!] ?? '', properties.join('.'));
}

export function odd(number: number) {
  return number % 2 !== 0;
}

export function even(number: number) {
  return number % 2 === 0;
}

export function generateUUID() {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function generateGameId() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getAlphabeticalIndex(character: string) {
  const code = character.toUpperCase().charCodeAt(0);
  if (code > 64 && code < 91) return code - 65;
}

export function getCharacterByAlphabeticalIndex(index: number) {
  return String.fromCharCode(65 + index).toLowerCase();
}

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function randomValueFromArray<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const roundToMaxFractions = (number: number, fractionDigits = 2): number => {
  return Math.round((number + Number.EPSILON) * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits);
};

export function clamp(min: number, max: number, valueToClamp: number) {
  return Math.min(Math.max(valueToClamp, min), max);
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2 }).format(number);
}

export function getKeyByValue<T extends Record<string, any>>(obj: T, value: T[keyof T]): keyof T | undefined {
  return (Object.keys(obj) as (keyof T)[]).find((key) => obj[key] === value);
}

export function getColor(color: Color) {
  return colors[color];
}
