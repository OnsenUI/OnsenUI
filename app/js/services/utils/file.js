(function(filer) {
	var myApp = angular.module('myApp');

	myApp.factory('FileUtil', function() {

		var FileUtil = Class.extend({
			init: function() {
				this.filer = new Filer();
				this.filer.init();
			},

			getFiler: function() {
				return this.filer;
			},

			mkdir: function(path) {
				var defer = $.Deferred();

				this.filer.mkdir(path, false, function(dirEntry) {
					defer.resolve(dirEntry);
				}, function(e) {
					defer.reject(e);
				});

				return defer.promise();
			},

			write: function(path, content) {
				var defer = $.Deferred();

				this.filer.write(path, {
					data: content
				}, function(fileEntry, fileWriter) {
					defer.resolve(fileEntry, fileWriter);
				}, function(e) {
					defer.reject(e);
				});

				return defer.promise();
			},

			cd: function(path) {
				var defer = $.Deferred();

				this.filer.cd(path, function(fileDirectory) {
					console.log('cd successful');
					defer.resolve();
				}, function(e) {
					defer.reject(e);
				});

				return defer.promise();
			},

			getParentOfPath: function(path) {
				var lastIndex = path.lastIndexOf('/');
				return path.substring(0, lastIndex);
			}
		});

		return FileUtil;

	});
})(filer);