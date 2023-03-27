// Volantarius 2023
// Christian Nye
// volantarius@gmail.com
console.log("volantarius@gmail.com");

function vcE( tagName, parentNode, className, attributes, innerText ) {
	let newEle = document.createElement(tagName);
	
	newEle.className = className || "";
	
	if ( attributes ) {
		for (const [key, value] of Object.entries(attributes)) {
			newEle.setAttribute(key, value)
		};
	};
	
	if (parentNode) {
		parentNode.appendChild(newEle)
	};
	
	if (innerText) {
		newEle.innerText = innerText;
	};
	
	return newEle;
};

//Basic hightlighter for code snippets lol

let highlight_js_control = [
	"let", "const", "function"
];

function highlight(text_input) {
	let search_buffer = "";
	let search_buffer_length = 0;
	let line_number = 0;
	let letter_position = 0;
	
	let numeric = false;
	let operator = false;
	let comment_block_count = 0;// count the number of blocks for scope
	let comment_block_accumulate = 0;
	let comment_buffer = "";
	let comment_line = false;
	
	let output = "";
	
	for (let i = 0; i < text_input.length; i++) {
		const letter = text_input[i];
		
		// counts lf and crlf
		letter_position += 1;
		
		let terminator_newline = false;
		let terminator_space = false;
		let terminator_punc = false;
		let skip_full_text = false;
		
		if (letter === "\n" || letter === "\r") {
			terminator_newline = true;
		};
		
		if (letter === " " || letter === "\t") {
			terminator_space = true;
		};
		
		if (letter === ";" || letter === ":" || letter === "}" || letter === "{" || letter === ")" || letter === "(") {
			terminator_punc = true;
		};
		
		// operators
		//if (letter === "=" || letter === "*" || letter === "!" || letter === "^" || letter === "&" || letter === "-" || letter === "+") {
		//	operator = true;
		//	
		//	terminator_punc = true;
		//};
		
		if (letter === "/" || letter === "*") {
			comment_buffer += letter;
			
			terminator_punc = true;
		} else {
			if (comment_buffer.length == 1) {
				comment_buffer = "";
			};
		};
		
		
		if (comment_buffer.length == 2) {
			let good = false;
			
			if (comment_buffer === "//") {
				comment_line = true;
				good = true;
			};
			
			if (comment_buffer === "/*") {
				comment_block_accumulate = 1;
				good = true;
			};
			
			if (comment_buffer === "*/" && comment_block_count > 0) {
				comment_block_accumulate = -1;
				good = true;
			};
			
			if (!good) {
				comment_buffer = "";
			};
		};
		
		if (!terminator_punc && search_buffer.length === 0 && (letter >= "0" && letter <= "9") || (numeric && letter === ".")) {
			numeric = true;
		};
		
		// TODO: This should be elsewhere and better, but time is a vampire
		if ((terminator_punc || terminator_space || terminator_newline) && comment_block_count < 1 && !comment_line) {
			// check section for name or number
			
			//console.log(search_buffer);
			
			if (numeric) {
				output += `<span class="number">${search_buffer}</span>`;
				
				search_buffer = "";
				
				numeric = false;
				comment_line = false;
				operator = false;
				
				skip_full_text = true;
			} else if (highlight_js_control.includes(search_buffer.toLowerCase())) {
				output += `<span class="control">${search_buffer}</span>`;
				
				search_buffer = "";
				numeric = false;
				comment_line = false;
				operator = false;
				
				skip_full_text = true;
			};
		};
		
		// Comment Lines Only: Disable space and punctutation terminators
		if (comment_line) {
			terminator_punc = false;
			terminator_space = false;
		};
		
		search_buffer += letter;
		
		// Allow comments to accumulate in the search buffer
		if (!skip_full_text && ((terminator_punc && comment_buffer.length < 1) || terminator_newline || terminator_space)) {
			
			if (comment_line && terminator_newline) {
				search_buffer = `<span class="comment">${search_buffer}</span>`;
				
				comment_buffer = "";
			};
			
			if (comment_block_accumulate != 0 && comment_buffer.length == 2) {
				comment_block_count += comment_block_accumulate;
				
				if (comment_block_accumulate < 0) {
					
					search_buffer = `${search_buffer}</span>`;
					
				} else if (comment_block_accumulate > 0) {
					
					search_buffer = `<span class="comment">${search_buffer}`;
					
				};
				
				comment_block_accumulate = 0;
				comment_buffer = "";
			};
			
			// Highlight special punctuations
			//if (terminator_punc && comment_block_accumulate == 0 && !comment_line) {
			//	if (operator) {
			//		search_buffer = `<span class="control">${search_buffer}</span>`;
			//	};
			//};
			
			output += search_buffer;
			
			search_buffer = "";
			
			numeric = false;
			comment_line = false;
			operator = false;
		};
		
		if (terminator_newline) {
			line_number += 1;
			
			letter_position = 0;
			
			numeric = false;
			comment_line = false;
			operator = false;
		};
	};
	
	// close all escaped comment blocks
	for (let i = 0; i < comment_block_count; i++) {
		output += "</span>";
	};
	
	//console.log("output\n", output);
	
	return output;
};

function sample_test() {
	const code_blocks = document.getElementsByClassName('codesnippet');
	
	let code_dom = code_blocks[0];
	
	code_dom.innerHTML = highlight(code_dom.textContent);
	
	//let artistHead = vcE("h3", code_dom, null, null, "Artist");
};

document.addEventListener('DOMContentLoaded', sample_test);