import type { ScoreAction } from '~/types/ScoreAction';
import type { ScoreActionId } from '~/types/ScoreActionId';

export const scoreActions: { [key in ScoreActionId]: ScoreAction } = {
  blueSolved: {
    id: 'blueSolved',
    name: 'Blau gelöst',
    score: 300,
  },
  blueSolvedFirst: {
    id: 'blueSolvedFirst',
    name: 'Blau zuerst gelöst',
    score: 150,
  },
  greenSolved: {
    id: 'greenSolved',
    name: 'Grün gelöst',
    score: 200,
  },
  remainingMistake: {
    id: 'remainingMistake',
    name: 'Verbleibende Fehler',
    score: 100,
  },
  violetSolved: {
    id: 'violetSolved',
    name: 'Violett gelöst',
    score: 400,
  },
  violetSolvedFirst: {
    id: 'violetSolvedFirst',
    name: 'Violett zuerst gelöst',
    score: 200,
  },
  yellowSolved: {
    id: 'yellowSolved',
    name: 'Gelb gelöst',
    score: 100,
  },
};
