<script lang="ts">
	export let show: boolean;
</script>

<div
	class={`w-screen h-80 absolute -bottom-80 inset-x-0 bg-blue-600 z-20 rounded-t-lg ${
		show ? '-translate-y-80' : 'translate-y-0'
	} transition-transform duration-300`}
/>
