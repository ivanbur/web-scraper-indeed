console.log("debug");

function openTabs() {
	$.getJSON("./static/js/output.json", function (data) {
		for (var i = 0; i < data["allLinks"].length; i++) {
			window.open("https://www.indeed.com/" + data["allLinks"][i]);
		}
	});

	var jsonObj = {
		"job": $("#jobInput").val(),
		"location": $("#locationInput").val()
	}
}

