<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { getHorarios } from '$lib/utils/sheets';
  import { filtrarPorZonaDestino, filtrarPorHora } from '$lib/utils/filtros';
  import Loader from '$lib/components/Loader.svelte';
  import HorarioCard from '$lib/components/HorarioCard.svelte';

  let horarios = [];
  let cargando = true;
  let destino, zona;

  $: query = $page.url.searchParams;
  $: destino = query.get('destino');
  $: zona = query.get('zona');

  onMount(async () => {
    const data = await getHorarios();
    const filtrados = filtrarPorZonaDestino(data, zona, destino);

    const ahora = new Date();
    const horaStr = ahora.toTimeString().slice(0,5);
    horarios = filtrarPorHora(filtrados, horaStr);
    cargando = false;
  });
</script>

{#if cargando}
  <Loader mensaje="Cargando horarios..." />
{:else}
  <div class="p-4 grid gap-4">
    {#each horarios as h}
      <HorarioCard {h} />
    {/each}
  </div>
{/if}
