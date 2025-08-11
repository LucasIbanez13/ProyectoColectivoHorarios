<script>
  import { goto } from '$app/navigation';
  let mostrarAviso = true;

  function elegirDestino(destino) {
    goto(`/mapa?destino=${destino}`);
  }
</script>

<div class="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-6 relative">
  <!-- Título -->
  <h1 class="text-4xl font-extrabold mb-6 drop-shadow-lg text-center">
    🚍 Línea BfB  
    <span class="block text-lg font-normal mt-2">¿A dónde vas?</span>
  </h1>

  <!-- Aviso tipo banner -->
  {#if mostrarAviso}
    <div class="absolute bottom-6 w-[95%] max-w-lg flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-md bg-white/30 border border-white/40 text-sm">
      <span class="flex-1 text-center text-white">
        ⚠️ Los horarios no son exactos.  
        Llegá 10 a 20 minutos antes a la parada.
      </span>
      <button
        class="text-white font-bold hover:text-red-200"
        on:click={() => mostrarAviso = false}
      >
        ✖
      </button>
    </div>
  {/if}

  <!-- Contenedor de botones -->
  <div class="flex flex-col gap-4 w-full max-w-xs">
    <button
      class="bg-yellow-400 text-black font-semibold py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
      on:click={() => elegirDestino('centro')}
    >
      Ir al Centro
    </button>
    <button
      class="bg-green-400 text-black font-semibold py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
      on:click={() => elegirDestino('campo')}
    >
      Ir al Campo
    </button>
  </div>
</div>
