var api_key = "AIzaSyBx2meHx3bzJag3PxacbCMeWxTgXjnLv-M";
var counter = 0;

var artist = "";
var track = "";
var trackId = "";

var submitFunction = function (event) {
    event.preventDefault();  
    var q = artist+track;
  
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&maxResults=25&order=relevance&q=" + q + "&type=video&videoEmbeddable=true&fields=items%2Fid&key=" + api_key;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        videoId = response.items[counter].id.videoId;
        console.log(videoId);
        $("#video").empty();
        $("#video").attr("src", "https://www.youtube.com/embed/" + response.items[counter].id.videoId);
    });
}

$(document).on("click", ".option-button", function (event) {
    artist = $(this).attr('data-artist');
    track = $(this).attr('data-track');
    trackId = $(this).attr('data-trackid');
    $('#top-3').removeClass('hide');
    $('#search-returns').addClass('hide');
    $('#search-field').val("");
    submitFunction(event)
    counter = 0;
});
$("#noWork").on("click", function (event) {
    counter++
    submitFunction(event);
});