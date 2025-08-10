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

<div class="p-4 border rounded shadow bg-base-100">
  <p class="mb-2 font-semibold">🕒 Hora actual: {horaActual}</p>

  <label for="horaFiltro" class="block mb-1 font-semibold">Filtrar por hora:</label>
  <input
    id="horaFiltro"
    type="time"
    bind:value={horaFiltro}
    class="border rounded p-2 w-full"
  />
  <button
    class="btn btn-primary mt-2 w-full"
    on:click={aplicarFiltro}
    disabled={!horaFiltro}
  >
    Aplicar filtro
  </button>
</div>
