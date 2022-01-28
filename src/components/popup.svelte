<script lang="ts">
	export let show: boolean;
	export let closeFunction: () => void;

	const items: { name: string; index: number; path: string }[] = [
		{ name: 'Main', index: 0, path: '/' },
		{ name: 'Favorites', index: 1, path: '/favorites' },
		{ name: 'Settings', index: 2, path: '/settings' }
	];
</script>

<div
	class={`h-[30%] absolute -bottom-[30%] inset-x-0 mx-auto bg-gradient-to-br from-[#469D89] to-[#248277] z-50 rounded-2xl ${
		show ? '-translate-y-[110%] scale-100' : 'translate-y-0 scale-90'
	} transition-transform duration-300  shadow-sm origin-bottom w-[364px]`}
>
	<div
		class={`${
			show ? 'visible delay-0' : 'invisible delay-300'
		} transition-all py-2 grid grid-rows-3 divide-y divide-[#14746F] px-4 h-full `}
	>
		{#each items as { name, index, path }}
			<div
				class="text-4xl text-white font-bold opacity-100 text-center flex justify-center items-center w-full"
			>
				<a on:click={closeFunction} href={path}>{name}</a>
			</div>
		{/each}
	</div>
</div>
