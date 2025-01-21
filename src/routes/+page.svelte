<script lang="ts">
  import TextDialog from "$lib/components/TextDialog.svelte";
  import type { TextData } from "$lib/types";
  import { animate, inView } from "motion";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";

  let { data }: { data: PageData } = $props();

  let text: TextData[] = data.textData;

  onMount(() => {
    inView("#project-card", info  => { animate(info.target, { opacity: [0, 1], y: [50, 0]}, { duration: 0.75, delay: 0.2, ease: "easeInOut" },) });
    inView("#hero-text", info  => { animate(info.target, { opacity: [0, 1], x: [-50, 0]}, { duration: 1, ease: "easeInOut" }) });
  });


</script>

<svelte:head>
  <title>Úvodní stránka | Interiéry CZ</title>
  <meta name="description" content="Interiéry CZ" />
</svelte:head>

<div
  id="hero"
  class="flex relative items-end justify-start z-0 h-[88vh] max-h-screen w-full md:h-screen"
>
  <enhanced:img
    src="/static/uvod/foto_hero.webp"
    class="absolute top-0 right-0 bottom-0 z-0 left-0 w-full h-full object-cover object-top"
    draggable="false"
    sizes="100vw"
    alt="Úvodní obrázek"
  >
  </enhanced:img>
  <div
    id="hero-text"
    class=" max-w-[400px] z-50 xl:ml-48 sm:ml-12 m-4 mb-8 rounded-3xl bg-black bg-opacity-80 backdrop-blur-sm p-8"
  >
    <TextDialog htmlTag="p" className="lg:text-xl text-lg text-white" data={text[0]} />
    <button class="px-8 py-2 mt-4 text-white border rounded-lg">
      Reference &rAarr;
    </button>
  </div>
</div>

