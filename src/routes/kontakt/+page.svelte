<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<br>

<div class="flex flex-col mx-auto px-12 max-w-[1400px] mt-32">
    <h1 class="text-6xl font-bold">Kontaktujte Nás</h1>

    <div class="flex gap-8 mt-16">
        <div class="basis-1/2">
            <p>example@seznam.cz</p>
        </div>

        <div>
            <iframe class="rounded-3xl" title="mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1099.3760180802428!2d17.45530305056672!3d49.071363874249876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713143b75ae3a49%3A0x1ec15ba40851cd55!2sInteri%C3%A9ry%20CZ%20s.r.o.!5e0!3m2!1scs!2scz!4v1733258884418!5m2!1scs!2scz" width="600" height="450" style="border:0;"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        </div>
    </div>
</div>