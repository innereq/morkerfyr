<script>
	import DarkMode from "svelte-dark-mode";
	import { afterUpdate } from "svelte";

	export let segment;

	let theme;

	$: switchTheme = theme === "dark" ? "" : "dark";

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
	
	nav {
		padding-bottom: 1.25em;
	}
</style>

<DarkMode bind:theme />

<nav class="flex">
	<div class="flex-1">
		<div class="flex justify-center items-center">
			<a class="{segment === undefined ? "selected" : undefined}" href=".">Радио</a>
			<a rel=prefetch class="{segment === "posts" ? "selected" : undefined}" href="posts">Рецензии</a>
		</div>
	</div>
	<div class="flex-1">
		<div class="flex justify-center items-center">
			<button on:click={() => { theme = switchTheme; }}>
				{#if switchTheme }
					🌙
				{:else}
					☀️
				{/if}
			</button>
		</div>
	</div>
</nav>