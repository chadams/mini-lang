<script lang="ts">
  import { Icon } from "@steeze-ui/svelte-icon";
  import { ThumbUp } from "@steeze-ui/heroicons";
  import { Translate } from "@steeze-ui/heroicons";
  import { onMount } from "svelte";
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
  let showTranslation = false;

  onMount(async () => {
    lesson = await (await fetch("/public/units/mini-kore/lessons/1-1.json")).json();
    $words = await (await fetch(lesson.words)).json();
    total = lesson.cards.length;
    console.log(lesson, $words);
  });
</script>

<div class="">
  <header class="sticky top-0">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 py-6">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">{index + 1}/{total}</h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <!-- Replace with your content -->
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
            ><Icon src={Translate} theme="solid" class="color-gray-900 h-6" /></button
          >
          <div class="w-full" />
          <button
            type="button"
            on:click={() => (index = index + 1)}
            class="ml-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ><Icon src={ThumbUp} theme="solid" class="color-gray-900 h-6" /></button
          >
        </div>
      </div>
      <!-- /End replace -->
    </div>
  </main>
</div>
