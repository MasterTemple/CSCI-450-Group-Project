import { writable } from 'svelte/store';

export const rawClipboardContents = writable("user clipboard");
export const lines = writable([]);

export const numberOfColumns = writable(20);

export const savedSongsIsOpen = writable(true);

export const settingsIsOpen = writable(true);
export const settingsToggleOption = {
    editor: 0,
    presentation: 1,
 };
export const settingsSelection = writable(settingsToggleOption.editor)

export const settings = writable(false);

export const color = {
    darkBlue: '#1C3845',
    brown: '#A38560',
    brownShaddow: '#907554',
    black: '#000000',
    white: '#FFFFFF',
    darkPurple: '#b2b2e6',
    lightPurple: '#c5c5e6'
}
