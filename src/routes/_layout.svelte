<script>
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';

	export let segment;
</script>

<style>
</style>

<main class="mx-auto container min-h-screen">
	<div class="flex flex-col justify-between p-4 min-h-screen">
		<Navbar {segment} />
		<div class="flex-1">
			<slot></slot>
		</div>
		<Footer/>
	</div>
</main>