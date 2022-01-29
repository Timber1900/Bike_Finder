<script lang="ts">
	import axios from 'axios';
	import { curLocation } from '../stores/curLocation';
	import type { Network, NetworkClass, Station } from '../types/network';
	import MdStar from 'svelte-icons/md/MdStar.svelte';
	import MdLocationOn from 'svelte-icons/md/MdLocationOn.svelte';
	import { LocationSortIndex } from '../functions/location';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	let stations: Station[] = [];
	let network: NetworkClass;
	let favoriteIds = [];
	$: $curLocation, run();

	const run = async () => {
		const response = await axios.get<Network>(`https://api.citybik.es/v2/networks/${$curLocation}`);
		const data: Network = response.data;

		if (data) {
			if (data.network) {
				if (data.network.stations) {
					network = data.network;
					let tempStations = network?.stations ?? [];
					console.log({ network, tempStations });

					if (typeof window !== 'undefined') {
						if (navigator.geolocation) {
							navigator.geolocation.getCurrentPosition((loc) => {
								tempStations.sort((a, b) => {
									return LocationSortIndex(a, b, loc);
								});
								stations = [...tempStations];
							});
						}
					}
				}
			}
		}
	};

	$: favoriteIds, sort();

	const sort = () => {
		console.log(favoriteIds);
		if (typeof window !== 'undefined') {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((loc) => {
					stations = stations.sort((a, b) => {
						if (favoriteIds.includes(a.id) && favoriteIds.includes(b.id)) {
							return LocationSortIndex(a, b, loc);
						} else if (favoriteIds.includes(a.id)) {
							return -1;
						} else if (favoriteIds.includes(b.id)) {
							return 1;
						} else {
							return LocationSortIndex(a, b, loc);
						}
					});
				});
			}
		}
	};

	onMount(() => {
		function sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}

		const frame = async () => {
			run();
			console.log('wait');
			await sleep(30000);
			console.log('done waiting');
			frame();
		};

		frame();
	});
</script>

<main class="flex justify-center items-center h-[calc(100%-6rem)] ">
	<ul class="flex flex-col overflow-scroll h-full w-full p-4 gap-4 justify-start items-center z-40">
		{#each stations as { empty_slots, free_bikes, timestamp, name, id }, i}
			<li transition:slide>
				<div
					class="z-40 flex h-40 w-[364px] rounded-lg bg-gradient-to-bl from-green-gradient-1a to-green-gradient-1b shadow-sm flex-col"
				>
					<div class="grow w-full flex flex-row items-center justify-start pl-6">
						<div class="flex flex-col justify-center items-center">
							<div class="gap-1 flex flex-row justify-center items-start w-full">
								<div class="text-4xl text-white font-bold my-auto grid place-content-center">
									{free_bikes}
								</div>
								<div class="text-xl text-white font-bold my-auto grid place-content-center grow">
									bike{free_bikes !== 1 ? 's' : ''}
								</div>
							</div>
							<div class="gap-1 flex flex-row justify-center items-start w-full">
								<div class="text-xl text-white font-bold my-auto grid place-content-center grow">
									of
								</div>
								<div class="text-4xl text-white font-bold my-auto grid place-content-center">
									{free_bikes + empty_slots}
								</div>
							</div>
						</div>
						<div class="grid grid-cols-2 ml-auto mr-6">
							<div
								on:click={() => {
									if (favoriteIds.includes(id)) {
										const tempFavorites = [...favoriteIds];
										favoriteIds = tempFavorites.filter((val) => val !== id);
									} else {
										favoriteIds = [...favoriteIds, id];
									}
								}}
								class={`square w-12 ${
									favoriteIds.includes(id) ? 'text-yellow-300' : 'text-white'
								} transition-all`}
							>
								<MdStar />
							</div>
							<div class="square w-12 text-white">
								<MdLocationOn />
							</div>
						</div>
					</div>
					<div class="text-[22px] text-center font-semibold text-white truncate mx-4 mb-2">
						{name}
					</div>
				</div>
			</li>
		{/each}
	</ul>
</main>
