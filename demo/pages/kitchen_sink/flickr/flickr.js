function FlickrController ($scope) {

    $scope.fetchPhotos = function(){
        $scope.failed = false;        
		$scope.isFetching = true;
        
		$.ajax({
			url: "http://api.flickr.com/services/feeds/photos_public.gne?format=json",
			dataType: "jsonp",
            jsonpCallback: 'jsonFlickrFeed',			
			success: function(feeds){
                $scope.$apply(function(){
            		$scope.feeds = feeds;
        			$scope.isFetching = false;
        			$scope.failed = false;
        		});
			},
            error: function(error){
                $scope.$apply(function(){
                    $scope.failed = true;    				                
                    $scope.isFetching = false;    
                });
			}
		});
	};
}

