export default defineEventHandler(async (event) => {
  const { neon } = event.context;
  const code = getQuery(event).code as string;

  if (!code) {
    throw createError({ statusCode: 400, message: 'Missing verification token' });
  }

  const result = await neon.verifyEmail(code);

  console.log(result);

  // if (error || !user) {
  //   throw createError({ statusCode: 400, message: error?.message || 'Verification failed' });
  // }

  // Optionally set session cookie after verification
  // setCookie(event, 'neon_session', session.access_token, ...)

  // return { success: true, user: { id: user.id, email: user.email } };
});
