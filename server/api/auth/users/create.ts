import { setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const { neon } = event.context; // typed StackServerApp
  const { email, password } = await readBody<{ email: string; password: string }>(event);

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password are required' });
  }

  const result = await neon.signUpWithCredential({
    email,
    password,
    verificationCallbackUrl: 'http://192.168.178.25:3000/verify-email',
  });

  if (result.status === 'error') {
    throw createError({ statusCode: result.error.statusCode, statusMessage: result.error.errorCode });
  }

  console.log(result);
});
