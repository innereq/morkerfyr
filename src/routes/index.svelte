<script>
	import Player from '../components/Player.svelte';
	import History from '../components/History.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<style>
</style>

<svelte:head>
	<title>Mörkerfyr Radio</title>
</svelte:head>

<div class="flex flex-col justify-between p-4 min-h-screen">
	<div>
		<Player/>
	</div>
	<div class="flex-1">
		<History/>
	</div>
	<div>
		<Footer/>
	</div>
</div>