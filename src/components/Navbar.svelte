<script>
  import DarkMode from "svelte-dark-mode";
  import { afterUpdate } from "svelte";

  // Tells our Navbar on which page we currently are.
  export let segment;

  // Theme switcher.
  // https://metonym.github.io/svelte-dark-mode
  // https://github.com/metonym/svelte-dark-mode
  let theme;
  $: switchTheme = theme === "dark" ? "light" : "dark";
  afterUpdate(() => {
    document.body.className = theme;
  });
</script>

<style>
  a {
    padding-right: 1em;
  }

  .selected {
    font-weight: 700;
  }
</style>

<!-- Theme switcher. -->
<DarkMode bind:theme />

<nav class="flex pb-5">
  <div class="flex-1">
    <div class="flex md:justify-center justify-start items-center">
      <a
        class={segment === undefined ? 'selected' : undefined}
        href=".">Радио</a>
      <a
        rel="prefetch"
        class={segment === 'posts' ? 'selected' : undefined}
        href="posts">Рецензии</a>
    </div>
  </div>
  <div class="flex-1">
    <div class="flex md:justify-center justify-end items-center">
      <button
        on:click={() => {
          theme = switchTheme;
        }}>
        💡
      </button>
    </div>
  </div>
</nav>
