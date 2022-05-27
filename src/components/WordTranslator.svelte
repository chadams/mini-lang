<script type="ts">
  import WordTooltip from "./WordTooltip.svelte";
  import { words as wordList } from "../data/GlobalStore";

  export let text = "";

  function splitWords(text) {
    return text.split(/\W+/);
  }

  function getTranslation(wordBase, wordList) {
    const word = wordBase.toLowerCase();
    return wordList[word];
  }

  $: words = splitWords(text);
</script>

<p class="text-center font-bold text-3xl my-10">
  {#each words as word}
    <WordTooltip tooltip={getTranslation(word, $wordList)}>{word}</WordTooltip>
  {/each}
</p>
