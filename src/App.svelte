<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator";
  import Lesson from "./routes/Lesson.svelte";
  import CoursePath from "./routes/CoursePath.svelte";
  import CourseList from "./routes/CourseList.svelte";
</script>

<svelte:head>
  <script src="https://sdk.amazonaws.com/js/aws-sdk-2.410.0.min.js"></script>
</svelte:head>

<div class="min-h-full">
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center justify-center">
            <img class="block h-8 w-auto" src="{import.meta.env.BASE_URL}assets/mini-logo.svg" alt="Mini Logo" />
            <p class="hidden lg:block h-8 w-auto leading-8 ml-4 font-bold">Mini: The Minimal Language</p>
          </div>
          <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <a
              href={import.meta.env.BASE_URL}
              class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              aria-current="page"
            >
              Lessons
            </a>
          </div>
        </div>

        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!--
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!--
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            -->
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden hidden" id="mobile-menu">
      <div class="pt-2 pb-3 space-y-1">
        <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" -->
        <a
          href={import.meta.env.BASE_URL}
          class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          aria-current="page"
        >
          Lessons
        </a>
      </div>
    </div>
  </nav>

  <main>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Router>
        <Route path="mini-lang/">
          <CourseList />
        </Route>
        <Route path="mini-lang/:course">
          <CoursePath />
        </Route>
        <Route path="mini-lang/:course/:lessonId">
          <Lesson />
        </Route>
      </Router>
    </div>
  </main>
</div>
