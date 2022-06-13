<script type="ts">
  import { get } from "svelte/store";
  import { words as wordList } from "../data/GlobalStore";
  import Fuse from "fuse.js";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Search, InformationCircle, BookOpen, ThumbUp, Translate, Rewind, Map } from "@steeze-ui/heroicons";

  const words = get(wordList);
  const wordsDB = Object.keys(words).map((key) => {
    return { txt: words[key], tra: key };
  });
  const options = {
    threshold: 0.1,
    keys: ["txt", "tra"],
  };
  const fuse = new Fuse(wordsDB, options);

  let search = "";
  let results = [];
  $: {
    results = fuse.search(search);
  }
</script>

<div class="flex py-4 max-w-2xl m-auto border-b sticky top-[82px] flex items-center bg-white ">
  <div class="flex-1 px-2 flex ">
    <div class="w-full">
      <label for="search" class="sr-only">Search</label>
      <div class="relative text-gray-400 focus-within:text-gray-600">
        <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <Icon src={Search} class="h-5 w-5" />
        </div>
        <input
          id="search"
          class="text-xl block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white focus:border-white "
          placeholder="Search"
          type="search"
          name="search"
          autocomplete="off"
          bind:value={search}
        />
      </div>
    </div>
  </div>
</div>
<div class="px-4 pt-8 sm:px-0 max-w-2xl m-auto pb-8 min-h-screen">
  {#each results as result}
    <h3 class="font-bold text-xl">{result.item.tra}</h3>
    <p class="border-b pb-2 mb-2">{result.item.txt}</p>
  {/each}
</div>
