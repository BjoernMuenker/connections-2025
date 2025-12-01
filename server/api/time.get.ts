export default defineEventHandler(() => {
  return { now: Date.now() + 1 * 60 * 60 * 1000 };
});
