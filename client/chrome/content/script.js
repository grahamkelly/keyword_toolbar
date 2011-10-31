var KeywordToolbarObject = {
	max_ngram_size: 5,


	/**
	 * 
	 *
	 *
	 */
	keyword_button: function(event) {
		//alert(gBrowser.contentDocument.title);
		this.document_keywords(gBrowser.contentDocument);
	},

	/**
	 *
	 *
	 */
	document_keywords: function(doc) {
		var title = doc.title;
		this.build_ngrams(doc.body.textContent);
	},


	/** 
	 *
	 *
	 */
	build_ngrams: function(str) {
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


	build_block_ngrams: function(str) {
		var ngrams = Array();
		var i = 0;
		str = str.replace(/^\s+|\s+$|[\!\@\#\%\^\&\*\(\)\?\_\-\+\~\`\:\;\<\>\"\{\}\[\]\|\\]/g, '');

		if (str.length == 0 || str == ".") {
			return ngrams;
		}

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

		
		for (i = 0; i < words.length; i++) {
			var ngram_text = "";

			for (var j = i; j < (i+this.max_ngram_size) && j < words.length; j++) {
				ngram_text += " "+words[j];		
			
				if (typeof ngrams[ngram_text] == "undefined") {
					ngrams[ngram_text] = 1;
				} else {
					ngrams[ngram_text]++;
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
