<script lang="ts">
  import { Icon } from "@steeze-ui/svelte-icon";
  import { ThumbUp } from "@steeze-ui/heroicons";
  import { onMount } from "svelte";

  interface LessonType {
    guide: string;
    title: string;
    cards: CardsType[];
  }

  interface CardsType {
    pic: string;
    txt: string;
    tra: string;
  }

  let index = 0;
  let lesson: LessonType = null;

  onMount(async () => {
    lesson = await (await fetch("/public/units/mini-kore/lessons/1-1.json")).json();
    console.log(lesson);
  });
</script>

<div class="">
  <header class="sticky top-0">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 py-6">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">1/1</h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-8 sm:px-0 max-w-2xl m-auto">
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-60 w-60 m-auto">
          <img alt="pic" src={lesson?.cards[index].pic} class="w-full h-full m-auto" />
        </div>
        <p class="text-center font-bold text-3xl my-10">{lesson?.cards[index].txt}</p>
        <div class="flex justify-end sm:justify-center">
          <button
            type="button"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ><Icon src={ThumbUp} theme="solid" class="color-gray-900 h-6" /></button
          >
        </div>
      </div>
      <!-- /End replace -->
    </div>
  </main>
</div>
