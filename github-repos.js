$(function() {
  console.log("hello");

  $("form.username").submit(getGithubUserRepos);
});

var getGithubUserRepos = function() {
  resetElements();
  var username = $("input").val();

  var getGithubInfo = function(url) {
    var clientId =  "98b8ee0ac519a59de582";
    var clientSecret = "eeeee8ac27c28940b340dfc2311562e77d7e9b73";
    var authDetails = "?client_id=" + clientId + "&client_secret=" + clientSecret;
    return $.get(url + authDetails);
  };

  var getGithubRepo = function(url) {
    var clientId =  "98b8ee0ac519a59de582";
    var clientSecret = "eeeee8ac27c28940b340dfc2311562e77d7e9b73";
    var authDetails = "?client_id=" + clientId + "&client_secret=" + clientSecret;
    return $.get(url + authDetails);
  };

  var userRequest = getGithubInfo("https://api.github.com/users/" + username);
  userRequest.done(displayUserInfo);
  userRequest.fail(displayError);

  var repoRequest = getGithubRepo("https://api.github.com/users/" + username + "/repos");
  repoRequest.done(displayUserRepo);
  repoRequest.fail(displayError);

  return false;
};

var displayUserInfo = function(html) {
  var userProfile = html;
  // Populate user profile
  $("img.avatar").attr("src", userProfile.avatar_url);
  $("a.name").attr("href", userProfile.html_url);
  $(".profile .name").text(userProfile.name);
  $("p.location").text(userProfile.location);
};

var displayUserRepo = function(html) {
  // Populate repos
  for (i = 0; i < html.length; i++){
    var repo = html[i];
    $("ul.repos").append("<li id=git" + repo.id + "><a href='"+ repo.html_url +"'>" + repo.name + "</a></li>");
    if ( repo.fork ) {
      $("#git" + repo.id).addClass("fork");
    }
  };
};

var resetElements = function() {
  $("img.avatar").attr("src", "");
  $("a.name").attr("href", "");
  $(".profile .name").text("");
  $("p.location").text("");
  $("ul.repos").empty();
  $("h3.error").empty();
};

var displayError = function(xhr) {
  console.log(xhr);
  $("h3.error").text(xhr.statusText);
};
