import { derived, writable } from 'svelte/store';

export const rawClipboardContents = writable("");
export const lines = writable([]);
export const dividerList = writable([]);
export const lyricsBySlide = writable([]);
export const currentSlideIndex = writable(0);

export const numberOfColumnsToDisplay = writable(3);

export const savedSongsIsOpen = writable(true);

export const settingsIsOpen = writable(true);
export const settingsToggleOption = {
	editor: 0,
	presentation: 1,
};
export const settingsSelection = writable(settingsToggleOption.editor);

export const settings = writable(false);

export const breakIndexes = writable([]);
// export const lyricData = {
//     rawClipboardContents,
//     breakIndexes,
//     lines,
//     lyricsBySlide,
// };
export const color = {
	darkBlue: '#1C3845',
	brown: '#A38560',
	brownShaddow: '#907554',
	black: '#000000',
	white: '#FFFFFF',
	darkPurple: '#b2b2e6',
	lightPurple: '#c5c5e6'
};


export const currentSong = derived(
	[rawClipboardContents, lines, lyricsBySlide, breakIndexes, dividerList],
	([$rawClipboardContents, $lines, $lyricsBySlide, $breakIndexes, $dividerList]) => ({
		rawClipboardContents: $rawClipboardContents,
		lines: $lines,
		dividerList: $dividerList,
		lyricsBySlide: $lyricsBySlide,
		breakIndexes: $breakIndexes,
	}),
	{

	}
);


export const savedSongs = [currentSong, currentSong]

// textColor: String
// backgroundColor: String
// numberOfColumns: Integer
// fontSize: Integer
// fontFamily: String
// includeTitleSlide: Boolean

export const textColor = writable("#ffffff");
export const backgroundColor = writable("#000000");
export const numberOfColumns = writable(5);
export const fontSize = writable(14);
export const fontFamily = writable("Arial");
export const includeTitleSlide = writable(true);

export const currentSettings = derived(
	[textColor, backgroundColor, numberOfColumns, fontSize, fontFamily, includeTitleSlide,],
	([$textColor, $backgroundColor, $numberOfColumns, $fontSize, $fontFamily, $includeTitleSlide,]) => ({
		textColor: $textColor,
		backgroundColor: $backgroundColor,
		numberOfColumns: $numberOfColumns,
		fontSize: $fontSize,
		fontFamily: $fontFamily,
		includeTitleSlide: $includeTitleSlide,
	})
)

