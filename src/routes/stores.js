import { writable } from 'svelte/store';

export const rawClipboardContents = writable("user clipboard");
export const lines = writable([]);

export const numberOfColumns = writable(20);

export const savedSongsIsOpen = writable(true);