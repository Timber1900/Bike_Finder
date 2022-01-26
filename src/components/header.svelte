<script lang="ts">
	import TiThMenu from 'svelte-icons/ti/TiThMenu.svelte';
	export let openFunction: () => void;
</script>

<header
	class="relative w-screen h-24 bg-sky-500 flex flex-row justify-center items-center text-4xl font-bold text-white font-sans uppercase shadow-sm rounded-b-md"
>
	<h1 class="flex-grow text-center">Placeholder</h1>
	<div on:click={openFunction} class="text-white w-12 h-12 mx-4">
		<TiThMenu />
	</div>
</header>
