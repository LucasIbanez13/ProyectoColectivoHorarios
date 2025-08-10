<script>
  import { goto } from '$app/navigation';
  function elegirDestino(destino) {
    goto(`/mapa?destino=${destino}`);
  }
</script>

<div class="flex flex-col items-center justify-center h-screen gap-4">
  <h1 class="text-2xl font-bold">¿A dónde vas?</h1>
  <button class="btn btn-primary w-40" on:click={() => elegirDestino('centro')}>Centro</button>
  <button class="btn btn-secondary w-40" on:click={() => elegirDestino('campo')}>Campo</button>
</div>
