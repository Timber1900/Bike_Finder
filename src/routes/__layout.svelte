<script>
	import '../app.css';
	import Modal from '../components/modal.svelte';
	import Header from '../components/header.svelte';
	import Popup from '../components/popup.svelte';

	let show = true;
</script>

<div class="bg-white w-screen h-screen relative z-0">
	<Modal {show} closeFunction={() => (show = false)} />
	<Popup {show} />
	<div class={`z-30 ${show ? 'blur-[1px]' : ''}`}>
		<Header openFunction={() => (show = true)} />
		<slot />
	</div>
</div>
