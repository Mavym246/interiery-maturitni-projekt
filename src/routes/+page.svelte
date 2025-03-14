<script lang="ts">
  import TextDialog from "$lib/components/TextDialog.svelte";
  import type { TextData } from "$lib/types";
  import { animate, inView } from "motion";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";

  let { data }: { data: PageData } = $props();
  let text: TextData[] = data.textData;

  const heroImages = [
    "/uvod/foto_hero.webp",
    "/uvod/foto_hero2.webp",
    "/uvod/foto_hero3.webp",
  ] as const;

  const state = $state({
    currentImageIndex: 0,
  });

  const kenBurnsEffect = async () => {
    let isRunning = true;
    
    while (isRunning) {
      try {
        await animate(
          "#hero-image",
          {
            opacity: [0, 1, 1, 0],
            scale: [1, 1.15],
          },
          {
            duration: 12,
            ease: "linear",
            times: [0, 0.2, 0.8, 1],
          }
        ).then(() => {
          if (isRunning) {
            state.currentImageIndex = (state.currentImageIndex + 1) % heroImages.length;
          }
        });
      } catch (e) {
        isRunning = false;
      }
    }
    
    return () => {
      isRunning = false;
    };
  };

  onMount(() => {
    let cleanupFn: (() => void) | undefined;
    
    kenBurnsEffect().then(cleanup => {
      cleanupFn = cleanup;
    });

    // Preload images
    heroImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    inView("#project-card", (info) => {
      animate(
        info.target,
        { opacity: [0, 1], y: [50, 0] },
        { duration: 0.75, delay: 0.2, ease: "easeInOut" }
      );
    });

    inView("#hero-text", (info) => {
      animate(
        info.target,
        { opacity: [0, 1], x: [-50, 0] },
        { duration: 1, delay: 1.5, ease: "easeInOut" }
      );
    });

    return () => {
      cleanupFn?.();
    };
  });
</script>

<svelte:head>
  <title>Úvodní stránka | Interiéry CZ</title>
  <meta name="description" content="Interiéry CZ" />
</svelte:head>

<div
  id="hero"
  class="flex relative items-end justify-start z-0 h-[88vh] max-h-screen bg-black overflow-hidden w-full lg:h-screen"
>
  <img
    id="hero-image"
    src={heroImages[state.currentImageIndex]}
    class="object-cover object-top absolute top-0 right-0 bottom-0 left-0 z-0 w-full h-full"
    loading="eager"
    draggable="false"
    sizes="100vw"
    alt="Úvodní obrázek"
  />
  <div
    id="hero-text"
    class="max-w-[400px] z-50 xl:ml-34 sm:ml-12 m-4 mb-8 rounded-3xl bg-black/80 backdrop-blur-xs p-8"
  >
    <TextDialog
      htmlTag="p"
      className="lg:text-xl text-lg text-white mb-6"
      data={text[0]}
    />
    <a
      href="/realizace"
      class="px-8 py-2 text-white rounded-lg border transition ease-in-out hover:bg-white hover:text-black duration-10000"
    >
      Realizace &rAarr;
    </a>
  </div>
</div>

