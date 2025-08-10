<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let destino;
  $: destino = $page.url.searchParams.get('destino');

  function elegirZona(zona) {
    goto(`/horarios?destino=${destino}&zona=${zona}`);
  }
</script>

<div class="p-6">
  <h2 class="text-xl mb-4">Destino: {destino}</h2>
  <div class="grid grid-cols-3 gap-4">
    {#each Array(7) as _, i}
      <button class="btn btn-accent" on:click={() => elegirZona(i + 1)}>
        Zona {i + 1}
      </button>
    {/each}
  </div>
</div>
