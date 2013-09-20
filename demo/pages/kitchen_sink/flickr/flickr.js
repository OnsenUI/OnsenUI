function FlickrController($scope, $timeout) {

	$scope.fetchPhotos = function() {
		$scope.isFetching = true;
		$.ajax({
			url: "http://api.flickr.com/services/feeds/photos_public.gne?format=json",
			dataType: "jsonp",
			error: function(error) {
				console.error("error:", error);
			},
			success: function(response) {
				console.log('success:', response);
			}
		});

		$timeout(function() {
			$scope.$apply(function() {
				$scope.failed = true;
				$scope.isFetching = false;
			});
		}, 8000);

	};

	window.jsonFlickrFeed = function(feeds) {
		$scope.$apply(function() {
			$scope.feeds = feeds;
			$scope.isFetching = false;
			$scope.failed = false;
		});
	}
}