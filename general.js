// Volantarius 2023
// Christian Nye
// volantarius@gmail.com
console.log("volantarius@gmail.com");

//Basic hightlighter for code snippets lol

/*
// This is a comment
const num1 = 42;
const num2 = 3.14;
console.log(num1 + num2);
*/

function check_for_pattern(token) {
	if (search_buffer === "//") {
		console.log("Comment at ", line_number, ":", letter_position);
		search_buffer = "";
	};
};

function tokenize(text_input) {
	
	let search_buffer = "";
	let line_number = 0;
	let letter_position = 0;
	
	// TODO: replace with expressions, and charcodes??
	for (let i = 0; i < text_input.length; i++) {
		const letter = text_input[i];
		
		search_buffer += letter;
		
		letter_position += 1;
		
		terminate = false;
		
		// Skip spaces and tabs
		if (letter === " " || letter === "\t") {
			terminate = true;
		};
		
		// TODO: Where does the check_for_pattern(search_buffer);
		
		// Terminators
		if (search_buffer === "\n") {// OH AND CARRIAGE RETURN FUCKING WINDOWS NINETY EIGHT
			line_number += 1;
			letter_position = 0;
			search_buffer = "";
		};
		
		if (terminate) {
			search_buffer = "";
		};
	};
	
};

function sample_test() {
	const code_blocks = document.getElementsByClassName('codesnippet');
	
	tokenize(code_blocks[0].textContent);
};

document.addEventListener('DOMContentLoaded', sample_test);