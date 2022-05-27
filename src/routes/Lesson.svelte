<script lang="ts">
  import { DocumentText, ThumbUp, Translate, Rewind, Map } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import AudioTranslator from "../components/AudioTranslator.svelte";
  import WordTranslator from "../components/WordTranslator.svelte";
  import { words } from "../data/GlobalStore";
  import { useParams, navigate } from "svelte-navigator";
  import { localStorageStore } from "@babichjacob/svelte-localstorage/browser";
  import { fly } from "svelte/transition";

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

  const params = useParams();

  let index = localStorageStore(`${$params.course}/${$params.lessonId}`, 0);
  let total = 0;
  let lesson: LessonType = null;
  let guide: string;
  let showTranslation = false;
  let showGuide = false;

  function restartLesson() {
    $index = 0;
    showGuide = false;
  }
  function navigateToCourseOutline() {
    navigate(`${import.meta.env.BASE_URL}/${$params.course}`);
  }

  onMount(async () => {
    lesson = await (await fetch(`${import.meta.env.BASE_URL}/units/${$params.course}/lessons/${$params.lessonId}.json`)).json();
    $words = await (await fetch(import.meta.env.BASE_URL + lesson.words)).json();
    guide = await (await fetch(import.meta.env.BASE_URL + lesson.guide)).text();
    total = lesson.cards.length;
  });
</script>

<div class="">
  <header class="sticky top-0">
    <div class="flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 py-4">
      <h1 class="text-2xl font-bold leading-tight text-gray-900 w-full focus:outline-none">{lesson?.title}</h1>
      <div class="text-md leading-tight text-gray-900">{$index + 1}/{total}</div>
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
          <div class="text-center">
            {#key $index}
              <div in:fly|local={{ y: -40 }} class="inline-block border-4 border-dashed border-gray-200 rounded-lg h-60 w-60">
                <img alt="pic" src={lesson?.cards[$index].pic} class="w-full h-full m-auto" />
              </div>
            {/key}
          </div>
          {#if showTranslation}
            <p class="text-center font-bold text-2xl my-10">{lesson?.cards[$index].tra}</p>
            <hr />
          {/if}
          <WordTranslator text={lesson?.cards[$index].txt} />
          <div class="flex justify-end sm:justify-center sticky bottom-0 p-4 bg-gray-50">
            <button
              type="button"
              on:click={() => (showTranslation = !showTranslation)}
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray bg-gray-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              ><Icon src={Translate} theme="" class="color-gray-900 h-6 w-6" /></button
            >
            <AudioTranslator text={lesson?.cards[$index].txt} />
            <div class="w-full" />

            <button
              type="button"
              on:click={() => ($index = $index + 1)}
              class="ml-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              ><Icon src={ThumbUp} theme="solid" class="color-gray-900 h-6 w-6" /></button
            >
          </div>
        </div>
      {/if}
      {#if showGuide}
        <div class="flex mt-4 border-b pb-4">
          <button
            type="button"
            on:click={navigateToCourseOutline}
            class="mr-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ><Icon src={Map} theme="" class="color-gray-900 h-4 w-4 mr-2" /> Course home</button
          >
          <button
            type="button"
            on:click={restartLesson}
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ><Icon src={Rewind} theme="" class="color-gray-900 h-4 w-4 mr-2" /> Restart Lesson</button
          >
        </div>
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
