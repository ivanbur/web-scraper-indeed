console.log("debug");

var fileName = "my-download.json";

var saveData = (function () {
	var a = document.createElement("a");
	$("body").append(a);
	a.style = "display: none";
	return function (data, filename) {
		var json = JSON.stringify(data),
			blob = new Blob([json], {type: "octet/stream"}),
			url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = fileName;
		a.click();
		window.URL.revokeObjectURL(url);
	};
}());

var data = {"job": "computer programmer", "location": "freemont, ca"};

if (document.cookie != "downloaded=true") {
	saveData(data, fileName);
	document.cookie = "downloaded=true";
}

function openTabs() {
	$.getJSON("./static/js/output.json", function (data) {
		for (var i = 0; i < data["allLinks"].length; i++) {
			window.open("https://www.indeed.com/" + data["allLinks"][i]);
		}
	});
}