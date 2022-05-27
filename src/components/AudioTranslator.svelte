<script lang="ts">
  import { Speakerphone } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { onMount } from "svelte";
  import { useAudioTranslate } from "../hooks/useAudioTranslate";

  export let text = "";

  $: [play] = useAudioTranslate(text);
</script>

<button
  type="button"
  on:click={play}
  class="ml-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray bg-gray-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  ><Icon src={Speakerphone} theme="" class="color-gray-900 h-6 w-6" /></button
>
