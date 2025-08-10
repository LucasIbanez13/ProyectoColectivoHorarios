<script>
  import { goto } from '$app/navigation';
  export let destino;

  function elegirZona(zona) {
    goto(`/horarios?destino=${destino}&zona=${zona}`);
  }
</script>

<div class="grid grid-cols-3 gap-4 p-4">
  {#each Array(7) as _, i}
    <button class="btn btn-accent" on:click={() => elegirZona(i + 1)}>
      Zona {i + 1}
    </button>
  {/each}
</div>
