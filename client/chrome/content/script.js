var KEYWORD_TOOLBAR_DEV_MODE = true;


/**
 * Keyword Toolbar is a Firefox toolbar extension which (upon a button press) 
 * presents the user with a list of keywords that appear in the web page they 
 * are viewing. The keywords are based on n-grams extracted from the text. 
 *
 *
 * N-gram Ranking Ideas:
 *   1) Occurences: (simple) N-grams which occure more often are probably more 
 *        likely to be what the document is about.
 *        Problem: Web pages which feature repetative strucutres (such as 
 *                 comment systems) often have maningless n-grams which are 
 *                 repeated many times. These n-grams gravitate towards to the
 *                 top of the sorted n-gram list and thus pollute the results.  
 *        Solution: It may be possible to store all the HTML paths that an 
 *                  n-gram occures at (i.e. <div><div><p>...). A filtering step
 *                  could be applied after all n-grams are detected to look for 
 *                  patterns in the HTML paths and remove any n-grams which are 
 *                  dominated by similar paths. 
 *
 *  2) Percentage of stop words: A Lower rank could be given to n-grams which 
 *       feature a large percentage of stop words as it is more likely to be a 
 *       meaningless n-gram. 
 *
 *  3) Part of Speech Tagging: This isnt an exact system but people generally 
 *       view the important part of a document to be the nouns. A higher rank 
 *       could be given to any n-gram that features nouns. 
 *
 *  4) Length: It is unclear if longer n-grams are better than short ones or 
 *      vice versa. Longer n-grams might represent a more complete thought but 
 *      shorter n-grams might be more to the point. Additionally often times the
 *      longer n-grams appear to just be the same as a shorter n-gram but with 
 *      some junk included. Maybe a filtering operation could be applied to look
 *      for relationships between ngrams of similar ranking and lexical makeup. 
 *
 *  5) In title: A higher rank could be given to n-grams which appear both in 
 *       the document title and in the body.
 *       How much of a boost to the score should they be given???
 *
 * Additionally, a stemming algorithm should be used to try to improve the hit 
 * rate of n-grams. 
 */
