<script lang="ts">
	import TiThMenu from 'svelte-icons/ti/TiThMenu.svelte';
	export let openFunction: () => void;
</script>

<header
	class="relative w-screen h-24 flex flex-row justify-center items-center text-4xl font-bold text-white font-sans uppercase rounded-b-md"
>
	<h1 class="flex-grow text-center text-shadow-sm">Placeholder</h1>
	<div on:click={openFunction} class="text-white w-12 h-12 mx-4">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			class="svg w-full h-auto max-h-full text-white"
			><path
				d="M19 17h-14c-1.103 0-2 .897-2 2s.897 2 2 2h14c1.103 0 2-.897 2-2s-.897-2-2-2zM19 10h-14c-1.103 0-2 .897-2 2s.897 2 2 2h14c1.103 0 2-.897 2-2s-.897-2-2-2zM19 3h-14c-1.103 0-2 .897-2 2s.897 2 2 2h14c1.103 0 2-.897 2-2s-.897-2-2-2z"
			/></svg
		>
	</div>
</header>

<style>
	.svg {
		filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.4));
		fill: currentColor;
		stroke: currentColor;
		stroke-width: 0;
	}
</style>
