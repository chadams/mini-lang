<script lang="ts">
  import { onMount } from "svelte";
  import { Clock } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Link } from "svelte-navigator";

  interface CoursesType {
    id: string;
    title: string;
    desc: string;
    icon: string;
    pic: string;
  }

  let courses: CoursesType[] = [];

  onMount(async () => {
    const res = await (await fetch("units/courses.json")).json();
    courses = res.courses;
  });
</script>

<div class="">
  <header class="sticky top-0">
    <div class="flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 py-4">
      <h1 class="text-2xl font-bold leading-tight text-gray-900 w-full focus:outline-none">Available Courses</h1>
    </div>
  </header>
  <main>
    <div class=" bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
      {#each courses as course}
        <div class="   relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
          <div>
            <span class=" inline-flex p-3 bg-teal-50 text-teal-700 ring-4 ring-white">
              <img class="w-6 h-6" src={course.icon} alt="{course.title} logo" />
            </span>
          </div>
          <div class="mt-8">
            <h3 class="text-lg font-medium">
              <a href={course.id} class="focus:outline-none">
                <!-- Extend touch target to entire panel -->
                <span class="absolute inset-0" aria-hidden="true" />
                {course.title}
              </a>
            </h3>
            <p class="mt-2 text-sm text-gray-500">{course.desc}</p>
          </div>
          <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
              />
            </svg>
          </span>
        </div>
      {/each}

      <div class=" opacity-50  relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
        <div>
          <span class=" inline-flex p-3 bg-teal-50 text-teal-700 ring-4 ring-white">
            <Icon src={Clock} theme="" class="h-6 w-6" />
          </span>
        </div>
        <div class="mt-8">
          <h3 class="text-lg font-medium">
            <a href="#" class="focus:outline-none">
              <!-- Extend touch target to entire panel -->
              <span class="absolute inset-0" aria-hidden="true" />
              More to come
            </a>
          </h3>
          <p class="mt-2 text-sm text-gray-500">Working hard on making courses.</p>
        </div>
        <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
            />
          </svg>
        </span>
      </div>
    </div>
  </main>
</div>

<style>
  :global(.prose pre) {
    color: white;
    background-color: black;
  }
</style>
