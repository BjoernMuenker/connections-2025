import type { StackServerApp } from '@stackframe/js';

declare module 'h3' {
  interface H3EventContext {
    neon: StackServerApp;
  }
}
