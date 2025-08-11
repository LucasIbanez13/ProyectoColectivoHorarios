<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { getHorarios } from '$lib/utils/sheets';

  let destino;
  $: destino = $page.url.searchParams.get('destino');

  let zonas = [];
  let cargando = true;

  async function cargarZonas() {
    const data = await getHorarios();
    const filtrado = data.filter(h => h.destino?.toLowerCase() === destino?.toLowerCase());
    zonas = [...new Set(filtrado.map(h => h.zona))].sort((a, b) => a - b);
    cargando = false;
  }

  function elegirZona(zona) {
    goto(`/horarios?destino=${destino}&zona=${zona}`);
  }

  onMount(cargarZonas);

  // Colores para los botones (puedes agregar más si tienes muchas zonas)
  const colores = [
    'bg-indigo-500 hover:bg-indigo-600',
    'bg-pink-500 hover:bg-pink-600',
    'bg-green-500 hover:bg-green-600',
    'bg-yellow-500 hover:bg-yellow-600',
    'bg-purple-500 hover:bg-purple-600',
    'bg-red-500 hover:bg-red-600',
    'bg-teal-500 hover:bg-teal-600'
  ];
</script>

<div class="p-6">
  <h2 class="text-xl mb-6 font-semibold text-center text-gray-800 dark:text-gray-100">
    Destino: <span class="text-primary capitalize">{destino}</span>
  </h2>

  {#if cargando}
    <p class="text-center text-gray-600 dark:text-gray-400">Cargando zonas...</p>
  {:else if zonas.length === 0}
    <p class="text-center text-red-500 font-semibold">No se encontraron zonas para este destino.</p>
  {:else}
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md mx-auto">
      {#each zonas as zona, i}
        <button
          class={`text-white font-semibold py-3 rounded-lg shadow-lg transition-transform transform active:scale-95 ${colores[i % colores.length]}`}
          on:click={() => elegirZona(zona)}
          aria-label={`Seleccionar zona ${zona}`}
        >
          Zona {zona}
        </button>
      {/each}
    </div>
  {/if}
</div>
