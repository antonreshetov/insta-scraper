/**
 * author: Anton Reshetov
 * url: https://github.com/antonreshetov
 * @param {string} username - instagram username
 * @param {string} thumbnails - thumbnails (thumbnail_src, display_src)
 * @param {string} element - DOM element
 */

function instaScraper(element, username, thumbnails) {
    if (!username) {
        throw new Error('Username is required');
    }
    if (!element) {
        throw new Error('DOM element not selected');
    }
    var instaURL = 'http://instagram.com/' + username;
    var instaPageLink = 'http://instagram.com/p/';
    var thumb = thumbnails || 'display_src';

    // YQL query
    $.getJSON(
        'http://query.yahooapis.com/v1/public/yql?callback=?',
        {
            q: "select * from html where url='" + instaURL + "' and xpath='*'",
            format: 'json'
        },
        function (data) {
            if (data.query.results != null) {
                var queryData = data.query.results.html.body.script["0"].content.replace('window._sharedData = ', '').replace(';', '');
                queryData = $.parseJSON(queryData);
                // console.log(queryData);
                var item = queryData.entry_data.ProfilePage["0"].user.media.nodes;
                for (var i = 0; i < item.length; i++) {
                    var imgURL = item[i][thumb];
                    var likes = item[i].likes.count;
                    var link = instaPageLink + item[i].code;
                    $(element).append('' +
                        '<div class="col-xs-4">' +
                        '<a href="' + link + '">' +
                        '<img src="' + imgURL + '" alt="" class="img-responsive">' +
                        '<p class="text-center">Likes: ' + likes + '</p>' +
                        '</a>' +
                        '</div>');
                }
            } else {
                throw new Error('Non-existing or private account');
            }
        })
}
instaScraper('.row', 'corgis_of_instagram');