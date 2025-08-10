<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { getHorarios } from '$lib/utils/sheets';
  import { filtrarPorZonaDestino, filtrarPorHora } from '$lib/utils/filtros';
  import Loader from '$lib/components/Loader.svelte';
  import FiltroHora from '$lib/components/FiltroHora.svelte';

  let horarios = [];
  let cargando = true;
  let destino, zona;
  let horaFiltro = '';

  $: query = $page.url.searchParams;
  $: destino = query.get('destino');
  $: zona = query.get('zona');

  async function cargarHorarios(hora) {
    cargando = true;
    console.log('Cargando horarios con:', { destino, zona, hora });
    const data = await getHorarios();
    console.log('Datos totales:', data);
    let filtrados = filtrarPorZonaDestino(data, zona, destino);
    console.log('Filtrados por destino y zona:', filtrados);

    if (!hora) {
      hora = new Date().toTimeString().slice(0, 5);
    }
    horarios = filtrarPorHora(filtrados, hora);
    console.log('Filtrados por hora:', horarios);
    cargando = false;
  }

  onMount(() => {
    cargarHorarios(horaFiltro);
  });

  function manejarFiltro(event) {
    horaFiltro = event.detail.hora;
    console.log('Filtro cambiado:', horaFiltro);
    cargarHorarios(horaFiltro);
  }
</script>

<FiltroHora {destino} {zona} on:filtrar={manejarFiltro} />

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
