<script type="ts">
  import { createPopperActions } from "svelte-popperjs";
  const [popperRef, popperContent] = createPopperActions({
    placement: "top",
    strategy: "fixed",
  });
  const extraOpts = {
    modifiers: [{ name: "arrow", options: { padding: 5, offset: [0, -8] } }],
  };

  let showTooltip = false;
  export let tooltip = null;
  $: {
    tooltip = tooltip;
    showTooltip = false;
  }
</script>

<span
  class="hover:bg-indigo-100"
  use:popperRef
  on:touchstart={() => (showTooltip = false)}
  on:touchend={() => (showTooltip = true)}
  on:mouseenter={() => (showTooltip = true)}
  on:mouseleave={() => (showTooltip = false)}>
  <slot />
</span>
{#if showTooltip && tooltip}
  <div id="tooltip" use:popperContent={extraOpts}>
    {tooltip}
    <div id="arrow" class="pr-2" data-popper-arrow />
  </div>
{/if}

<style>
  #tooltip {
    background: #333;
    color: white;
    font-weight: bold;
    padding: 4px 8px;
    font-size: 13px;
    border-radius: 4px;
  }
  #arrow,
  #arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }

  #arrow {
    visibility: hidden;
  }

  #arrow::before {
    visibility: visible;
    content: "";
    transform: rotate(45deg);
  }
</style>
