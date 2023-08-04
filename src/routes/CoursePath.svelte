<script lang="ts">
  import { onMount } from "svelte";
  import { Link, useLocation, useParams } from "svelte-navigator";

  const location = useLocation();
  const params = useParams();

  interface PlanType {
    id: string;
    title: string;
    lang: string;
    lessons: LessonsType[];
  }

  interface LessonsType {
    id: string;
    title: string;
    pic: string;
  }

  let plan: PlanType = null;
  let lessons: LessonsType[] = [];

  onMount(async () => {
    plan = await (await fetch(`units/${$params.course}/lesson-plan.json`)).json();
    lessons = plan.lessons;
  });
</script>

<div class="">
  <header class="sticky top-0">
    <div class="flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 py-4">
      <h1 class="text-2xl font-bold leading-tight text-gray-900 w-full focus:outline-none">Course Lessons</h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="bg-white">
        <div class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
          <div class="space-y-12">
            <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
              <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">{plan?.title}</h2>
            </div>

            <ul class="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl">
              {#each lessons as lesson}
                <li>
                  <Link to={lesson.id}>
                    <div class="space-y-6 cursor-pointer">
                      <img class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 border shadow bg-cover" src={lesson.pic} alt={lesson.title} />
                      <div class="space-y-2">
                        <div class="text-lg leading-6 font-medium space-y-1">
                          <h3>{lesson.title}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              {/each}
              <li>
                <div class="space-y-6">
                  <img
                    class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 border shadow bg-cover"
                    src="https://openmoji.org/data/color/svg/1F373.svg"
                    alt="" />
                  <div class="space-y-2">
                    <div class="text-lg leading-6 font-medium space-y-1">
                      <h3>More to come...</h3>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
