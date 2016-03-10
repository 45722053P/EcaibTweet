
app.controller('Controlador', ["$scope", "getUser", "getUserTweets", "getFollowings", "getFollowingTweets",
    function($scope, getUser, getUserTweets, getFollowings, getFollowingTweets) {

        $scope.setUser = function() {
            $scope.UserName = $scope.user;
            $scope.user = "";
            var datos = getUser($scope.UserName);
            $scope.Nombre = datos.nom;
            $scope.Descripion = datos.desc;
            $scope.userTweets = getUserTweets($scope.UserName);
            $scope.followings = getFollowings($scope.UserName);
            $scope.followingTweets = getFollowingTweets($scope.UserName);
        };

        $scope.tweet = function() {
            $scope.userTweets.$add({text: $scope.tweetTxt});
            $scope.tweetTxt = "";
        }

        $scope.follow = function() {
            $scope.followings.$add({idUser: $scope.userFolow});
            $scope.userFolow = "";
        }
    }]);

app.factory("getUser", ["$firebaseObject",
    function($firebaseObject) {
        return function(user) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");

            return {nom: $firebaseObject(ref.child(user).child("name")),
                desc: $firebaseObject(ref.child(user).child("descripcion"))};
        };
    }
]);

app.factory("getUserTweets", ["$firebaseArray",
    function($firebaseArray) {
        return function(user) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(ref.child(user).child("tweets"));
        };
    }
]);

app.factory("getFollowings", ["$firebaseArray",
    function($firebaseArray) {
        return function(user) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(ref.child(user).child("following"));
        };
    }
]);

app.factory("getFollowingTweets", ["$firebaseArray",
    function($firebaseArray) {
        return function(user) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(ref.child(user).child("following"));
        };
    }
]);
