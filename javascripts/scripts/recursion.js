//数组生成树
var data = [{"name":"根节点","fatherId":0,"id":1},
      {"name":"节点1","fatherId":1,"id":2},
      {"name":"根节点","fatherId":0,"id":3}]
var item, arr = [], obj = {};

for (var i = 0, l = data.length; i < l; i++) {
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

// list to tree
function list_to_tree(list) {
  var map = {}, node, roots = [], i;
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== "0") {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

//递归树，生成list
function searchTree(element, matchingTitle){
    if(element.title == matchingTitle) {
        return element;
    } else if (element.children != null) {
        var result = null;
        for(let i = 0; result == null && i < element.children.length; i++){
            result = searchTree(element.children[i], matchingTitle);
        }
        return result;
    }
    return null;
}

// 递归过滤
var steamroller = item => {
  if (item.subMenu && item.subMenu.length) {
    item.subMenu = item.subMenu.filter(steamroller);
    return true;
  } else {
    return item.checked;
  }
};

[].filter(steamroller);

// 树形扁平化
let checkedkeys = [];
const steamroller = arr => arr.map(item => {
  item.checked && checkedkeys.push(item.name);
  if (item.subMenu && item.subMenu.length) {
    steamroller(item.subMenu);
  }
});

steamroller([])



