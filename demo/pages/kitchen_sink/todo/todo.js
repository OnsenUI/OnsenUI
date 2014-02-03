function TodosController($scope) {
	$scope.todos = [];
	$scope.newTodo = {
		text: ''
	};

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