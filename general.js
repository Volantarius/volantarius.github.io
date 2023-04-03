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

function create_overlay() {
	document.body.overlay = vcE("div", document.body, null, {id:"overlay"}, null);
	
	// Just to get things thrown in because it's simplier
	//document.body.overlay.onpointerdown = (event) => {
	document.body.overlay.onpointerup = (event) => {
		event.preventDefault();
		//event.cancelBubble = true;
		//event.stopPropagation();
		//event.stopImmediatePropagation();
		
		document.body.overlay.remove();
	};
	
	return document.body.overlay;
};

// Attach to an image so we can zoom into the image nicely!
function handle_image_zoom(event) {
	//console.log(event);
	event.cancelBubble = true;
	event.stopPropagation();
	event.stopImmediatePropagation();
	event.preventDefault();
	
	let overlay = create_overlay();
	
	// Prevent scroll around while in the overlay
	overlay.onwheel = (e) => {
		e.cancelBubble = true;
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.preventDefault();
	};
	
	let context_button = vcE("div", overlay, "context", null, null);
	// Need to literally modify the style.css to move this without issue...
	context_button.style.left = "4em";
	context_button.style.right = null;
	context_button.style.top = "4em";
	context_button.style.bottom = null;
	context_button.style.setProperty("left", null);
	context_button.style.setProperty("right", "4em");
	context_button.style.setProperty("top", "4em");
	context_button.style.setProperty("bottom", null);
	
	// Move the close button to whichever corner the mouse is at, because that's more intelligent
	overlay.onmousemove = (e) => {
		
		if ( e.clientX < ( window.innerWidth * 0.5 ) ) {
			context_button.style.left = "4em";
			context_button.style.right = null;
			context_button.style.setProperty("left", "4em");
			context_button.style.setProperty("right", null);
		} else {
			context_button.style.left = null;
			context_button.style.right = "4em";
			context_button.style.setProperty("left", null);
			context_button.style.setProperty("right", "4em");
		};
		
		if ( e.clientY < ( window.innerHeight * 0.5 ) ) {
			context_button.style.top = "4em";
			context_button.style.bottom = null;
			context_button.style.setProperty("top", "4em");
			context_button.style.setProperty("bottom", null);
		} else {
			context_button.style.top = null;
			context_button.style.bottom = "4em";
			context_button.style.setProperty("top", null);
			context_button.style.setProperty("bottom", "4em");
		};
	};
	
	let image = vcE("img", overlay, null, {title: "hello!", src:event.srcElement.src}, null);
	
	// Make sure we can control the image properly
	
	image.onpointerdown = (e) => {
		e.cancelBubble = true;
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.preventDefault();
	};
	
	image.customScale = 100;
	
	image.onwheel = (e) => {
		e.cancelBubble = true;
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.preventDefault();
		
		// I don't know about this, I want to drag it around but without all the javascript bullshiz
		
		//let amount = 5 * (e.deltaY % 5);
		
		//image.customScale += amount;
		
		/*if (image.customScale < 60) {
			image.customScale = 60;
		};*/
		
		//image.style.setProperty("scale", `${image.customScale}% ${image.customScale}%`)
		//image.style.setProperty("transform", `translate(-${image.customScale * 0.25}% -${image.customScale * 0.25}%)`)
	};
};

function on_loaded() {
	const code_blocks = document.getElementsByClassName("codesnippet");
	
	for (let i = 0; i < code_blocks.length; i++) {
		let code_dom = code_blocks[i];
		
		code_dom.innerHTML = highlight(code_dom.textContent);
	};
	
	// Setup galleries to have buttons and stuff
	const gallery_images = document.querySelectorAll("div.gallery > img");
	
	for (let i = 0; i < gallery_images.length; i++) {
		gallery_images[i].addEventListener("pointerup", handle_image_zoom);
	};
};

document.addEventListener("DOMContentLoaded", on_loaded);