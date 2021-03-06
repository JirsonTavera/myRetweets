/*
 * GET home page.
 */
var twitter = require('ntwitter');
var twitterApi = new twitter( {
    consumer_key: 'aMqJIVr3n5jdzWCgBsZw',
    consumer_secret: 'DAiMY3vgwg4WkDX2qRGc4K0c0eqNPnyNNGcFCDiW2o',
    access_token_key: '302743670-tW5XMpMXgIC8FerBy2oujCJgZdcoIxVf8E3gyjFv',
    access_token_secret: 'zU9m8RXkTwBMSovAJ93LVBRG2zQ7JS6IGvUF45iAYLseH'
});

exports.index = function(request, response) {

    /**
     * gets userTimeLine and filter retweets to be shown
     * @param  {[numeric]} user_id  [my tweeter user_id]
     * @param  {[numeric]} counr [description]
     * @param  {[numeric]} counr [description]
     * @return {[json array]}      [description]
     */
    twitterApi.getUserTimeline( {'user_id':302743670, 'count':50, 'include_rts':true}, function(err, data) {
        if (!err) {
            var retweets = {};
            var i = 0;
            for (var tweet in data) {
                //if tweet is a retweet
                if (data[tweet].retweeted === true) {
                    //tweet owner
                    var screenName = "@"+data[tweet].retweeted_status.user.screen_name;
                    //removing screenName from retweet text
                    var str = data[tweet].text.split(": ");
                    var retweetText = str[1];
                    //retweet :)
                    var retweet = {"owner": screenName, "text":retweetText};
                    retweets[i] = retweet;
                    i++;
                }
            }
            response.render('index', { title: 'My retweets',error:'', tweets: retweets });
        } else {
            response.send(err, 400);
            }
    });
};