<script>
	import Index from '../components/Index.svelte';
	import RadioPlayer from '../components/RadioPlayer.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<style>
</style>

<svelte:head>
	<title>Mörkerfyr Radio</title>
</svelte:head>

<div class="flex flex-col justify-between p-4 min-h-screen">
	<div>
		<Index/>
	</div>
	<div class="flex-1">
		<RadioPlayer/>
	</div>
	<div>
		<Footer/>
	</div>
</div>