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
    const data = await getHorarios();
    let filtrados = filtrarPorZonaDestino(data, zona, destino);

    if (!hora) {
      hora = new Date().toTimeString().slice(0, 5);
    }
    horarios = filtrarPorHora(filtrados, hora);
    cargando = false;
  }

  onMount(() => {
    cargarHorarios(horaFiltro);
  });

  function manejarFiltro(event) {
    horaFiltro = event.detail.hora;
    cargarHorarios(horaFiltro);
  }
</script>

<div class="max-w-md mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-md">
  <FiltroHora {destino} {zona} on:filtrar={manejarFiltro} />

  {#if cargando}
    <div class="flex justify-center py-8">
      <Loader mensaje="Cargando horarios..." />
    </div>
  {:else}
    <div class="mt-6">
      <h2 class="mb-5 text-xl font-semibold text-gray-700 text-center">
        Horarios para Zona <span class="text-indigo-500">{zona}</span> → <span class="capitalize text-indigo-500">{destino}</span>
      </h2>

      {#if horarios.length === 0}
        <p class="text-center text-red-600 italic font-semibold">
          No hay colectivos en este rango de hora.
        </p>
      {:else}
        <ul class="space-y-3">
          {#each horarios as h}
            <li class="p-4 bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-default">
              <span class="text-indigo-600 font-medium">{h.hora}</span> - <span class="text-gray-700">{h.descripcion}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
</div>

