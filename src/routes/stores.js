import { derived, writable } from 'svelte/store';

export const rawClipboardContents = writable("");
export const lines = writable([]);
export const dividerList = writable([]);
export const lyricsBySlide = writable([]);
export const currentSlideIndex = writable(0);

export const songId = writable((new Date()).getTime().toString());
export const title = writable("");
export const author = writable("");

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


// export const currentSong = derived(
// 	[rawClipboardContents, lines, lyricsBySlide, breakIndexes, dividerList],
// 	([$rawClipboardContents, $lines, $lyricsBySlide, $breakIndexes, $dividerList]) => ({
// 		rawClipboardContents: $rawClipboardContents,
// 		lines: $lines,
// 		dividerList: $dividerList,
// 		lyricsBySlide: $lyricsBySlide,
// 		breakIndexes: $breakIndexes,
// 	}),
// 	{

// 	}
// );

// textColor: String
// backgroundColor: String
// numberOfColumns: Integer
// fontSize: Integer
// fontFamily: String
// includeTitleSlide: Boolean

export const textColor = writable("#ffffff");
export const backgroundColor = writable("#000000");
export const numberOfColumns = writable(5);
export const fontSize = writable(36);
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
);


// export const currentSong = derived(
// 	[rawClipboardContents, lines, lyricsBySlide, breakIndexes, currentSettings, title, author],
// 	([$rawClipboardContents, $lines, $lyricsBySlide, $breakIndexes, $currentSettings, $title, $author]) => ({
// 		raw_lines: $rawClipboardContents,
// 		title: $title,
// 		author: $author,
// 		break_indexes: $breakIndexes,
// 		lines: $lines,
// 		slides: $lyricsBySlide,
// 		settings: $currentSettings
// 	}),
// 	{
// 	}
// );

// export const emailAddress = writable("blake.scampone@biola.edu");
// export const authToken = writable("1de016b1-51ce-42e5-8ce2-934dec2105e4");
export const emailAddress = writable("");
export const authToken = writable("");

export const currentSong = derived(
	[rawClipboardContents, lines, lyricsBySlide, breakIndexes, currentSettings, title, author, songId, emailAddress, dividerList],
	([$rawClipboardContents, $lines, $lyricsBySlide, $breakIndexes, $currentSettings, $title, $author, $songId, $emailAddress, $dividerList]) => ({
		songId: $songId,
		emailAddress: $emailAddress,
		rawClipboardContents: $rawClipboardContents,
		title: $title,
		author: $author,
		breakIndexes: $breakIndexes,
		lines: $lines,
		slides: $lyricsBySlide,
		settings: $currentSettings,
		dividerList: $dividerList,
	}),
	{
	}
);

export const allSongs = writable([]);
export const workIsUnsaved = writable(false);

export function setCurrrentSong(loadedSong) {
	songId.set(loadedSong["songId"] || new Date().getTime().toString());
	emailAddress.set(loadedSong["emailAddress"]);
	rawClipboardContents.set(loadedSong["rawClipboardContents"]);
	title.set(loadedSong["title"]);
	author.set(loadedSong["author"]);
	breakIndexes.set(loadedSong["breakIndexes"]);
	lines.set(loadedSong["lines"]);
	lyricsBySlide.set(loadedSong["slides"]);
	dividerList.set(loadedSong["dividerList"]);

	textColor.set(loadedSong["settings"]["textColor"]);
	backgroundColor.set(loadedSong["settings"]["backgroundColor"]);
	numberOfColumns.set(loadedSong["settings"]["numberOfColumns"]);
	fontSize.set(loadedSong["settings"]["fontSize"]);
	fontFamily.set(loadedSong["settings"]["fontFamily"]);
	includeTitleSlide.set(loadedSong["settings"]["includeTitleSlide"]);

}

export const currentSongId = writable("");

export function deleteSongFromLocalList(songId) {
	allSongs.update((songs) => songs.filter((s) => s.songId !== songId));
}
export const displaySingleAudienceView = writable(false);
export const displayPresenterView = writable(false);
export const inputReserved = writable(false)
export const switchTabIndex = writable(0);
