var spamobserver = new MutationObserver(function (mutations, me) {
    var all = document.querySelector("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-aqfbo4.r-zso239.r-1hycxz > div");
    if (all) {
        all.remove()
        me.disconnect();
        return;
    }
});

var tweets = null;
var retweetobserver = new MutationObserver(function (mutations, me) {
    var tweets_now = document.querySelectorAll("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div.css-1dbjc4n.r-1jgb5lz.r-13qz1uu > div > div > section > div > div > div");
    if (tweets !== tweets_now) {
        console.log("update cache");
        tweets = tweets_now;
        tweets.forEach(deltweet);
    }
});

function deltweet(item, index) {
    if (item.textContent.match(/[\w].* Retweeted/)) {
        console.log("Found RT - Removed: "+item.textContent);
        item.style.visibility="hidden";
        item.style.display="none";
    }
    if (item.textContent.match(/[\w].* Liked/)) {
        console.log("Found Like - Removed: "+item.textContent);
        item.style.visibility="hidden";
        item.style.display="none";
    }
}

spamobserver.observe(document, {
  childList: true,
  subtree: true
});

retweetobserver.observe(document, {
    childList: true,
    subtree: true
});
