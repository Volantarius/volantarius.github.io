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

function check_for_pattern(token, line_number, letter_position) {
	// We can probably still get nulls like most string searching functions do
	if (token === "") {return false;};
	
	console.log(token);
	
	if (token === "//") {
		console.log(`Comment at ${line_number}:${letter_position}`);
	};
	
};

function tokenize(text_input) {
	let search_buffer = "";
	let line_number = 0;
	let letter_position = 0;
	
	// TODO: replace with expressions, and charcodes??
	for (let i = 0; i < text_input.length; i++) {
		const letter = text_input[i];
		
		if (!letter || letter === "") {continue;};
		
		// @NOTE: This will count the newlines and spaces while this is here
		letter_position += 1;
		
		// Terminators
		if (letter === "\n" || search_buffer === "\r\n") {// FUCKING WINDOWS NINETY EIGHT
			line_number += 1;
			letter_position = 0;
			
			check_for_pattern(search_buffer, line_number, letter_position);
			
			search_buffer = "";
			
			continue;
		};
		
		// Skip spaces and tabs
		if (letter === " " || letter === "\t") {
			check_for_pattern(search_buffer, line_number, letter_position);
			
			search_buffer = "";
			
			continue;
		};
		
		search_buffer += letter;
	};
	
};

function sample_test() {
	const code_blocks = document.getElementsByClassName('codesnippet');
	
	tokenize(code_blocks[0].textContent);
};

document.addEventListener('DOMContentLoaded', sample_test);