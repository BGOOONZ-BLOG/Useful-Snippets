function count(self, substr) {
  var count = 0;
  var pos = self.indexOf(substr);

  while (pos >= 0) {
    count += 1;
    pos = self.indexOf(substr, pos + 1);
  }

  return count;
}
/*
- count(substring)
Returns the count of the number of occurrences of the substring.

Example:

S('JP likes to program. JP does not play in the NBA.').count("JP")// 2
S('Does not exist.').count("Flying Spaghetti Monster") //0
S('Does not exist.').count("Bigfoot") //0
S('JavaScript is fun, therefore Node.js is fun').count("fun") //2
S('funfunfun').count("fun") //3

*/

//-----------------------------------------------------------------------
function splitLeft(self, sep, maxSplit, limit) {
  if (typeof maxSplit === "undefined") {
    var maxSplit = -1;
  }

  var splitResult = self.split(sep);
  var splitPart1 = splitResult.slice(0, maxSplit);
  var splitPart2 = splitResult.slice(maxSplit);

  if (splitPart2.length === 0) {
    splitResult = splitPart1;
  } else {
    splitResult = splitPart1.concat(splitPart2.join(sep));
  }

  if (typeof limit === "undefined") {
    return splitResult;
  } else if (limit < 0) {
    return splitResult.slice(limit);
  } else {
    return splitResult.slice(0, limit);
  }
}
/*
- splitLeft(sep, [maxSplit = -1, [limit]])
Returns an array of strings, split from the left at sep. 
Performs at most maxSplit splits, 
and slices the result into an array with at most limit elements.

Example:

S('We built this city').splitLeft(' '); // ['We', 'built', 'this', 'city'];
S('We built this city').splitLeft(' ', 1); // ['We', 'built this city'];
S('On Rock N Roll and other Stuff').splitLeft(' ', -1, 4); // ['On', 'Rock', 'N', 'Roll'];
S('On Rock N Roll and other Stuff').splitLeft(' ', 5, -2); // ['and', 'other Stuff'];
*/

//-----------------------------------------------------------------------
function splitRight(self, sep, maxSplit, limit) {
  if (typeof maxSplit === "undefined") {
    var maxSplit = -1;
  }
  if (typeof limit === "undefined") {
    var limit = 0;
  }

  var splitResult = [self];

  for (var i = self.length - 1; i >= 0; i--) {
    if (
      splitResult[0].slice(i).indexOf(sep) === 0 &&
      (splitResult.length <= maxSplit || maxSplit === -1)
    ) {
      splitResult.splice(1, 0, splitResult[0].slice(i + sep.length)); // insert
      splitResult[0] = splitResult[0].slice(0, i);
    }
  }

  if (limit >= 0) {
    return splitResult.slice(-limit);
  } else {
    return splitResult.slice(0, -limit);
  }
}
/*
- splitRight(sep, [maxSplit = -1, [limit]])
Returns an array of strings, split from the left at sep. Performs at most maxSplit splits, and slices the result into an array with at most limit elements.

Example:

S('This is all very fun').splitRight(' '); // ['This', 'is', 'all', 'very', 'fun'];
S('and I could do it forever').splitRight(' ', 1); // ['and I could do it', 'forever'];
S('but nothing matters in the end.').splitRight(' ', -1, 2); // ['the', 'end.'];
S('but nothing matters in the end.').splitRight(' ', 4, -2); // ['but nothing', 'matters']
*/

//-------------------------------------------------------
    between: function(left, right) {
      var s = this.s;
      var startPos = s.indexOf(left);
      var endPos = s.indexOf(right, startPos + left.length);
      if (endPos == -1 && right != null)
        return new this.constructor('')
      else if (endPos == -1 && right == null)
        return new this.constructor(s.substring(startPos + left.length))
      else
        return new this.constructor(s.slice(startPos + left.length, endPos));
    },

    /*
    - between(left, right)
Extracts a string between left and right strings.

Example:

S('<a>foo</a>').between('<a>', '</a>').s // => 'foo'
S('<a>foo</a></a>').between('<a>', '</a>').s // => 'foo'
S('<a><a>foo</a></a>').between('<a>', '</a>').s // => '<a>foo'
S('<a>foo').between('<a>', '</a>').s // => ''
S('Some strings } are very {weird}, dont you think?').between('{', '}').s // => 'weird'
S('This is a test string').between('test').s // => ' string'
S('This is a test string').between('', 'test').s // => 'This is a '
    */
    
    
    charAt: function(index) {
      return this.s.charAt(index);
},
    
    /*
    string.js imports all of the native JavaScript methods. This is for convenience. The only difference is that the imported methods return string.js objects instead of native JavaScript strings. The one exception to this is the method charAt(index). This is because charAt() only returns a string of length one. This is typically done for comparisons and a string.js object will have little to no value here.

All of the native methods support chaining with the string.js methods.

Example:

var S = require('string');

var phrase = S('JavaScript is the best scripting language ever!');
var sub = 'best scripting';
var pos = phrase.indexOf(sub);
console.log(phrase.substr(pos, sub.length).truncate(8)); //best...
    */

    chompLeft: function(prefix) {
      var s = this.s;
      if (s.indexOf(prefix) === 0) {
         s = s.slice(prefix.length);
         return new this.constructor(s);
      } else {
        return this;
      }
    },
