<script setup lang="ts">
  import PuzzleGroupComponent from './PuzzleGroup.vue';
  import PuzzleTile from './PuzzleTile.vue';
  import PuzzleMistakes from './PuzzleMistakes.vue';
  import AppButton from './AppButton.vue';
  import { useAppStore } from '~/store/appStore';
  import type { PuzzleGroup } from '~/types/PuzzleGroup';
  import type { PuzzleGroupItem } from '~/types/PuzzleGroupItem';
  import LoadingIndicator from './LoadingIndicator.vue';
  import type { PuzzleGroupId } from '~/types/PuzzleGroupId';
  import SwitchToggle from './SwitchToggle.vue';

  const props = defineProps<{ puzzleId: string }>();

  const { $gsap } = useNuxtApp();
  const store = useAppStore();
  const router = useRouter();

  const {
    deselectAllItems,
    getGroupById,
    getGroupByItemId,
    getItemIndexById,
    loading,
    maxItemsSelected,
    communityView,
    pushScoreNotifications,
    puzzle,
    reset,
    save,
    solvedGroups,
  } = usePuzzle(props.puzzleId);

  const animationRunning = ref(false);

  function shuffleItems(transition = true) {
    if (!puzzle.value) return;

    if (!transition) {
      puzzle.value.items = shuffleArray(puzzle.value.items);
      return;
    }

    $gsap.to('.puzzle-tile .caption', {
      opacity: 0,
      duration: 0.2,
      onStart: () => {
        animationRunning.value = true;
      },
      onComplete: () => {
        if (!puzzle.value) return;
        puzzle.value.items = shuffleArray(puzzle.value.items);
        $gsap.to('.puzzle-tile .caption', {
          opacity: 1,
          duration: 0.2,
          onComplete: () => {
            animationRunning.value = false;
          },
        });
      },
    });
  }

  function animateSelectedItems(): Promise<void> {
    return new Promise((resolve) => {
      const timeline = $gsap.timeline({
        onComplete: () => {
          resolve();
        },
      });

      for (const item of getSelectedItemDomElements()) {
        timeline.to(
          item,
          {
            y: -10,
            repeat: 1,
            duration: 0.15,
            yoyo: true,
            ease: 'power(4)',
          },
          '<+0.075'
        );
      }
    });
  }

  async function submitItems() {
    if (!puzzle.value) return;

    const currentGuess = sortAlphabetically(puzzle.value.selected);

    if (puzzle.value.guesses.find((guess) => guess.join('-') === currentGuess.join('-'))) {
      return store.pushToastNotification('Schon geraten!');
    }

    animationRunning.value = true;
    puzzle.value.guesses.push(currentGuess);

    const groups = puzzle.value.selected.map((id) => getGroupByItemId(id));
    const sortedGroups: { [key: string]: PuzzleGroup[] } = groupArrayByKey(groups, 'id');
    const totalMatch = Object.values(sortedGroups).find((group) => group.length === 4);

    if (totalMatch) {
      puzzle.value!.solved.push(totalMatch[0].id);
      if (puzzle.value.solved.length === 4) {
        puzzle.value.won = true;
      }
      await save();
      await animateSelectedItems();
      await solveGroup(totalMatch[0].id);
      animationRunning.value = false;
      return;
    }

    puzzle.value.remainingMistakes--;

    if (puzzle.value.remainingMistakes === 0) {
      const remainingGroupIds = (['a', 'b', 'c', 'd'] as PuzzleGroupId[]).filter((groupId) => !puzzle.value?.solved.includes(groupId));
      puzzle.value.solved = [...puzzle.value.solved, ...remainingGroupIds];
      await save();

      await animateSelectedItems();
      store.pushToastNotification('Vielleicht nächstes Mal!');
      deselectAllItems();

      for (const groupId of remainingGroupIds) {
        await sleep(1000);
        await solveGroup(groupId);
      }

      animationRunning.value = false;
      return;
    }

    await save();

    await animateSelectedItems();
    animateSelectedItemsFail();
    animationRunning.value = false;

    const closeMatch = Object.values(sortedGroups).find((group) => group.length === 3);
    if (closeMatch) {
      return store.pushToastNotification('Einer falsch!');
    }
  }

  function getSelectedItemDomElements() {
    if (!puzzle.value) return [];
    const tiles = $gsap.utils.toArray(document.querySelectorAll('.puzzle-tile')) as HTMLElement[];
    const idxs = [];

    for (const item of puzzle.value.selected) {
      idxs.push(tiles.findIndex((tile) => tile.dataset.id === item));
    }

    return sortNumerically(idxs).map((idx) => tiles[idx]);
  }

  async function solveGroup(groupId: string): Promise<void> {
    if (!puzzle.value) return;

    const flipState = $gsap.Flip.getState('.puzzle-tile');

    moveSolvedItemsToTop(groupId);

    await nextTick();

    return new Promise((resolve) => {
      $gsap.Flip.from(flipState, {
        duration: puzzle.value!.solved.length === 3 ? 0 : 0.6,
        ease: 'power2.inOut',
        absolute: true,
        onStart: () => {
          $gsap.set(getSelectedItemDomElements(), { zIndex: 1 });
        },
        onComplete: () => {
          deselectAllItems();
          puzzle.value!.items = puzzle.value!.items.filter((item) => !item.id.startsWith(groupId));
          solvedGroups.value.push(getGroupById(groupId)!);
          pushScoreNotifications();
          nextTick(() => {
            $gsap.to(`.puzzle-group[data-group-id="${groupId}"]`, { scale: 1.1, duration: 0.15, ease: 'power(4)', yoyo: true, repeat: 1 });
            resolve();
          });
        },
      });
    });
  }

  function swapItems(unusedIndexes: number[], swapIndexes: number[], oldItems: PuzzleGroupItem[], newItems: PuzzleGroupItem[], iteration: number) {
    if (unusedIndexes.length === 0) return newItems;

    for (const index of unusedIndexes) {
      const indexesOrder = [
        [4, 8, 12],
        [5, 9, 13],
        [6, 10, 14],
        [7, 11, 15],
      ];
      const preferedIndexOrder = iteration === 0 ? indexesOrder[index].flat() : indexesOrder.slice(index).concat(indexesOrder.slice(0, index)).flat();
      const originIndex = swapIndexes.find((index) => preferedIndexOrder.includes(index));

      if (originIndex) {
        newItems[index] = oldItems[originIndex];
        newItems[originIndex] = oldItems[index];
        unusedIndexes = unusedIndexes.filter((_index) => _index !== index);
        swapIndexes = swapIndexes.filter((_index) => _index !== originIndex);
      }
    }

    return swapItems(unusedIndexes, swapIndexes, oldItems, newItems, iteration + 1);
  }

  function moveSolvedItemsToTop(groupId: string) {
    if (!puzzle.value || !puzzle.value.items) return;

    const items = getGroupById(groupId)?.items;
    if (!items) return;

    const positionIndexes = sortNumerically(items?.map((item) => getItemIndexById(item.id)));

    let swapIndexes = positionIndexes.filter((index) => index >= 4);
    const usedIndexes = positionIndexes.filter((index) => index <= 3);
    const unusedIndexes = [0, 1, 2, 3].filter((index) => !usedIndexes.includes(index));

    if (unusedIndexes.length === 0) return false;

    puzzle.value.items = swapItems(unusedIndexes, swapIndexes, puzzle.value.items, puzzle.value.items.slice(), 0);
    return true;
  }

  function animateSelectedItemsFail(): Promise<void> {
    return new Promise((resolve) => {
      const items = getSelectedItemDomElements();

      const timeline = $gsap.timeline({
        onStart: () => {
          $gsap.set(items, { background: '#82837a' });
        },
        onComplete: () => {
          $gsap.set(items, { clearProps: 'all' });
          resolve();
        },
      });

      for (const item of items) {
        timeline.to(item, { x: 10, ease: 'wiggle' }, '<');
      }
    });
  }

  function showResults() {
    router.push(`/app/${props.puzzleId}/statistik`);
  }

  onMounted(() => {
    $gsap.CustomWiggle.create('wiggle', { wiggles: 6 });
  });

  // debug function
  //   function checkDuplicates() {
  //     const allItems = playersConfig[route.params.player as Player]
  //       .flat()
  //       .map((puzzle) => puzzle.groups.map((group) => sortAlphabetically(group.items).join('-')))
  //       .flat();

  //     const duplicates = [];

  //     for (const puzzle of playersConfig[route.params.player as Player]) {
  //       for (const group of puzzle.groups) {
  //         if (allItems.filter((item) => item === sortAlphabetically(group.items).join('-')).length > 1) {
  //           duplicates.push(group);
  //         }
  //       }
  //     }

  //     return duplicates;
  //   }
