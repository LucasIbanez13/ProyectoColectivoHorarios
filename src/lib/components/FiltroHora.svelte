<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  export let destino = '';
  export let zona = '';

  let horaActual = '';
  let horaFiltro = '';

  const dispatch = createEventDispatcher();

  function actualizarHora() {
    const ahora = new Date();
    horaActual = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  let timer;
  onMount(() => {
    actualizarHora();
    timer = setInterval(actualizarHora, 1000);
  });

  onDestroy(() => {
    clearInterval(timer);
  });

  function aplicarFiltro() {
    dispatch('filtrar', { hora: horaFiltro, destino, zona });
  }
</script>

<div class="p-4 bg-transparent">
  <p class="mb-2 font-semibold text-gray-700 select-none">🕒 Hora actual: {horaActual}</p>

  <label for="horaFiltro" class="block mb-1 font-semibold text-gray-600">Filtrar por hora:</label>
  <input
    id="horaFiltro"
    type="time"
    bind:value={horaFiltro}
    class="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
  />

  <button
  class="mt-4 w-full rounded-md bg-indigo-600 text-white font-medium py-3
         shadow-md hover:bg-indigo-700 transition-colors duration-200
         focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50
         disabled:opacity-50 disabled:cursor-not-allowed"
  on:click={aplicarFiltro}
  disabled={!horaFiltro}
>
  Buscar
</button>


</div>