/*
- chompLeft(prefix)
Removes prefix from start of string.

Example:

S('foobar').chompLeft('foo').s; //'bar'
S('foobar').chompLeft('bar').s; //'foobar'
*/
    chompRight: function(suffix) {
      if (this.endsWith(suffix)) {
        var s = this.s;
        s = s.slice(0, s.length - suffix.length);
        return new this.constructor(s);
      } else {
        return this;
      }
},
    
    /*
    - chompRight(suffix)
Removes suffix from end of string.

Example:

S('foobar').chompRight('bar').s; //'foo'
S('foobar').chompRight('foo').s; //'foobar'
    */

 
    collapseWhitespace: function() {
      var s = this.s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');
      return new this.constructor(s);
    },
/*
- collapseWhitespace()
Converts all adjacent whitespace characters to a single space.

Example:

var str = S('  String   \t libraries are   \n\n\t fun\n!  ').collapseWhitespace().s; 
*/
    contains: function(ss) {
      return this.s.indexOf(ss) >= 0;
    },
/*
- contains(ss)
Returns true if the string contains ss.

Alias: include()

Example:

S('JavaScript is one of the best languages!').contains('one'); //true
*/
    count: function(ss) {
      return require('./_count')(this.s, ss)
    },

    //#modified from https://github.com/epeli/underscore.string
    
