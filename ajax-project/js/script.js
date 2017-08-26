
var googleApiKey = "AIzaSyDbgITPtqztdoSR1vvhb3NbsTVMYfT12_k";
var nytApiKey = "80105a7dde684f369ddd904519972e25";

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $street = $("#street");
    var $city = $("#city");

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    // YOUR CODE GOES HERE!

    // embed the google streetview image
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=$street.val(), $city.val()">');

    //get articles from nytimes
    var newsUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    newsUrl += "?" + $.param({'api-key': nytApiKey, 'q': $city.val()}) ;
    $.getJSON(newsUrl, function(data) {
        var newsList = [];
        $.each(data.response.docs, function (key, value) {
            $nytElem.append('<li>' + '<a href="' + value.web_url + '" target="_blank">' + value.headline.main + '</a>' + '<p>' + value.snippet + '</p></li>');
        });
    }).fail(function () {
        $nytElem.append('<li>No result found</li>');
    });

    var wikiRequestTimeOut = setTimeout(function(){
            $wikiElem.text("Failed to get wikipedia resource");
    }, 8000);

    //get wikipedia links
    var wikiUrl =  'https://en.wikipedia.org/w/api.php?action=query&titles='+ $city.val() +'&prop=links&imlimit=5&rvprop=content&format=json' ;
    $.ajax({url: wikiUrl, dataType: 'jsonp', 'Access-Control-Allow-Origin':true, headers: { 'Api-User-Agent': 'Example/1.0' },
        success: function (response) {
            var noOfLinksForDisplay = response.query.pages[17867].links.length > 5 ? 5 : response.query.pages[17867].links.length
            var htmlString = "";
            for (var counter = 0; counter < noOfLinksForDisplay; counter ++) {
                htmlString += '<li><p><a target="_blank" href="http://en.wikipedia.org/wiki/' + response.query.pages[17867].links[counter].title +'">'+ response.query.pages[17867].links[counter].title +'</a></p></li>'
            }
            $wikiElem.append(htmlString);
            clearTimeout(wikiRequestTimeOut);
    }});

    return false;
};

$('#form-container').submit(loadData);
