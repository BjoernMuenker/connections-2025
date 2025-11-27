import { tutorialTitles } from '~/content/tutorialTitles';
import { useAppStore } from '~/store/appStore';
import type { TutorialId } from '~/types/TutorialId';

export function useTutorial() {
  const store = useAppStore();
  const client = useSupabaseClient();
  const user = useSupabaseUser();

  async function showTutorial(id: TutorialId) {
    if (store.offCanvasVisible || !user.value || store.tutorials?.includes(id)) return;

    await sleep(500);

    store.openOffCanvas({ heading: tutorialTitles[id], component: 'Tutorial', componentProps: { id } });

    const newArray = Array.from(new Set([...store.tutorials, id]));

    const { data, error } = await client
      .from('profiles')
      .update({
        tutorials: newArray,
      })
      .eq('id', user.value?.sub);

    store.tutorials = newArray;
  }

  async function fetchTutorials() {
    if (!user.value) return;
    const { data } = await client.from('profiles').select('tutorials').eq('id', user.value?.sub).single();
    return (data?.tutorials ?? []) as TutorialId[];
  }

  return { fetchTutorials, showTutorial };
}
