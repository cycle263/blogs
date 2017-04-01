## $scope

  * 每个controller都会有自己的scope，所有的scope都是属于 $rootScope，通过$rootScope.$broadcast 广播每个controller都能收到事件

  * 兄弟$scope之间的通信，可以有两种方式，一种是$scope.$emit，然后通过监听$rootScope的事件获取参数；另一种是$rootScope.$broadcast，通过监听$scope的事件获取参数。

  * 将数据储存在专门的service，并且设置相应getter/setter，具体如下：每个controller依赖service, call service.setter(...)；统一的service.setter(...)在改完数据后可以$emit('data-updated')；每个controller里$on('data-updated', function(){  $scope.data = service.getData() })
