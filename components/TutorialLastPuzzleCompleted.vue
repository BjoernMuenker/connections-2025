<script setup lang="ts">
  import RichText from './RichText.vue';
  import Signature from './Signature.vue';
</script>

<template>
  <RichText>
    <p>
      Wenn jetzt tatsächlich Weihnachten ist: Frohe Weihnachten dir, deiner Familie und Freunden! Wenn es schon später ist: Guten Rutsch! Und wenn es
      noch später ist, auch egal - auf jeden Fall schön, dass du mit dabei warst!
    </p>
    <p>
      Bei dir haben sich Lob, Frust oder Verbesserungsvorschläge angestaut? Dann immer her damit - persönlich, per WhatsApp oder
      <a href="mailto:feedback@hohoho.bjoernmuenker.de" class="text-link">via Mail</a>.
    </p>
    <p>
      Übrigens: Bis zum 31.01.2026 kannst du noch Türchen nachholen, danach geht diese Seite in den Winterschlaf. Aber wer weiß - vielleicht sieht man
      sich ja irgendwann erneut?
    </p>
    <p>
      <Signature />
    </p>
  </RichText>
</template>
