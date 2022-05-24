<script lang="ts">
  import { DocumentText, ThumbUp, Translate } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import AudioTranslator from "../components/AudioTranslator.svelte";
  import WordTranslator from "../components/WordTranslator.svelte";
  import { words } from "../data/GlobalStore";

  interface LessonType {
    guide: string;
    title: string;
    words: string;
    cards: CardsType[];
  }

  interface CardsType {
    pic: string;
    txt: string;
    tra: string;
  }

  let index = 0;
  let total = 0;
  let lesson: LessonType = null;
  let guide: string;
  let showTranslation = false;
  let showGuide = false;

  onMount(async () => {
    console.log("lesson");
    lesson = await (await fetch("units/mini-kore/lessons/1-1.json")).json();
    console.log(lesson);
    $words = await (await fetch(lesson.words)).json();
    guide = await (await fetch(lesson.guide)).text();
    total = lesson.cards.length;
  });
</script>

<div class="">
  <header class="sticky top-0">
    <div class="flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 py-4">
      <h1 class="text-2xl font-bold leading-tight text-gray-900 w-full focus:outline-none">{lesson?.title}</h1>
      <div class="text-md leading-tight text-gray-900">{index + 1}/{total}</div>
      <button
        type="button"
        on:click={() => (showGuide = !showGuide)}
        class="leading-tight ml-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-gray hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        ><Icon src={DocumentText} class="color-gray-900 h-6 w-6" /></button
      >
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      {#if !showGuide}
        <div class="px-4 pt-8 sm:px-0 max-w-2xl m-auto">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-60 w-60 m-auto">
            <img alt="pic" src={lesson?.cards[index].pic} class="w-full h-full m-auto" />
          </div>
          {#if showTranslation}
            <p class="text-center font-bold text-2xl my-10">{lesson?.cards[index].tra}</p>
            <hr />
          {/if}
          <WordTranslator text={lesson?.cards[index].txt} />
          <div class="flex justify-end sm:justify-center sticky bottom-0 p-4 bg-gray-50">
            <button
              type="button"
              on:click={() => (showTranslation = !showTranslation)}
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray bg-gray-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              ><Icon src={Translate} theme="" class="color-gray-900 h-6 w-6" /></button
            >
            <AudioTranslator text={lesson?.cards[index].txt} />
            <div class="w-full" />

            <button
              type="button"
              on:click={() => (index = index + 1)}
              class="ml-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              ><Icon src={ThumbUp} theme="solid" class="color-gray-900 h-6 w-6" /></button
            >
          </div>
        </div>
      {/if}
      {#if showGuide}
        <div class="px-4 pt-8 sm:px-0 max-w-2xl m-auto prose prose-slate pb-8">
          <SvelteMarkdown source={guide} />
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
  :global(.prose pre) {
    color: white;
    background-color: black;
  }
</style>
