import { scoreActions } from '~/content/scoreActions';
import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
import type { PuzzleScore } from '~/types/PuzzleScore';
import type { ScoreActionId } from '~/types/ScoreActionId';

export function useScore() {
  function getScoreFromSavegame(savegame: PuzzlePersistedState): PuzzleScore {
    const result: PuzzleScore = {};

    if (savegame.won) {
      const score = scoreActions['remainingMistake'].score;

      result.remainingMistake = {
        amount: savegame.remainingMistakes,
        single: score,
        total: score * savegame.remainingMistakes,
      };
    }

    const groupsSolvedByUser = savegame.solved.filter((groupId) =>
      savegame.guesses.find((guess) => guess.every((itemId) => itemId.startsWith(groupId)))
    );

    for (const groupId of groupsSolvedByUser) {
      const action = `${groupId}Solved` as ScoreActionId;
      const score = scoreActions[action].score;

      result[action] = {
        amount: 1,
        single: score,
        total: score,
      };
    }

    const firstSolvedGroupId = groupsSolvedByUser[0];

    if (['c', 'd'].includes(firstSolvedGroupId)) {
      const action = `${firstSolvedGroupId}SolvedFirst` as ScoreActionId;
      const score = scoreActions[action].score;

      result[action] = {
        amount: 1,
        single: score,
        total: score,
      };
    }

    return sortScoreActions(result);
  }

  function getScoreFromSavegames(savegames: PuzzlePersistedState[]) {
    const result: PuzzleScore = {};

    for (const savegame of savegames) {
      const partialResult = getScoreFromSavegame(savegame);

      Object.entries(partialResult).forEach(([scoreAction, value]) => {
        if (!result[scoreAction as ScoreActionId]) {
          result[scoreAction as ScoreActionId] = value;
        } else {
          result[scoreAction as ScoreActionId]!.amount += value.amount;
          result[scoreAction as ScoreActionId]!.single += value.single;
          result[scoreAction as ScoreActionId]!.total += value.total;
        }
      });
    }

    return sortScoreActions(result);
  }

  function sortScoreActions(data: Partial<Record<ScoreActionId, any>>) {
    const sortOrder: ScoreActionId[] = ['aSolved', 'bSolved', 'cSolved', 'cSolvedFirst', 'dSolved', 'dSolvedFirst', 'remainingMistake'];
    return sortObjectByCustomOrder(data, sortOrder);
  }

  function getScoreDiff(from: PuzzlePersistedState, to: PuzzlePersistedState) {
    const fromScore = getScoreFromSavegame(from);
    const toScore = getScoreFromSavegame(to);

    return Object.fromEntries(Object.entries(toScore).filter(([key]) => !(key in fromScore))) as typeof toScore;
  }

  return { getScoreFromSavegame, getScoreFromSavegames, getScoreDiff, sortScoreActions };
}
