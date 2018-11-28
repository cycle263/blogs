## prototype

![prototype](./images/prototype.png)

摘录《javascript高级程序设计》的部分

![prototype](./images/instance.png)

```js
function SuperType(){
	this.property = 'super';
}

SuperType.prototype.getSuperValue = function(){
	return this.property;
};

function SubType(){
	this.subproperty = 'sub';
}

// 继承了SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function(){
	return this.subproperty;
};

var instance = new SubType();
console.log(instance.getSuperValue());  // super
console.log(instance.getSubValue());    // sub
```