var KeywordToolbarObject = {
	/*
	 * An upper limit to the number of words that can make up an n-gram. If this
	 * value is set too high too many n-grams will be pulled out of the document
	 * and thus waste memory. If the value is too low we migth not capture the 
	 * full n-grams to extract as keywords fromt he content. 
	 *
	 * Only bigrams are being used as per the project specification. 
	 */
	max_ngram_size: 2,
/*
	pos_lexer: null,
	pos_tagger: null,
*/	

	/*
	 * Stop words are common words that are most likely do not represent the 
	 * main focus of the web page content. They are simply filler words. This is
	 * list adapted from vBulletin's includes/searchwords.php 
	 */
	stop_words: Array(
		"a",
		"able",
		"about",
		"above",
		"according",
		"accordingly",
		"across",
		"actually",
		"after",
		"afterwards",
		"again",
		"against",
		"ago",
		"aint",
		"all",
		"allow",
		"allows",
		"almost",
		"alone",
		"along",
		"already",
		"also",
		"although",
		"always",
		"am",
		"among",
		"amongst",
		"an",
		"and",
		"another",
		"any",
		"anybody",
		"anyhow",
		"anyone",
		"anything",
		"anyway",
		"anyways",
		"anywhere",
		"apart",
		"appear",
		"appreciate",
		"appropriate",
		"are",
		"arent",
		"around",
		"as",
		"aside",
		"ask",
		"asking",
		"associated",
		"at",
		"available",
		"away",
		"awfully",
		"b",
		"be",
		"became",
		"because",
		"become",
		"becomes",
		"becoming",
		"been",
		"before",
		"beforehand",
		"behind",
		"being",
		"believe",
		"below",
		"beside",
		"besides",
		"best",
		"better",
		"between",
		"beyond",
		"both",
		"brief",
		"but",
		"by",
		"c",
		"came",
		"can",
		"cannot",
		"cant",
		"cause",
		"causes",
		"certain",
		"certainly",
		"changes",
		"clearly",
		"cmon",
		"co",
		"com",
		"come",
		"comes",
		"concerning",
		"consequently",
		"consider",
		"considering",
		"contain",
		"containing",
		"contains",
		"corresponding",
		"could",
		"couldnt",
		"course",
		"cs",
		"currently",
		"d",
		"definitely",
		"described",
		"despite",
		"did",
		"didnt",
		"different",
		"do",
		"does",
		"doesnt",
		"doing",
		"done",
		"dont",
		"down",
		"downwards",
		"during",
		"e",
		"each",
		"edu",
		"eg",
		"eight",
		"either",
		"else",
		"elsewhere",
		"enough",
		"entirely",
		"especially",
		"et",
		"etc",
		"even",
		"ever",
		"every",
		"everybody",
		"everyone",
		"everything",
		"everywhere",
		"ex",
		"exactly",
		"example",
		"except",
		"f",
		"far",
		"few",
		"fifth",
		"first",
		"five",
		"followed",
		"following",
		"follows",
		"for",
		"former",
		"formerly",
		"forth",
		"four",
		"from",
		"further",
		"furthermore",
		"g",
		"get",
		"gets",
		"getting",
		"given",
		"gives",
		"go",
		"goes",
		"going",
		"gone",
		"got",
		"gotten",
		"greetings",
		"h",
		"had",
		"hadnt",
		"happens",
		"hardly",
		"has",
		"hasnt",
		"have",
		"havent",
		"having",
		"he",
		"hello",
		"help",
		"hence",
		"her",
		"here",
		"heres",
		"hereafter",
		"hereby",
		"herein",
		"hereupon",
		"hers",
		"herself",
		"hes",
		"hi",
		"him",
		"himself",
		"his",
		"hither",
		"hopefully",
		"how",
		"howbeit",
		"however",
		"i",
		"id",
		"ie",
		"if",
		"ignored",
		"ill",
		"im",
		"immediate",
		"in",
		"inasmuch",
		"inc",
		"indeed",
		"indicate",
		"indicated",
		"indicates",
		"inner",
		"insofar",
		"instead",
		"into",
		"inward",
		"is",
		"isnt",
		"ist",
		"it",
		"itd",
		"itll",
		"its",
		"itself",
		"ive",
		"j",
		"just",
		"k",
		"keep",
		"keeps",
		"kept",
		"know",
		"knows",
		"known",
		"l",
		"last",
		"lately",
		"later",
		"latter",
		"latterly",
		"least",
		"less",
		"lest",
		"let",
		"lets",
		"like",
		"liked",
		"likely",
		"little",
		"look",
		"looking",
		"looks",
		"ltd",
		"m",
		"mainly",
		"many",
		"may",
		"maybe",
		"me",
		"mean",
		"meanwhile",
		"merely",
		"might",
		"more",
		"moreover",
		"most",
		"mostly",
		"much",
		"must",
		"my",
		"myself",
		"n",
		"name",
		"namely",
		"nd",
		"near",
		"nearly",
		"necessary",
		"need",
		"needs",
		"neither",
		"never",
		"nevertheless",
		"new",
		"next",
		"nine",
		"no",
		"nobody",
		"non",
		"none",
		"noone",
		"nor",
		"normally",
		"not",
		"nothing",
		"novel",
		"now",
		"nowhere",
		"o",
		"obviously",
		"of",
		"off",
		"often",
		"oh",
		"ok",
		"okay",
		"old",
		"on",
		"once",
		"one",
		"ones",
		"only",
		"onto",
		"or",
		"originally",
		"other",
		"others",
		"otherwise",
		"ought",
		"our",
		"ours",
		"ourselves",
		"out",
		"outside",
		"over",
		"overall",
		"own",
		"p",
		"particular",
		"particularly",
		"per",
		"perhaps",
		"placed",
		"please",
		"plus",
		"possible",
		"posted",
		"presumably",
		"probably",
		"provides",
		"q",
		"que",
		"quite",
		"quote",
		"qv",
		"r",
		"rather",
		"rd",
		"re",
		"really",
		"reasonably",
		"regarding",
		"regardless",
		"regards",
		"relatively",
		"respectively",
		"right",
		"s",
		"said",
		"same",
		"saw",
		"say",
		"saying",
		"says",
		"second",
		"secondly",
		"see",
		"seeing",
		"seem",
		"seemed",
		"seeming",
		"seems",
		"seen",
		"self",
		"selves",
		"sensible",
		"sent",
		"seriously",
		"seven",
		"several",
		"shall",
		"she",
		"should",
		"shouldnt",
		"since",
		"six",
		"so",
		"some",
		"somebody",
		"somehow",
		"someone",
		"something",
		"sometime",
		"sometimes",
		"somewhat",
		"somewhere",
		"soon",
		"sorry",
		"specified",
		"specify",
		"specifying",
		"still",
		"sub",
		"such",
		"sup",
		"sure",
		"t",
		"take",
		"taken",
		"tell",
		"tends",
		"th",
		"than",
		"thank",
		"thanks",
		"thanx",
		"that",
		"thats",
		"the",
		"their",
		"theirs",
		"them",
		"themselves",
		"then",
		"thence",
		"there",
		"theres",
		"thereafter",
		"thereby",
		"therefore",
		"therein",
		"theres",
		"thereupon",
		"these",
		"they",
		"theyd",
		"theyll",
		"theyre",
		"theyve",
		"think",
		"third",
		"this",
		"thorough",
		"thoroughly",
		"those",
		"though",
		"three",
		"through",
		"throughout",
		"thru",
		"thus",
		"to",
		"together",
		"too",
		"took",
		"toward",
		"towards",
		"tried",
		"tries",
		"truly",
		"try",
		"trying",
		"ts",
		"twice",
		"two",
		"u",
		"un",
		"under",
		"unfortunately",
		"unless",
		"unlikely",
		"until",
		"unto",
		"up",
		"upon",
		"us",
		"use",
		"used",
		"useful",
		"uses",
		"using",
		"usually",
		"v",
		"value",
		"various",
		"very",
		"via",
		"viz",
		"vs",
		"w",
		"want",
		"wants",
		"was",
		"wasnt",
		"way",
		"we",
		"wed",
		"welcome",
		"well",
		"went",
		"were",
		"weve",
		"werent",
		"what",
		"whats",
		"whatever",
		"when",
		"whence",
		"whenever",
		"where",
		"whereafter",
		"whereas",
		"whereby",
		"wherein",
		"whereupon",
		"wherever",
		"wheres",
		"whether",
		"which",
		"while",
		"whither",
		"who",
		"whoever",
		"whole",
		"whom",
		"whos",
		"whose",
		"why",
		"will",
		"willing",
		"wish",
		"with",
		"within",
		"without",
		"wonder",
		"wont",
		"would",
		"would",
		"wouldnt",
		"x",
		"y",
		"yes",
		"yet",
		"you",
		"youd",
		"youll",
		"your",
		"youre",
		"yours",
		"yourself",
		"yourselves",
		"youve",
		"z",
		"zero"
	),


	/**
	 * Initalize the keywords toolbar.
	 *
	 */
	init: function() {
		/*
		 * Convert this.stop_words from an array to an associative array. This 
		 * changes the lookup time from being O(n) to (hopefully) being close to
		 * O(1). 
		 */
		var stop_words_assoc = Array();
		for (var i = 0; i < this.stop_words.length; i++) {
			stop_words_assoc[this.stop_words[i]] = 1;
		}

		this.stop_words = stop_words_assoc;
	},


	/**
	 * Event handler for when the "Keywords" button is pressed. 
	 *
	 * @param Event event
	 */
	keyword_button: function(event) {
		this.document_keywords(gBrowser.contentDocument);
	},


	/**
	 * Extracts keywords out of the document title and body. This should help 
	 * determine that the page is about. 
	 *
	 * @param Document doc 
	 */
	document_keywords: function(doc) {
		var start = new Date().getTime();
		var title_ngrams = this.build_ngrams(doc.title, false);		
		this.build_ngrams(doc.body.textContent, false);
		var end = new Date().getTime();

		/*
		 * Simply use wall time to benchmark how we are doing. This will also 
		 * capture the time it takes for responses to alert()s.
		 *
		 */
		alert("Elapsed Time: "+(end-start));
	},


	/** 
	 * Builds an array of n-grams for a string. 
	 *
	 * @param String str
	 * @return Array
	 */
	build_ngrams: function(str, title_ngrams) {
		/*
		 * In order to preserve lexical delimiters the string is broken into a 
		 * series of "blocks" each block represents a line or sentence in the 
		 * text. This prevents n-grams from being build accross sentances or 
		 * across unrelated text that may appear many lines appart in the 
		 * document.  
		 *
		 */
		var re = RegExp(/(\n|\. |\!|\?)/);
		blocks = str.split(re);

		ngrams = Array();
		for (var i = 0; i < blocks.length; i++) {
			var block_ngrams = this.build_block_ngrams(blocks[i]);

			for (var j in block_ngrams) {
				if (typeof ngrams[j] == "undefined") {
					ngrams[j] = block_ngrams[j];
				} else {
					ngrams[j] += block_ngrams[j];
				}
			}
		}

		ngrams = this.sort_assoc_desc(ngrams);
		var max_occurences = ngrams[this.get_first_assoc_key(ngrams)];

		/* 
		 * Filter out n-grams with few hits (only if we have n-grams that 
		 * clearly take stand out in terms of hit count). This will help save on
		 * needless processing down the road. This seems to cut out about 80%+ 
		 * of the n-grams. 
		 */
		if (max_occurences > 2) {
			var ngrams_tmp = Array();
			for (var i in ngrams) {
				if (ngrams[i] > 1) {
					ngrams_tmp[i] = ngrams[i];
				}
			}
			ngrams = ngrams_tmp;
			ngrams_tmp = Array();
		}


		/*
		 * Build ranking information for the remaining n-grams
		 */
		var ngrams_ranked = Array();
		
		/* Tuning parameters */
		var in_title_reward = 2; /* Give a big boost to something in the title */
		var trailing_stop_word_penalty = 0.25; /* Give a severe penalty is junk is at the end of an n-gram */

		var normalizer = (in_title_reward)*(1);

		for (var i in ngrams) {
			var words = i.split(" ");

			/* Determine percentage of stop words */
			var stop_word_count = 0;
			var trailing_stop_word = false;
			for (var j = 0; j < words.length; j++) {
				if (typeof this.stop_words[words[j]] != "undefined") {
					stop_word_count++;

					if (j == words.length-1) {
						trailing_stop_word = true;
					}
				}
			}


			/* Check for existance in the document title */
			var in_title = false;
			if (title_ngrams !== false && typeof title_ngrams[i] != "undefined") {
				in_title = true;
			}

			
			/*
			 * Calculate Rank: 
			 *   Criteria:
			 *     1) Minimize number of stop words
			 *     2) Severely penalize n-grams that end in a stop word
			 *     3) Give preference to n-grams which also appear in the title
			 *     4) Give preference to n-grams which occur more frequently
			 *
			 * Ranking Algorithm:
			 *   Modifiers = (in_title_reward)*(trailing_stop_word_penalty)
			 *   Normalizer = Modifier*(1+1)  (Modifier in this case is 
			 *                                 caluclated with all rewards and 
			 *                                 no penalties)
			 * 
			 *   Rank = (Modifier*(0.8*(num_occurences/max_occurences)+0.2*(stop_word_count/word_count)))/Normalizer
			 * 
			 */
			var modifier = (in_title ? in_title_reward : 1)*(trailing_stop_word ? trailing_stop_word_penalty : 1);
			var rank = (modifier*((0.8*(ngrams[i]/max_occurences))+(0.2*(stop_word_count/words.length))))/normalizer;

			ngrams_ranked[i] = rank;
		}

		ngrams_ranked = this.sort_assoc_desc(ngrams_ranked);

		var ngram_count = 0;
		var alertstr = "";
		for (var i in ngrams_ranked) {
			ngram_count++;
			alertstr += "["+i+"] = "+ngrams_ranked[i]+"\n";
		}
		alert(ngram_count);
		alert(alertstr);

		var alertstr = "";
		for (var i in ngrams) {
			ngram_count++;
			alertstr += "["+i+"] = "+ngrams[i]+"\n";
		}
		alert(alertstr);
	},


	/**
	 * Builds the n-grams for a block of text. 
	 *
	 * @param String str
	 * @return Array
	 */
	build_block_ngrams: function(str) {
		var ngrams = Array();
		var i = 0;

		/*
		 * Convert all the text to lower case in order to improve matches 
		 * amongst n-grams and strip out unwanted characters.  
		 */
		str = str.toLowerCase();
		str = str.replace(/^\s+|\s+$|[\!\@\#\%\^\&\*\(\)\?\_\-\+\=\/\~\`\:\;\<\>\"\{\}\[\]\|\\]/g, '');

		if (str.length == 0 || str == ".") {
			return ngrams;
		}

		/*
		 * Break the stirng into an array of words. Any empty strings (an 
		 * artifact of triming whitespace) will be filteres out. 
		 */
		words = str.split(/ |\t/);

		for (i = 0; i < words.length; i++) {
			words[i] = words[i].replace(/^\s+|\s+$/g, '');

			if (words[i].length == 0) {
				words[i] = false;
			}
		}

		words = words.filter(function(val) {
			if (val === false) {
				return false;
			}

			return true;
		});

		if (words.length == 0) {
			return ngrams;
		}


		/*
		 * Build n-grams from the array of words. This will build ngrams from 
		 * length 1 to this.max_ngram_size starting at each word in the array. 
		 *
		 */
		for (i = 0; i < words.length; i++) {
			var ngram_index = "";
			var ngram_text = "";
			var stop_words_count = 0;

			for (var j = i; j < (i+this.max_ngram_size) && j < words.length; j++) {
				/* TODO: Would creating a cache for the stemmed words improve performance? */
				ngram_index += " "+stemmer(words[j]);
				ngram_text += " "+words[j];	

				if (stop_words_count == (j-i) && typeof this.stop_words[words[j]] != "undefined") {
					/*
					 * stop_words_count == (j-i) :: used to remove the hashtable
					 * lookup when we already know this ngram is not 100% stop 
					 * words. Hopefully this will remove all but the initial 
					 * hashtable lookup for most n-grams. 
					 */
					stop_words_count++;
				}

				if (stop_words_count < (j-i+1)) {
					if (typeof ngrams[ngram_text] == "undefined") {
						ngrams[ngram_index] = 1;
					} else {
						ngrams[ngram_index]++;
					}		
				}
			}
		}

		return ngrams;
	},


	/**
	 * Sorts an associative array by its value in descending order. 
	 *
	 * @param Array aInput
	 * @return Array
	 */
	sort_assoc_desc: function(aInput) {
		var aTemp = [];
		for (var sKey in aInput)
			aTemp.push([sKey, aInput[sKey]]);

		aTemp.sort(function () {return arguments[0][1] > arguments[1][1]});

		var aOutput = [];
		for (var nIndex = aTemp.length-1; nIndex >=0; nIndex--)
		aOutput[aTemp[nIndex][0]] = aTemp[nIndex][1];

		return aOutput;
	},


	/**
	 * Returns the key of the first element in the associative array. 
	 *
	 * @param Array arr
	 * @return String
	 */
	get_first_assoc_key: function(arr) {
		for (var i in arr) {
			return i;
		}
	},
};



/******************************************************************************\
|                                                                              |
| Porter Stemmer Implementation: http://tartarus.org/martin/PorterStemmer/     |
|                                                                              |
\******************************************************************************/
// Porter stemmer in Javascript. Few comments, but it's easy to follow against the rules in the original
// paper, in
//
//  Porter, 1980, An algorithm for suffix stripping, Program, Vol. 14,
//  no. 3, pp 130-137,
//
// see also http://www.tartarus.org/~martin/PorterStemmer

// Release 1 be 'andargor', Jul 2004
// Release 2 (substantially revised) by Christopher McKenzie, Aug 2009

var stemmer = (function(){
	var step2list = {
			"ational" : "ate",
			"tional" : "tion",
			"enci" : "ence",
			"anci" : "ance",
			"izer" : "ize",
			"bli" : "ble",
			"alli" : "al",
			"entli" : "ent",
			"eli" : "e",
			"ousli" : "ous",
			"ization" : "ize",
			"ation" : "ate",
			"ator" : "ate",
			"alism" : "al",
			"iveness" : "ive",
			"fulness" : "ful",
			"ousness" : "ous",
			"aliti" : "al",
			"iviti" : "ive",
			"biliti" : "ble",
			"logi" : "log"
		},

		step3list = {
			"icate" : "ic",
			"ative" : "",
			"alize" : "al",
			"iciti" : "ic",
			"ical" : "ic",
			"ful" : "",
			"ness" : ""
		},

		c = "[^aeiou]",          // consonant
		v = "[aeiouy]",          // vowel
		C = c + "[^aeiouy]*",    // consonant sequence
		V = v + "[aeiou]*",      // vowel sequence

		mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
		meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
		mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
		s_v = "^(" + C + ")?" + v;                   // vowel in stem

	return function (w) {
		var 	stem,
			suffix,
			firstch,
			re,
			re2,
			re3,
			re4,
			origword = w;

		if (w.length < 3) { return w; }

		firstch = w.substr(0,1);
		if (firstch == "y") {
			w = firstch.toUpperCase() + w.substr(1);
		}

		// Step 1a
		re = /^(.+?)(ss|i)es$/;
		re2 = /^(.+?)([^s])s$/;

		if (re.test(w)) { w = w.replace(re,"$1$2"); }
		else if (re2.test(w)) {	w = w.replace(re2,"$1$2"); }

		// Step 1b
		re = /^(.+?)eed$/;
		re2 = /^(.+?)(ed|ing)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			re = new RegExp(mgr0);
			if (re.test(fp[1])) {
				re = /.$/;
				w = w.replace(re,"");
			}
		} else if (re2.test(w)) {
			var fp = re2.exec(w);
			stem = fp[1];
			re2 = new RegExp(s_v);
			if (re2.test(stem)) {
				w = stem;
				re2 = /(at|bl|iz)$/;
				re3 = new RegExp("([^aeiouylsz])\\1$");
				re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
				if (re2.test(w)) {	w = w + "e"; }
				else if (re3.test(w)) { re = /.$/; w = w.replace(re,""); }
				else if (re4.test(w)) { w = w + "e"; }
			}
		}

		// Step 1c
		re = /^(.+?)y$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			re = new RegExp(s_v);
			if (re.test(stem)) { w = stem + "i"; }
		}

		// Step 2
		re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			suffix = fp[2];
			re = new RegExp(mgr0);
			if (re.test(stem)) {
				w = stem + step2list[suffix];
			}
		}

		// Step 3
		re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			suffix = fp[2];
			re = new RegExp(mgr0);
			if (re.test(stem)) {
				w = stem + step3list[suffix];
			}
		}

		// Step 4
		re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
		re2 = /^(.+?)(s|t)(ion)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			re = new RegExp(mgr1);
			if (re.test(stem)) {
				w = stem;
			}
		} else if (re2.test(w)) {
			var fp = re2.exec(w);
			stem = fp[1] + fp[2];
			re2 = new RegExp(mgr1);
			if (re2.test(stem)) {
				w = stem;
			}
		}

		// Step 5
		re = /^(.+?)e$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			re = new RegExp(mgr1);
			re2 = new RegExp(meq1);
			re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
			if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
				w = stem;
			}
		}

		re = /ll$/;
		re2 = new RegExp(mgr1);
		if (re.test(w) && re2.test(w)) {
			re = /.$/;
			w = w.replace(re,"");
		}

		// and turn initial Y back to y

		if (firstch == "y") {
			w = firstch.toLowerCase() + w.substr(1);
		}

		return w;
	}
})();


if (KEYWORD_TOOLBAR_DEV_MODE) {
	/*
	 * Firefox is pretty annoying in that you have no way of knowing when you
	 * have a syntax error and it decided to throw out all your JS. So a simple
	 * alert will let us know we are A okay in regards to compiler issues. 
	 */
	alert("NO SYNTAX ERROR\n");
}

KeywordToolbarObject.init();

