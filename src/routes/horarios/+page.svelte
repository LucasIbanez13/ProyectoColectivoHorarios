<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { getHorarios } from '$lib/utils/sheets';
  import { filtrarPorZonaDestino, filtrarPorHora } from '$lib/utils/filtros';
  import Loader from '$lib/components/Loader.svelte';

  let horarios = [];
  let cargando = true;
  let destino, zona;

  $: query = $page.url.searchParams;
  $: destino = query.get('destino');
  $: zona = query.get('zona');

  onMount(async () => {
    const data = await getHorarios();
    const filtrados = filtrarPorZonaDestino(data, zona, destino);
    const horaActual = new Date().toTimeString().slice(0,5);
    horarios = filtrarPorHora(filtrados, horaActual);
    cargando = false;
  });
</script>

{#if cargando}
  <Loader mensaje="Cargando horarios..." />
{:else}
  <div class="p-4">
    <h2 class="mb-4 text-lg">Horarios para Zona {zona} → {destino}</h2>
    {#if horarios.length === 0}
      <p>No hay colectivos en este rango de hora.</p>
    {:else}
      <ul class="space-y-2">
        {#each horarios as h}
          <li class="p-4 rounded bg-base-200 shadow">{h.hora} - {h.descripcion}</li>
        {/each}
      </ul>
    {/if}
  </div>
{/if}
