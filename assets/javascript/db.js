var config = {
  apiKey: "###",
  authDomain: "musicmatch-api.firebaseapp.com",
  databaseURL: "https://musicmatch-api.firebaseio.com",
  projectId: "musicmatch-api",
  storageBucket: "",
  messagingSenderId: "970010529438"
};
firebase.initializeApp(config);

let database = firebase.database();

$("#favorite-button").on("click", function() {
  database.ref().push({
    artist: artist,
    track: track,
    trackid: trackId
  });
  location.reload();
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  let favArtist = childSnapshot.val().artist;
  let favTrack = childSnapshot.val().track;
  let key = childSnapshot.key;
  let trackId = childSnapshot.val().trackid;

  let favListItem = $("<li>");
  let favTag = $("<a>");
  favTag.addClass("f-button waves-effect waves-red btn-flat");
  favTag.attr("data-artist", favArtist);
  favTag.attr("data-id", trackId);
  favTag.attr("data-track", favTrack);
  favTag.attr("data-key", key);
  favTag.text(favArtist + " - " + favTrack);
  favListItem.append(favTag);

  $("#slide-out").append(favListItem);
  // $('#favorites').append(favListItem);
});

$(document).on("click", ".favorites-button", function(event) {
  artist = $(this).attr("data-artist");
  track = $(this).attr("data-track");
  $("#slide-out").hide();
  $("#top-3").removeClass("hide");
  $("#favorites-bar").addClass("hide");
  $("#search-field").val("");
  submitFunction(event);
  counter = 0;
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  let favArtist = childSnapshot.val().artist;
  let favTrack = childSnapshot.val().track;
  let key = childSnapshot.key;
  let trackId = childSnapshot.val().trackid;
  let remove = $("<a>");
  remove.addClass("btn-floating btn-small waves-effect waves-light red");
  remove.text("X");

  let favListItem = $("<li>");
  let favTag = $("<a>");
  favTag.addClass("favorites-button waves-effect waves-red btn-flat");
  favTag.attr("data-artist", favArtist);
  favTag.attr("data-id", trackId);
  favTag.attr("data-track", favTrack);
  favTag.attr("data-key", key);
  favTag.text(favArtist + " - " + favTrack);
  favListItem.append(favTag);
  favListItem.append(remove);

  // $('#slide-out').append(favListItem);
  $("#favorites").append(favListItem);
});
