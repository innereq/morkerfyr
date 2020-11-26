<script>
  import { SITE_URL } from "../../morkerfyr.config";
  import Player from "../components/Player.svelte";
  import History from "../components/History.svelte";

  const title = "Mörkerfyr Radio";
</script>

<style>
</style>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content="{title}" />
  <meta property="og:url" content="{SITE_URL}/" />
  <meta property="og:image" content="{SITE_URL}/logo-512.png" />
  <meta property="og:description" content="Музыка, пони. Пони, музыка. Йей!" />
  <meta property="og:audio" content="{SITE_URL}:8443/stream" />
</svelte:head>

<Player />
<History />
