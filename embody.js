// Horray stuff!

//vcE( tagName, parentNode, className, attributes, innerText )

const DOM_OTHER = document.getElementById("other");
const POTD = document.getElementById("pictureoftheday");

const nasa_api_headers = new Headers();
nasa_api_headers.append("Accept", "application/json");

const nasa_api_init = {
	method: "GET",
	headers: nasa_api_headers,
	mode: "cors",
	cache: "default"
};

//const nasa_apod_url = "https://api.nasa.gov/planetary/apod?api_key=5B6oJsSCQyekXZvNOKpsUhRPl1e7FHqjIAyHpybk&count=5";

const nasa_apod_url = "https://api.nasa.gov/planetary/apod?api_key=5B6oJsSCQyekXZvNOKpsUhRPl1e7FHqjIAyHpybk";

function nasa_apod_recieve(data) {
	/*
	title
	url
	data
	explanation
	copyright
	hdurl
	media_type
	*/
	
	if (data.length > 0) {
		
		for (let i = 0; i < data.length; i++) {
			vcE("img", POTD, null, {src: data[i].url, title: data[i].title}, null);
		};
		
	} else {
		
		vcE("img", POTD, null, {src: data.url, title: data.title}, null);
		
		vcE("h3", DOM_OTHER, null, null, data.title);
		vcE("p", DOM_OTHER, null, null, data.copyright)
		vcE("p", DOM_OTHER, null, null, data.explanation);
		
	};
	
	//Update scroll
	POTD.scrollTo(0, 0);
};

// Ughh fetch, the worst documented javascript feature ever.
fetch(nasa_apod_url, nasa_api_init).then((res) => {
	if (!res.ok) {throw new Error("Ah fiddlesticks")};
	
	return res.json();
}).then((data) => {
	nasa_apod_recieve(data);
});