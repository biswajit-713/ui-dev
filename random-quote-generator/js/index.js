var arrColor = ["#91BC9B", "#AEAD60", "#CD593C"];
var tweetMessage = "";

function getQuote(){

  /* change the background of the page, button and the text color */
  var colorLength = arrColor.length;
  var randomNum = Math.floor(Math.random() * colorLength);
  var colorValue = arrColor[randomNum];
  $("body").css("background-color", colorValue);
  $("#quote-container__message").css("color", colorValue);
  $("#quote-container__name").css("color", colorValue);
  $("#new-quote-button").css("background-color", colorValue);

  $.ajax({
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/",
    headers: {
      "X-Mashape-Key": "FVcICABgHimshwjqjzFTvO18eRe8p1is7EFjsnFp6aLoGbig1H",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function (message){
    if (typeof message == "string") {
      r = JSON.parse(r);
    }
    /*
    $("#quote-container__message").html('<i class="fa fa-quote-left" aria-hidden="true"></i> ' + message.quote
    + ' <i class="fa fa-quote-right" aria-hidden="true"></i>');
    */
    $("#quote-container__message").animate({'opacity': 0}, 500, function () {
      $(this).html('<i class="fa fa-quote-left" aria-hidden="true"></i> ' + message.quote
      + ' <i class="fa fa-quote-right" aria-hidden="true"></i>');
    }).animate({'opacity': 1}, 500);

    $("#quote-container__name").animate({'opacity': 0}, 500, function () {
      $(this).text(" - " + message.author);
    }).animate({'opacity': 1}, 500);

    tweetMessage = message.quote;
  });
}

$(document).ready(function () {
  getQuote();
  $("#new-quote-button").on("click", getQuote);
  $("#social-button").on("click", function () {
    var tweettLink = "http://twitter.com/home?status=" + encodeURI(tweetMessage) ;
    window.open(tweettLink, "_blank");
  })
});
