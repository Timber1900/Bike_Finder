import { writable } from "svelte/store"
import type { Networks } from '../types/networks'

export const locations = writable<Networks>({networks: []})
