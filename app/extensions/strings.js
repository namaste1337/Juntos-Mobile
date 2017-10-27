// This file will host methods extending the
// String Class, this file should be loaded in App.js
// so the extensions are available at the app level.

// Handles removing white space from a string
Object.defineProperty(String.prototype, "removeWhiteSpace",{
	value(){
		return this.replace(/ /g, "");
	}
})

// Handles checking for white space
Object.defineProperty(String.prototype, "hasWhiteSpace",{
	value(){
		return /\s/g.test(this);
	}
})