<div class="flex flex-col mx-auto lg:px-12 px-4 max-w-[1500px] mt-24">
  <section class="w-full">
    <TextDialog
      htmlTag="h1"
      className="lg:text-6xl text-left text-3xl font-bold"
      data={text[1]}
    />
    <br />
    <div
      class="grid grid-cols-1 lg:grid-cols-[3fr_1fr] lg:grid-rows-3 gap-8 h-full lg:min-h-[500px] max-h-[65vh]"
    >
      <div class="object-cover w-full h-full row-span-3 overflow-hidden drop-shadow-lg rounded-3xl">
        <enhanced:img
          src="/static/uvod/kuchyn1.webp"
          sizes="100vw" 
          class="object-cover w-full h-full "
          alt="f"
          loading="lazy"
        />
      </div>

      <div
        class="hidden w-full h-full row-span-1 overflow-hidden bg-gray-300 drop-shadow-sm lg:block rounded-3xl"
      >
        <div
          class="flex flex-col justify-between w-full h-full gap-2 px-4 pt-5 pb-4 lg:gap-0"
        >
          <div>
            <TextDialog
              htmlTag="span"
              className="px-6 py-1 text-base font-bold lg:border-2 border border-black rounded-2xl"
              data={text[2]}
            />
          </div>
          <TextDialog
            htmlTag="p"
            className="text-base mt-1 leading-6"
            data={text[3]}
          />
          <TextDialog
            htmlTag="span"
            className="lg:text-2xl text-lg font-bold"
            data={text[4]}
          />
        </div>
      </div>
      <div class="hidden object-cover w-full h-full row-span-2 overflow-hidden bg-gray-300 drop-shadow-lg lg:block rounded-3xl">
        <enhanced:img
        src="/static/uvod/zrcadlo.webp"
        alt="f"
        sizes="100vw"
        class="object-cover w-full h-full"
      />
      </div>

    </div>

    <div class="flex flex-row justify-center gap-4 mt-4 lg:gap-32 lg:mt-12">
      <div class="w-full text-center lg:w-48 lg:text-left">
        <TextDialog
          htmlTag="span"
          className="lg:text-5xl text-3xl font-bold"
          data={text[5]}
        />
        <TextDialog
          htmlTag="p"
          className="lg:text-lg text-sm leading-4 lg:leading-10"
          data={text[6]}
        />
      </div>
      <div class="w-full text-center lg:w-48 lg:text-left">
        <TextDialog
          htmlTag="span"
          className="lg:text-5xl text-3xl font-bold"
          data={text[7]}
        />
        <TextDialog
          htmlTag="p"
          className="lg:text-lg text-sm leading-4 lg:leading-10"
          data={text[8]}
        />
      </div>
      <div class="w-full text-center lg:w-48 lg:text-left">
        <TextDialog
          htmlTag="span"
          className="lg:text-5xl text-3xl font-bold"
          data={text[9]}
        />
        <TextDialog
          htmlTag="p"
          className="lg:text-lg text-sm leading-4 lg:leading-10"
          data={text[10]}
        />
      </div>
    </div>
  </section>

  <section class="w-full my-24 lg:my-44">
    <div
      class="flex flex-col items-center justify-center w-full h-full gap-8 lg:flex-row"
    >
      <enhanced:img
        class="object-contain w-full h-full drop-shadow-lg basis-3/5 rounded-3xl"
        src="/static/uvod/kuchyn2.webp"
        alt="obrazek"
        sizes="100vw"
      />
      <div class="basis-2/3">
        <TextDialog
          htmlTag="h2"
          className="lg:text-4xl text-3xl font-bold"
          data={text[11]}
        />
        <TextDialog
          htmlTag="p"
          className="mt-4 lg:text-lg text-base leading-5 lg:leading-normal"
          data={text[12]}
        />
        <button
          class="px-8 py-2 mt-4 text-white bg-black border rounded-lg color-white"
          >O Nás &rAarr;</button
        >
      </div>
    </div>
  </section>

  <section class="w-full">
    <TextDialog
      htmlTag="h3"
      className="lg:text-5xl text-3xl font-bold"
      data={text[13]}
    />
    <div
      class="grid h-full grid-cols-1 grid-rows-1 gap-8 mt-8 grid-flow-column lg:grid-cols-3 lg:grid-rows-5 lg:max-h-screen"
    >
      <a
        aria-label="Project card"
        id="project-card"
        href="/"
        class="overflow-hidden shadow-xl bg-gray-300 lg:row-span-2 drop-shadow-lg min-h-56 brightness-100 rounded-3xl"
      >
        <enhanced:img
          src="/static/uvod/uvod_skrin.webp"
          alt="Skrin"
          class="object-cover w-full h-full"
        />
      </a>
      <a
      aria-label="Project card"

        id="project-card"
        href="/"
        class="overflow-hidden shadow-xl bg-gray-300 lg:row-span-3 drop-shadow-lg min-h-56 brightness-100 rounded-3xl"
      >
        <enhanced:img
          src="/static/uvod/uvod_kuchyn3.webp"
          alt="Kuchyne"
          class="object-cover w-full h-full"
        />
      </a>
      <a
      aria-label="Project card"

        id="project-card"
        href="/"
        class="overflow-hidden shadow-xl bg-gray-300 lg:row-span-2 drop-shadow-lg min-h-56 brightness-100 rounded-3xl"
      >
        <enhanced:img
          src="/static/uvod/uvod_vitrina.webp"
          alt="Vitrina"
          class="object-cover w-full h-full"
        />
      </a>
      <a
      aria-label="Project card"

        id="project-card"
        href="/"
        class="overflow-hidden shadow-xl bg-gray-300 lg:row-span-3 drop-shadow-lg min-h-56 brightness-100 rounded-3xl"
      >
        <enhanced:img
          src="/static/uvod/uvod_satna.webp"
          alt="Satna"
          class="object-cover w-full h-full"
        />
      </a>
      <a
      aria-label="Project card"

        id="project-card"
        href="/"
        class="overflow-hidden shadow-xl bg-gray-300 lg:row-span-3 drop-shadow-lg min-h-56 brightness-100 rounded-3xl"
      >
        <enhanced:img
          src="/static/uvod/uvod_loznice.webp"
          alt="Loznice"
          class="object-cover w-full h-full"
        />
      </a>
      <a
      aria-label="Project card"

        id="project-card"
        href="/"
        class="overflow-hidden shadow-xl bg-gray-300 lg:row-span-2 drop-shadow-lg min-h-56 rounded-3xl"
      >
        <enhanced:img
          src="/static/uvod/uvod_kuchyn4.webp"
          alt="Kuchyne 2"
          class="object-cover w-full h-full"
        />
      </a>
    </div>
  </section>
</div>
