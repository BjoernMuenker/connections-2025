import { StackServerApp } from '@stackframe/js';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const stackServerApp = new StackServerApp({
    projectId: config.STACK_PROJECT_ID,
    publishableClientKey: config.public.NUXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
    secretServerKey: config.STACK_SECRET_SERVER_KEY,
    tokenStore: 'memory',
  });

  // async function getUserById(id: string) {
  //   return await stackServerApp.getUser(id);
  // }

  return {
    provide: {
      auth: stackServerApp,
    },
  };
});
