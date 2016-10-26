var YouTube_URL = "https://www.googleapis.com/youtube/v3/search";

// event listener for search terms
$("#submit-search").click(function(event) {
		event.preventDefault();
		var query = $("#search-field").val();
		getDataFromApi(query);
		window.query = query;
	})

// connect to API and send query. If successful, run "response" function
function getDataFromApi(query) {
	var request = $.ajax({
		url: YouTube_URL,
		data: {
			q: query,
			type: "video",
			part: "snippet",
			key: "AIzaSyC49xZx8wQa_MDyXuIwjVCYjlsrNbfGxHg",
			maxResults: "25"
		},
        success: response
	});
}

// append HTML onto page with this content received from API. 
function response(res) {
	console.log(res)
	$('#content').html("");
	$('#content').append('<ul></ul>');
	res.items.forEach(function(item) {
    	$('#content ul').append('<li><p>' + item.snippet.title + '</p><a href="https://www.youtube.com/watch?v=' + item.id.videoId + '" data-lity><img src="' + item.snippet.thumbnails.default.url + '"></a><div id="channel"><a href="https://www.youtube.com/channel/' + item.snippet.channelId + '">Visit Channel</a></li>');
	})

	// create "next" button for viewing more videos
	$('#content').append('<div id="pages"><button id="next" type="submit">Next Page</button></div>');

	// event listener for calling API again using the next page token
	$('#next').click(function() {
		getDataFromApiPg(res.nextPageToken);
	})

	// if there is a previous page token, create a button for the user
	if (res.prevPageToken) {
		$('#content').append('<div id="pages"><button id="prev" type="submit">Previous Page</button></div>');

		// load up the previous page using the API and token
		$('#prev').click(function() {
		getDataFromApiPg(res.prevPageToken);
		})
	}
}

// separate API call for when there's a token involved
function getDataFromApiPg(token) {
	var request = $.ajax({
		url: YouTube_URL,
		data: {
			q: query,
			pageToken: token,
			type: "video",
			part: "snippet",
			key: "AIzaSyC49xZx8wQa_MDyXuIwjVCYjlsrNbfGxHg",
			maxResults: "25"
		},
        success: response
	});
}
