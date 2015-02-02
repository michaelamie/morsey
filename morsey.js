exports.writeBloodyAwfulPoetry = function (string) {

    var morseMap = {
	"a": ". _",             "b": "_ . . .",		"c": "_ . _ .",
	"d": "_ . .",		"e": ".",		"f": ". . _ .",
	"g": "_ _ .",		"h": ". . . .",		"i": ". .",
	"j": ". _ _ _",		"k": "_ . _",		"l": ". _ . .",
	"m": "_ _",		"n": "_ .",		"o": "_ _ _",
	"p": ". _ _ .",		"q": "_ _ . _",		"r": ". _ .",
	"s": ". . .",		"t": "_",		"u": ". . _",
	"v": ". . . _ ",	"w": ". _ _",		"x": "_ . . _",
	"y": "_ . _ _",		"z": "_ _ . .",		"0": "_ _ _ _ _",
	"1": ".- - - -",	"2": ". . _ _ _",	"3": ". . . - -",
	"4": ". . . . _",	"5": ". . . . .",	"6": "_ . . . .",
	"7": "_ _ . . .",	"8": "_ _ _ . .",	"9": "_ _ _ _ .",
	".": ". _ . _ . _",	",": "_ _ . . _ _",	"?": ". . _ _ . .",
	"'": "._ _ _ _ . ",	"!": "_ . _ . _ _"
    };

    string = string.toLowerCase();
    var newString = '';

    for (var i = 0; i < string.length; ++i) {
	if (morseMap.hasOwnProperty(string[i])) {
	    newString += (morseMap[string[i]] + '     ');
	} else {
	    newString += string[i];
	}
    }
    
    return newString;
}
