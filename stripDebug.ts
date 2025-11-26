import { createFilter } from '@rollup/pluginutils';

export default function stripDebugCode() {
  const filter = createFilter([
    'components/**/*.{vue,js,ts}',
    'composables/**/*.{vue,js,ts}',
    'layouts/**/*.{vue,js,ts}',
    'middleware/**/*.{vue,js,ts}',
    'pages/**/*.{vue,js,ts}',
    'plugins/**/*.{vue,js,ts}',
    'server/**/*.{vue,js,ts}',
    'store/**/*.{vue,js,ts}',
  ]);

  return {
    name: 'strip-debug-code',
    enforce: 'pre' as 'post' | 'pre' | undefined,
    transform(code: string, id: string) {
      if (!filter(id)) {
        return;
      }
      const strippedCode = code
        .replace(/<template #debug>[\s\S]*?<\/template>/gm, '')
        .replace(/<debug-only>[\s\S]*?<\/debug-only>/gm, '')
        .replace(/<DebugOnly>[\s\S]*?<\/DebugOnly>/gm, '')
        .replace(/<!-- START DEBUG -->[\s\S]*?<!-- END DEBUG -->/gm, '')
        .replace(/\/\* START DEBUG \*\/[\s\S]*?\/\* END DEBUG \*\//gm, '');

      if (strippedCode !== code) {
        console.info('stripDebugCode - changed file', id);
      }

      return {
        code: strippedCode,
        map: null,
      };
    },
  };
}
