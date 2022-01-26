<script lang="ts">
	export let closeFunction: () => void;
	export let show: boolean;
</script>

<div
	on:click={closeFunction}
	class={`absolute inset-0 z-10 bg-black ${
		show ? 'pointer-events-auto opacity-70 visible' : 'pointer-events-none opacity-0 invisible'
	} transition-all duration-300`}
/>
