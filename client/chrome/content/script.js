var KeywordToolbarObject = {
	/*
	 * An upper limit to the number of words that can make up an n-gram. If this
	 * value is set too high too many n-grams will be pulled out of the document
	 * and thus waste memory. If the value is too low we migth not capture the 
	 * full n-grams to extract as keywords fromt he content. 
	 *
	 * A valuye of 5 was arbitraily chosen but seems to work well as it 
	 * produces < 10,000 n-grams for failry wordy pages (i.e. a news article on
	 * cnn.com).
	 */
	max_ngram_size: 5,

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
		var title = doc.title;
		this.build_ngrams(doc.body.textContent);
	},


	/** 
	 * Builds an array of n-grams for a string. 
	 *
	 * @param String str
	 * @return Array
	 */
	build_ngrams: function(str) {
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

		ngrams = this.sortAssoc(ngrams);

		var ngram_count = 0;
		var alertstr = "";
		for (var i in ngrams) {
			ngram_count++;
			alertstr += "["+i+"] = \""+ngrams[i]+"\"\n";
		}
		alert(ngram_count);
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
			var ngram_text = "";
			var stop_words_count = 0;

			for (var j = i; j < (i+this.max_ngram_size) && j < words.length; j++) {
				ngram_text += " "+words[j];	

				if (typeof this.stop_words[words[j]] != "undefined") {
					stop_words_count++;
				}

				if (stop_words_count < (j-i+1)) {
					if (typeof ngrams[ngram_text] == "undefined") {
						ngrams[ngram_text] = 1;
					} else {
						ngrams[ngram_text]++;
					}		
				}
			}
		}

		return ngrams;
	},


	sortAssoc: function(aInput) {
		var aTemp = [];
		for (var sKey in aInput)
			aTemp.push([sKey, aInput[sKey]]);

		aTemp.sort(function () {return arguments[0][1] > arguments[1][1]});

		var aOutput = [];
		for (var nIndex = aTemp.length-1; nIndex >=0; nIndex--)
		aOutput[aTemp[nIndex][0]] = aTemp[nIndex][1];

		return aOutput;
	}
};


alert("NO SYNTAX ERROR\n");
KeywordToolbarObject.init();
