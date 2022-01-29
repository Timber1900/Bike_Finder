<script lang="ts">
	import { locations } from '../stores/locations';
	import { curLocation } from '../stores/curLocation';
	import axios from 'axios';
	import type { Networks } from '../types/networks';
	import { LocationSort } from '../functions/location';

	let searchTerms = '';
	const URL = 'https://api.citybik.es/v2/networks/';

	$: $curLocation, update();

	const update = () => {
		localStorage.setItem('prevLoc', $curLocation);
	};

	const getLocation = async () => {
		const res = await axios.get<Networks>(URL, {});
		locations.set(res.data);

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((loc) => {
				const tempVal = [...$locations.networks];
				tempVal.sort((a, b) => LocationSort(a, b, loc));
				locations.set({ networks: tempVal });
			});
		}
	};
</script>

<div class="w-full h-[calc(100%-6rem)] flex flex-col items-center justify-cente z-40">
	<div class="w-full p-4 z-40">
		<input
			class="bg-lime-200 px-2 py-1 rounded-md w-full shadow-sm border-black border"
			placeholder="Search"
			on:input={(event) => {
				searchTerms = event.currentTarget.value;
			}}
			type="text"
		/>
	</div>
	<ul class="w-full relative overflow-scroll z-40">
		{#each $locations.networks as { location }, i}
			{#if location.city.toLowerCase().startsWith(searchTerms.toLowerCase()) || location.country
					.toLowerCase()
					.startsWith(searchTerms.toLowerCase())}
				<li
					class="my-0.5 flex flex-row justify-center gap-4 px-4 w-full relative active:bg-lime-200 hover:bg-lime-100 transition-colors bg-lime-50 duration-300"
					on:click={() => {
						curLocation.set($locations.networks[i].id);
						console.log($locations.networks[i].id);
					}}
				>
					<div class="grow text-left text-lg font-semibold">
						{location.city}
					</div>
					<p class="ml-auto text-base">{location.country}</p>
				</li>
			{/if}
		{/each}
	</ul>
	<button on:click={getLocation} class="button z-40">Get locations</button>
</div>