</script>

<template>
  <ClientOnly>
    <div v-if="loading" class="loading-wrapper">
      <LoadingIndicator />
    </div>
    <div v-else-if="puzzle" class="puzzle">
      <div class="board">
        <PuzzleGroupComponent v-for="group in solvedGroups" :group="group" :key="group.id" class="animation-target" />
        <PuzzleTile
          v-for="item in puzzle.items"
          :key="item.id"
          v-model="puzzle.selected"
          :input-value="item.id"
          :id="item.id"
          :caption="item.caption"
          :disabled="(maxItemsSelected && !puzzle.selected.includes(item.id)) || animationRunning"
          class="animation-target"
        />
      </div>
      <PuzzleMistakes v-if="puzzle.solved.length !== 4" :remaining-mistakes="puzzle.remainingMistakes" class="animation-target" />
      <div class="button-container">
        <AppButton v-if="store.debug" hierarchy="secondary" :disabled="animationRunning" @click="reset" class="animation-target">
          Zurücksetzen
        </AppButton>
        <template v-if="puzzle.solved.length !== 4">
          <SwitchToggle v-model="communityView" id="show-community-turns">Community-Sicht</SwitchToggle>
          <AppButton :disabled="!maxItemsSelected || animationRunning" @click="submitItems" class="animation-target submit">Absenden</AppButton>
          <!-- <AppButton hierarchy="secondary" :disabled="animationRunning" @click="shuffleItems" class="animation-target">Mischen</AppButton> -->
          <!-- <AppButton
            hierarchy="secondary"
            :disabled="puzzle.selected.length === 0 || animationRunning"
            @click="deselectAllItems"
            class="animation-target"
          >
            Alle abwählen
          </AppButton>
          <AppButton hierarchy="secondary" :disabled="animationRunning">Community</AppButton> -->
        </template>
        <template v-else>
          <AppButton @click="showResults" class="animation-target">Statistik anzeigen</AppButton>
        </template>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
  .loading-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vw - #{spacing('m') * 2});

    @media all and (min-width: 769px) {
      margin: 0 auto;
      width: calc(3 * 8px + 4 * 140px);
      height: calc(3 * 8px + 4 * 140px);
    }
  }

  .puzzle {
    width: calc(100% + spacing('m') * 2);
    margin-left: -#{spacing('m')};
    margin-top: -#{spacing('m')};

    @media all and (min-width: 769px) {
      margin: 0 auto;
      width: calc(3 * 8px + 4 * 140px);
    }

    @media all and (max-width: 768px) {
      overflow-x: hidden;
      padding: spacing('m') spacing('m') 0 spacing('m');
    }
  }

  .board {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    min-height: 0;
    min-width: 0;
    height: calc(100vw - #{spacing('m') * 2});
    gap: 8px;

    @media all and (min-width: 769px) {
      height: calc(3 * 8px + 4 * 140px);
    }
  }

  .instructions {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    margin-bottom: spacing('l');
  }

  .puzzle-item {
    flex: 1;
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    // flex-wrap: wrap;
    flex-direction: column;
    gap: spacing('m');
    margin-top: spacing('m');
  }

  .toast-area {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    top: 54px;
  }

  .puzzle-group {
    grid-column: span 4;
  }

  .submit {
    width: 100%;
  }

  button {
    text-align: center;
  }
</style>
