<script setup lang="ts">
  import { scoreActions } from '~/content/scoreActions';
  import RichText from './RichText.vue';

  const { sortScoreActions } = useScore();
</script>

<template>
  <RichText>
    <p>
      Glückwunsch, du hast das erste Puzzle gelöst! Du kannst jetzt auf <strong>"Statistik anzeigen"</strong> klicken und dir deine und eine globale
      Auswertung ansehen.
    </p>
    <p>
      Vielleicht hast du schon bemerkt, dass du ein paar Punkte bekommen hast. Wenn du bestimmte Aktionen in einem Puzzle abschließt, erhöht sich dein
      Score und du steigst weiter in der Bestenliste auf. Hier ist eine Übersicht aller Aktionen:
    </p>
    <ul>
      <li v-for="action in sortScoreActions(scoreActions)">{{ action.name }}: +{{ action.score }}</li>
    </ul>
  </RichText>
</template>
