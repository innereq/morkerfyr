<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="flex h-screen justify-center items-center text-center">
  <div>
    <h1 class="text-4xl">{status}</h1>
    <p>{error.message}</p>
  </div>
</div>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
