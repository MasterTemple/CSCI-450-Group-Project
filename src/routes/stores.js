import { writable } from 'svelte/store';

export const rawClipboardContents = writable("user clipboard");
export const lines = writable([]);
export const dividerList = writable([]);

export const numberOfColumns = writable(3);

export const savedSongsIsOpen = writable(true);

export const settingsIsOpen = writable(true);
export const settingsToggleOption = {
    editor: 0,
    presentation: 1,
 };
export const settingsSelection = writable(settingsToggleOption.editor)

export const settings = writable(false);
