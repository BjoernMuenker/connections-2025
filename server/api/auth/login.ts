import { setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const { neon } = event.context;
  const { email, password } = await readBody<{ email: string; password: string }>(event);

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Missing credentials' });
  }

  const result = await neon.signInWithCredential({
    email,
    password,
  });

  if (result.status === 'error') {
    throw createError({ statusCode: result.error.statusCode, statusMessage: result.error.errorCode });
  }

  console.log(result);

  // try {
  //   const result = await neon.signInWithCredential({
  //     email,
  //     password,
  //   });

  //   if (result.status === 'error') {
  //     throw createError({ statusCode: result.error.statusCode, message: result.error.message });
  //   }

  //   console.log(result);
  // } catch (err: any) {
  //   console.error('Neon Auth login error:', err);
  //   throw createError({ statusCode: 500, message: 'Internal server error' });
  // }
});
