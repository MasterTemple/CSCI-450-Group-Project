import { writable } from 'svelte/store';

export const rawClipboardContents = writable("");
export const lines = writable([]);
export const dividerList = writable([]);
export const lyricsBySlide = writable([]);

export const numberOfColumnsToDisplay = writable(3);

export const savedSongsIsOpen = writable(true);

export const settingsIsOpen = writable(true);
export const settingsToggleOption = {
    editor: 0,
    presentation: 1,
 };
export const settingsSelection = writable(settingsToggleOption.editor)

export const settings = writable(false);

export const breakIndexes = writable([])
// export const lyricData = {
//     rawClipboardContents,
//     breakIndexes,
//     lines,
//     lyricsBySlide,
// };