import { writable } from 'svelte/store';

export const rawClipboardContents = writable("user clipboard");
export const lines = writable([]);

export const numberOfColumns = writable(20);

export const savedSongsIsOpen = writable(true);

export const settingsIsOpen = writable(true);
export const settingsToggleOption = {
    editor: 0,
    prestentation: 1,
 };
export const settingsSelection = writable(settingsToggleOption.editor)
