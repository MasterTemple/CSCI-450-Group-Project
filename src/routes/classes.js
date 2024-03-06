/*
this object is just to support the Song.lines value
class Line {
	content: String
	dividerAfterThisLine: Boolean
}

all the below properties of each object will correspond to a store.
for each property store, there will be a subscriber that will then update its parent object.
each object will also be a store that will have a subscriber that will update a value representing if it is changed or not
it will save locally and to the server whenever the auto-save timer goes off if there is some change (and it will update the value of whether or not it changed)

class Song {
	rawLines: Array<String>
	title: String
	author: String
	breakIndexes: Array<Integer>
	lines: Array<Line>
	slides: Array<Array<String>>
	settings: Settings
}

class Settings {
	textColor: String
	backgroundColor: String
	numberOfColumns: Integer
	fontSize: Integer
	fontFamily: String
	includeTitleSlide: Boolean
}
*/

export class Song {
    /**
     * @param {Array<String>} rawLines 
     * @param {String} title 
     * @param {String} author 
     */
    constructor(rawLines, title, author) {
        //
        this.rawLines = rawLines;

        this.title = title || ""
        this.author = author || ""

        //
        this.breakIndexes = [];
        // {content: 'line 1', dividerAfterThisLine: false},
        this.lines = [];
        // 2D list: list of list of lines
        this.slides = [];
    }

}
