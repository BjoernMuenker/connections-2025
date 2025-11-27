import type { ScoreAction } from '~/types/ScoreAction';
import type { ScoreActionId } from '~/types/ScoreActionId';

export const scoreActions: { [key in ScoreActionId]: ScoreAction } = {
  cSolved: {
    id: 'cSolved',
    name: 'Blau gelöst',
    score: 300,
  },
  cSolvedFirst: {
    id: 'cSolvedFirst',
    name: 'Blau zuerst gelöst',
    score: 150,
  },
  bSolved: {
    id: 'bSolved',
    name: 'Grün gelöst',
    score: 200,
  },
  remainingMistake: {
    id: 'remainingMistake',
    name: 'Verbleibende Fehler',
    score: 100,
  },
  dSolved: {
    id: 'dSolved',
    name: 'Violett gelöst',
    score: 400,
  },
  dSolvedFirst: {
    id: 'dSolvedFirst',
    name: 'Violett zuerst gelöst',
    score: 200,
  },
  aSolved: {
    id: 'aSolved',
    name: 'Gelb gelöst',
    score: 100,
  },
};