/*

*/
    endsWith: function() {
      var suffixes = Array.prototype.slice.call(arguments, 0);
      for (var i = 0; i < suffixes.length; ++i) {
        var l  = this.s.length - suffixes[i].length;
        if (l >= 0 && this.s.indexOf(suffixes[i], l) === l) return true;
      }
      return false;
},
    /*

*/

    escapeHTML: function() { //from underscore.string
      return new this.constructor(this.s.replace(/[&<>"']/g, function(m){ return '&' + reversedEscapeChars[m] + ';'; }));
},
    /*

*/

    ensureLeft: function(prefix) {
      var s = this.s;
      if (s.indexOf(prefix) === 0) {
        return this;
      } else {
        return new this.constructor(prefix + s);
      }
},
    /*

*/

    ensureRight: function(suffix) {
      var s = this.s;
      if (this.endsWith(suffix))  {
        return this;
      } else {
        return new this.constructor(s + suffix);
      }
},
    /*

*/

    humanize: function() { //modified from underscore.string
      if (this.s === null || this.s === undefined)
        return new this.constructor('')
      var s = this.underscore().replace(/_id$/,'').replace(/_/g, ' ').trim().capitalize()
      return new this.constructor(s)
},
    /*

*/

    isAlpha: function() {
      return !/[^a-z\xDF-\xFF]|^$/.test(this.s.toLowerCase());
},
    /*

*/

    isAlphaNumeric: function() {
      return !/[^0-9a-z\xDF-\xFF]/.test(this.s.toLowerCase());
    },
/*

*/
    isEmpty: function() {
      return this.s === null || this.s === undefined ? true : /^[\s\xa0]*$/.test(this.s);
    },
/*

*/
    isLower: function() {
      return this.isAlpha() && this.s.toLowerCase() === this.s;
    },
/*

*/
    isNumeric: function() {
      return !/[^0-9]/.test(this.s);
    },
/*

*/
    isUpper: function() {
      return this.isAlpha() && this.s.toUpperCase() === this.s;
    },
/*

*/
    left: function(N) {
      if (N >= 0) {
        var s = this.s.substr(0, N);
        return new this.constructor(s);
      } else {
        return this.right(-N);
      }
    },
/*

*/
    lines: function() { //convert windows newlines to unix newlines then convert to an Array of lines
      return this.replaceAll('\r\n', '\n').s.split('\n');
    },
/*

*/
    pad: function(len, ch) { //https://github.com/component/pad
      if (ch == null) ch = ' ';
      if (this.s.length >= len) return new this.constructor(this.s);
      len = len - this.s.length;
      var left = Array(Math.ceil(len / 2) + 1).join(ch);
      var right = Array(Math.floor(len / 2) + 1).join(ch);
      return new this.constructor(left + this.s + right);
    },
/*

*/
    padLeft: function(len, ch) { //https://github.com/component/pad
      if (ch == null) ch = ' ';
      if (this.s.length >= len) return new this.constructor(this.s);
      return new this.constructor(Array(len - this.s.length + 1).join(ch) + this.s);
    },
/*

*/
    padRight: function(len, ch) { //https://github.com/component/pad
      if (ch == null) ch = ' ';
      if (this.s.length >= len) return new this.constructor(this.s);
      return new this.constructor(this.s + Array(len - this.s.length + 1).join(ch));
    },
/*

*/


    replaceAll: function(ss, r) {
      //var s = this.s.replace(new RegExp(ss, 'g'), r);
      var s = this.s.split(ss).join(r)
      return new this.constructor(s);
    },
/*

*/
    splitLeft: function(sep, maxSplit, limit) {
      return require('./_splitLeft')(this.s, sep, maxSplit, limit)
    },
/*

*/
    splitRight: function(sep, maxSplit, limit) {
      return require('./_splitRight')(this.s, sep, maxSplit, limit)
    },
/*

*/
    strip: function() {
      var ss = this.s;
      for(var i= 0, n=arguments.length; i<n; i++) {
        ss = ss.split(arguments[i]).join('');
      }
      return new this.constructor(ss);
    },
/*

*/
    stripLeft: function (chars) {
      var regex;
      var pattern;
      var ss = ensureString(this.s);

      if (chars === undefined) {
        pattern = /^\s+/g;
      }
      else {
        regex = escapeRegExp(chars);
        pattern = new RegExp("^[" + regex + "]+", "g");
      }

      return new this.constructor(ss.replace(pattern, ""));
    },
/*

*/
    stripRight: function (chars) {
      var regex;
      var pattern;
      var ss = ensureString(this.s);

      if (chars === undefined) {
        pattern = /\s+$/g;
      }
      else {
        regex = escapeRegExp(chars);
        pattern = new RegExp("[" + regex + "]+$", "g");
      }

      return new this.constructor(ss.replace(pattern, ""));
    },
/*

*/
    right: function(N) {
      if (N >= 0) {
        var s = this.s.substr(this.s.length - N, N);
        return new this.constructor(s);
      } else {
        return this.left(-N);
      }
    },
/*

*/
    setValue: function (s) {
	  initialize(this, s);
	  return this;
    },
/*

*/


    startsWith: function() {
      var prefixes = Array.prototype.slice.call(arguments, 0);
      for (var i = 0; i < prefixes.length; ++i) {
        if (this.s.lastIndexOf(prefixes[i], 0) === 0) return true;
      }
      return false;
    },
/*

*/
    stripPunctuation: function() {
      //return new this.constructor(this.s.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""));
      return new this.constructor(this.s.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "));
    },
/*

*/
    stripTags: function() { //from sugar.js
      var s = this.s, args = arguments.length > 0 ? arguments : [''];
      multiArgs(args, function(tag) {
        s = s.replace(RegExp('<\/?' + tag + '[^<>]*>', 'gi'), '');
      });
      return new this.constructor(s);
    },
/*

*/


    times: function(n) {
      return new this.constructor(new Array(n + 1).join(this.s));
    },
/*

*/




    trim: function() {
      var s;
      if (typeof __nsp.trim === 'undefined')
        s = this.s.replace(/(^\s*|\s*$)/g, '')
      else
        s = this.s.trim()
      return new this.constructor(s);
    },
/*

*/
    trimLeft: function() {
      var s;
      if (__nsp.trimLeft)
        s = this.s.trimLeft();
      else
        s = this.s.replace(/(^\s*)/g, '');
      return new this.constructor(s);
    },
/*

*/
    trimRight: function() {
      var s;
      if (__nsp.trimRight)
        s = this.s.trimRight();
      else
        s = this.s.replace(/\s+$/, '');
      return new this.constructor(s);
    },
/*

*/
    


