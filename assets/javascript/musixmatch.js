// Javascript for getting lyrics through musixmatch will go in this file

$("#search-1").on("submit", function(event) {
  event.preventDefault();
  $("#search-returns").removeClass("hide");
  var searchTerm = $("#search-field")
    .val()
    .trim();
  console.log(searchTerm);
  // empties the table so build your next search
  $("#track-table").empty();
  $("#artist-table").empty();
  //searching by track
  $.ajax({
    type: "GET",
    data: {
      apikey: "424fd241877633888bbe33c4d8ce3c72",
      q: searchTerm,
      format: "jsonp",
      callback: "jsonp_callback"
    },
    url:
      "https://api.musixmatch.com/ws/1.1/track.search?f_lyrics_language=en&f_has_lyrics&s_track_rating=desc&q_track=",
    dataType: "jsonp",
    jsonpCallback: "jsonp_callback",
    contentType: "application/json"
  }).then(function(data) {
    console.log(data);
    for (let i = 0; i < 10; i++) {
      let track = data.message.body.track_list[i].track.track_name;
      let artist = data.message.body.track_list[i].track.artist_name;
      let trackId = data.message.body.track_list[i].track.track_id;

      let newRow = $("<tr>");
      let newTH = $("<th>");
      let newTD = $("<td>");
      let newTag = $("<a>");
      newTD.text(track);
      newTH.text(artist);
      newTag.addClass("option-button waves-effect waves-red btn-flat");
      newTag.attr("data-artist", artist);
      newTag.attr("data-trackId", trackId);
      newTag.attr("data-track", track);
      newTag.attr("data-id", trackId);
      newTag.text("Select");
      newRow
        .append(newTag)
        .append(newTH)
        .append(newTD);
      $("#artist-table").append(newRow);
    }
  });
});

$(document).on("click", ".option-button, .favorites-button", function(event) {

  var id = $(this).attr("data-id");
  console.log(id);

  $("#lyrics").empty();

  $.ajax({
    type: "GET",
    data: {
      apikey: "424fd241877633888bbe33c4d8ce3c72",
      track_id: id,
      format: "jsonp",
      callback: "jsonp_callback"
    },
    url:
      "https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=",
    dataType: "jsonp",
    jsonpCallback: "jsonp_callback",
    contentType: "application/json"
  }).then(function(data) {

    var lyrics = data.message.body.lyrics.lyrics_body;
    var lyricPre = $("<pre>");

    lyricPre.text(lyrics);

    $("#lyrics").append(lyricPre);

    console.log(lyrics);
  });

  
});


