<script>
	import '../app.css';
	import Modal from '../components/modal.svelte';
	import Header from '../components/header.svelte';
	import Popup from '../components/popup.svelte';
	import { onMount } from 'svelte';
	import { curLocation } from '../stores/curLocation';

	let show = false;
	onMount(() => {
		curLocation.set(localStorage.getItem('prevLoc'));
	});
</script>

<div class="w-screen h-screen relative z-0 overflow-hidden ">
	<Modal {show} closeFunction={() => (show = false)} />
	<Popup {show} closeFunction={() => (show = false)} />
	<div
		class="z-0 bg-gradient-to-br from-green-gradient-2a to-green-gradient-2b opacity-[56%] absolute inset-0 pointer-events-none"
	/>
	<div class={`h-screen z-40 ${show ? 'blur-[1px]' : ''} transition-all overflow-x-hidden`}>
		<Header openFunction={() => (show = true)} />
		<slot />
	</div>
</div>
