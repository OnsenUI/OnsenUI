function TodosController($scope) {
	$scope.todos = [];

	$scope.addTodo = function(todoText) {
		var todo = {
			text: todoText
		};
		$scope.todos.push(todo);
	};

	$scope.removeTodo = function(index) {
		$scope.todos.splice(index, 1);
	};

}