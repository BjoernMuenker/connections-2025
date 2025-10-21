export default defineEventHandler(async (event) => {
  const { neon } = event.context;
  const { userId } = event.context.params || {};

  console.log('got userId', userId);

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing user userId',
    });
  }

  try {
    const user = await neon.getUser(userId);

    console.log(user);

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      });
    }

    return user;
  } catch (err: any) {
    console.error('Error fetching user:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch user',
    });
  }
});
