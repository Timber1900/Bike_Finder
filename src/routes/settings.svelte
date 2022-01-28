<script lang="ts">
	import { locations } from '../stores/locations';
	import { curLocation } from '../stores/curLocation';
	import axios from 'axios';
	import type { Networks } from '../types/networks';

	let searchTerms = '';
	const URL = 'http://api.citybik.es/v2/networks/';

	$: $curLocation, update();

	const update = () => {
		localStorage.setItem('prevLoc', $curLocation);
	};

	const getLocation = async () => {
		const res = await axios.get<Networks>(URL, {});
		locations.set(res.data);

		locations.subscribe((val) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((loc) => {
					const tempVal = [...val.networks];
					tempVal.sort((a, b) => {
						const dist1 = getDistanceFromLatLonInKm(
							loc.coords.latitude,
							loc.coords.longitude,
							a.location.latitude,
							a.location.longitude
						);
						const dist2 = getDistanceFromLatLonInKm(
							loc.coords.latitude,
							loc.coords.longitude,
							b.location.latitude,
							b.location.longitude
						);
						return dist1 - dist2;
					});
					locations.set({ networks: tempVal });
				});
			}
		});
	};

	function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2 - lat1); // deg2rad below
		var dLon = deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return d;
	}

	function deg2rad(deg) {
		return deg * (Math.PI / 180);
	}
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
