//数组生成树
var data = [{"categoryName":"根节点","fatherId":0,"id":1},{"categoryName":"根节点","fatherId":1,"id":2},{"categoryName":"根节点","fatherId":0,"id":3}]
var item, arr = [], obj = {};

for(var i = 0, l = data.length; i < l; i++){
   item = data[i];
   item.children = [];
   obj[item.id] = i;             //记住此节点在数组中的索引位置，以便于添加children
   if(item.fatherId !== 0){
      data[obj[item.fatherId]].children.push(item);     //添加children
   }else{
      arr.push(item);
   }
}
console.log(arr);

//递归树，生成list
function searchTree(element, matchingTitle){
     if(element.title == matchingTitle){
          return element;
     }else if (element.children != null){
          var result = null;
          for(i=0; result == null && i < element.children.length; i++){
               result = searchTree(element.children[i], matchingTitle);
          }
          return result;
     }
     return null;
}
