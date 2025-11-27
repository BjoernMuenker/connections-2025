<script setup lang="ts">
  import type { TutorialId } from '~/types/TutorialId';
  import AppButton from './AppButton.vue';
  import { useAppStore } from '~/store/appStore';
  import { scoreActions } from '~/content/scoreActions';

  const props = defineProps<{ id: TutorialId }>();
  const store = useAppStore();

  const { sortScoreActions } = useScore();

  function closeOffCanvas() {
    store.closeOffCanvas();
  }
</script>

<template>
  <template v-if="id === 'firstLogin'">
    <p>Sieht so aus, als bist du zum ersten Mal hier. Schau dich in Ruhe um und wenn du so weit bist, mach das erste Türchen auf.</p>
  </template>
  <template v-if="id === 'firstPuzzleStarted'">
    <p>Jeden Tag geht es darum, <strong>4 Gruppen mit je 4 Worten</strong> zu bilden, die etwas gemeinsam haben.</p>
    <p>
      Wähle dazu 4 Worte aus und klicke <strong>"Absenden"</strong>, um zu erfahren, ob du richtig liegst. Wenn mal etwas nicht passt, keine Sorge:
      Ein paar Fehler sind jeden Tag erlaubt.
    </p>
    <p>
      Jedes Puzzle hat genau eine Lösung. Sei auf der Hut vor Worten, die scheinbar in mehrere Gruppen passen. Falls du mal nicht weiterkommst,
      versuch es später wieder. Puzzle werden automatisch gespeichert.
    </p>
  </template>
  <template v-if="id === 'firstGroup'">
    <p>Wenn du eine Gruppe aufdeckst, dann erhält sie eine von 4 Farben, die dir verrät, wie "knifflig" sie war:</p>
    <ul>
      <li><strong>Gelb:</strong> Meist am einfachsten zu finden.</li>
      <li><strong>Grün:</strong> Etwas schwieriger, aber gut machbar.</li>
      <li><strong>Blau:</strong> Du musst oft etwas um die Ecke denken.</li>
      <li><strong>Violett:</strong> Hier brauchst du wirklich alle grauen Zellen.</li>
    </ul>
  </template>
  <template v-if="id === 'firstMistake'">
    <p>Erster Fehler...</p>
  </template>
  <template v-if="id === 'communityView'">
    <p>
      Du hast gerade die Community-Sicht aktiviert: In diesem Modus siehst du, welche Worte andere Spieler abgesendet haben, während sie im gleichen
      Spielzug waren wie du. Je stärker ein Feld rot eingefärbt ist, umso häufiger wurde es übermittelt. Weiße Felder wurden nie gesendet.
    </p>
    <p>
      Mit etwas Glück kann dir dieser Modus eine kleine Hilfe sein oder sogar eine Gruppe offenbaren, die du vielleicht noch nicht gesehen hast.
      <strong>Aber Vorsicht:</strong> Auch deine Mitspieler können sich irren.
    </p>
    <p>
      Nutze die Community-Sicht so oft du willst. Wenn es einmal keine Daten gibt, hat wahrscheinlich noch niemand das Puzzle weit genug gespielt,
      dann schau einfach später vorbei oder löse es auf eigene Faust.
    </p></template
  >
  <template v-if="id === 'firstPuzzleWon'">
    <p>
      Glückwunsch, du hast das erste Puzzle gelöst! Du kannst jetzt auf <strong>"Statistik anzeigen"</strong> klicken und dir deine Auswertung
      ansehen.
    </p>
    <p>
      Vielleicht hast du schon bemerkt, dass du ein paar Punkte bekommen hast. Wenn du bestimmte Aktionen in einem Puzzle abschließt, erhöht sich dein
      Score und du steigst weiter in der Bestenliste auf. Hier ist eine Übersicht aller Aktionen:
    </p>
    <ul>
      <li v-for="action in sortScoreActions(scoreActions)">{{ action.name }}: +{{ action.score }}</li>
    </ul>
  </template>
  <template v-if="id === 'firstPuzzleLost'">
    <p>Wenn du vier Mal falsch liegst, wird ein Puzzle automatisch aufgelöst. Aber Kopf hoch, nächstes Mal klappt es dann ganz bestimmt!</p>
  </template>
  <AppButton @click="closeOffCanvas">Alles klar</AppButton>
</template>

<style lang="scss" scoped>
  p + p,
  p + ul,
  ul + p {
    margin-top: spacing('m');
  }

  ul {
    padding-left: spacing('m');
  }

  button {
    margin-top: spacing('l');
    width: 100%;

    @include breakpoint('medium') {
      margin-top: spacing('xl');
      width: auto;
    }
  }
</style>