<div class="flex flex-col mx-auto md:px-12 px-4 max-w-[1500px] mt-24">
  <section class="w-full">
    <TextDialog
      htmlTag="h1"
      className="lg:text-6xl md:text-5xl sm:text-4xl text-left text-3xl font-extrabold"
      data={text[1]}
    />
    <br />
    <div
      class="grid grid-cols-1 lg:grid-cols-[3fr_1fr] lg:grid-rows-3 gap-8 h-full lg:max-h-[500px] xl:min-h-[600px]"
    >
      <div
        class="object-cover overflow-hidden row-span-3 w-full h-full rounded-3xl drop-shadow-lg"
      >
        <enhanced:img
          src="/static/uvod/kuchyn1.webp"
          sizes="100vw"
          class="object-cover w-full h-full"
          alt="Kuchyň"
          id="kuchyn"
        />
      </div>

      <div
        class="hidden overflow-hidden row-span-1 w-full h-full bg-gray-300 rounded-3xl drop-shadow-xs lg:block"
      >
        <div
          class="flex flex-col gap-2 justify-between px-4 pt-5 pb-4 w-full h-full lg:gap-0"
        >
          <div>
            <TextDialog
              htmlTag="span"
              className="px-6 py-1 text-base font-bolder lg:border-2 border border-black rounded-2xl"
              data={text[2]}
            />
          </div>
          <TextDialog
            htmlTag="p"
            className="xl:text-base lg:text-sm mt-1  leading-6"
            data={text[3]}
          />
          <TextDialog
            htmlTag="span"
            className="xl:text-2xl lg:text-lg text-lg font-bold"
            data={text[4]}
          />
        </div>
      </div>
      <div
        class="hidden object-cover overflow-hidden row-span-2 w-full h-full bg-gray-300 rounded-3xl drop-shadow-lg lg:block"
      >
        <enhanced:img
          src="/static/uvod/zrcadlo.webp"
          alt="f"
          sizes="100vw"
          class="object-cover w-full h-full"
        />
      </div>
    </div>

    <div class="flex flex-row gap-4 justify-center mt-4 lg:gap-32 md:mt-12">
      <div class="w-full text-center lg:w-48 lg:text-left">
        <TextDialog
          htmlTag="span"
          className="md:text-5xl text-3xl font-bold"
          data={text[5]}
        />
        <TextDialog
          htmlTag="p"
          className="md:text-lg text-sm leading-4 lg:leading-10"
          data={text[6]}
        />
      </div>
      <div class="w-full text-center lg:w-48 lg:text-left">
        <TextDialog
          htmlTag="span"
          className="md:text-5xl text-3xl font-bold"
          data={text[7]}
        />
        <TextDialog
          htmlTag="p"
          className="md:text-lg text-sm leading-4 lg:leading-10"
          data={text[8]}
        />
      </div>
      <div class="w-full text-center lg:w-48 lg:text-left">
        <TextDialog
          htmlTag="span"
          className="md:text-5xl text-3xl font-bold"
          data={text[9]}
        />
        <TextDialog
          htmlTag="p"
          className="md:text-lg text-sm leading-4 lg:leading-10"
          data={text[10]}
        />
      </div>
    </div>
  </section>

  <section class="my-24 w-full lg:my-44">
    <div
      class="flex flex-col gap-8 justify-center items-center w-full h-full lg:flex-row"
    >
      <enhanced:img
        class="object-contain w-full h-full rounded-3xl drop-shadow-lg basis-3/5"
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
          className="mt-4 lg:text-lg text-base leading-5 mb-6 lg:leading-normal"
          data={text[12]}
        />
        <a
          href="/o-nas"
          class="px-8 py-2 mt-4 text-white bg-black rounded-lg border color-white"
          >O Nás &rAarr;</a
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
      class="grid grid-cols-1 grid-rows-1 gap-8 mt-8 h-full grid-flow-column lg:grid-cols-3 lg:grid-rows-5 lg:max-h-screen"
    >
      <a
        aria-label="Project card"
        id="project-card"
        href="/"
        class="max-h-[500px] lg:max-h-full overflow-hidden shadow-xl bg-gray-300 lg:row-span-2 drop-shadow-lg min-h-56 brightness-100 rounded-3xl"
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
        class="max-h-[500px] lg:max-h-full overflow-hidden shadow-xl bg-gray-300 lg:row-span-3 drop-shadow-lg min-h-56 brightness-100 rounded-3xl"
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
        class="max-h-[500px] lg:max-h-full overflow-hidden shadow-xl bg-gray-300 lg:row-span-2 drop-shadow-lg min-h-56 brightness-100 rounded-3xl"
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
        class="max-h-[500px] lg:max-h-full overflow-hidden shadow-xl bg-gray-300 lg:row-span-3 drop-shadow-lg min-h-56 brightness-100 rounded-3xl"
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
        class="max-h-[500px] lg:max-h-full overflow-hidden shadow-xl bg-gray-300 lg:row-span-3 drop-shadow-lg min-h-56 brightness-100 rounded-3xl"
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
        class="max-h-[500px] lg:max-h-full overflow-hidden shadow-xl bg-gray-300 lg:row-span-2 drop-shadow-lg min-h-56 rounded-3xl"
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
