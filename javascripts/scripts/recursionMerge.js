var data1 = [
  {
    "subMenu": [],
    "auth": 'Cur',
    "name": "文件夹1",
    "link": "https://b.htm"
  },
  {
    "subMenu": [],
    "auth": 'Jp',
    "name": "文件夹2",
    "link": "https://b.htm"
  },
  {
    "subMenu": [],
    "auth": 'wer',
    "name": "文件夹3",
    "link": "https://b.htm"
  },
  {
    "subMenu": [],
    "auth": 'Rest',
    "name": "文件夹4",
    "link": "https://re.htm"
  },
  {
    "subMenu": [],
    "auth": 'Tath',
    "name": "文件夹5",
    "link": "https://b.htm"
  },
  {
    "subMenu": [],
    "auth": '',
    "name": "文件夹6",
    "link": "https://b"
  },
  {
    "subMenu": [
      {
        "link": "http://=",
        "name": "文件1",
        "subMenu": [],
        "auth": 9,
        "disabled": true
      },
      {
        "link": "https:/rId=",
        "name": "文件2",
        "subMenu": [],
        "auth": '',
        "disabled": true
      },
      {
        "link": "https://rId=",
        "name": "文件3",
        "subMenu": [],
        "auth": '',
        "disabled": true
      },
      {
        "link": "https://d=",
        "name": "文件4",
        "subMenu": [],
        "auth": 'Bor',
        "disabled": true
      },
      {
        "link": "ht=",
        "name": "文件5",
        "subMenu": [],
        "auth": 'MAT',
        "disabled": true
      },
      {
        "link": "htId=",
        "name": "文件6",
        "subMenu": [],
        "auth": 'Fre',
        "disabled": true
      },
      {
        "link": "hted",
        "name": "文件7",
        "subMenu": [],
        "auth": 'Uni',
        "disabled": true
      },
      {
        "link": "hd=",
        "name": "文件8",
        "subMenu": [],
        "auth": 'Som',
        "disabled": true
      },
      {
        "link": "https",
        "name": "文件9",
        "subMenu": [],
        "auth": 'Mike',
        "disabled": true
      }
    ],
    "auth": [],
    "name": "有子文件",
    "link": ""
  },
  {
    "subMenu": [],
    "auth": [],
    "name": "test7",
    "link": "te"
  },
  {
    "subMenu": [],
    "auth": 'Moa',
    "name": "test8",
    "link": "http"
  },
  {
    "subMenu": [],
    "auth": 'John',
    "name": "test9",
    "link": "htt"
  },
  {
    "subMenu": [],
    "auth": 'Peter',
    "name": "test10",
    "link": "http"
  }
];

var data2 = [
  {
    "subMenu": [],
    "level": 0,
    "checked": true,
    "name": "文件夹1",
    "link": "https://b.htm"
  },
  {
    "subMenu": [],
    "level": 0,
    "checked": true,
    "name": "文件夹2",
    "link": "https://b.htm"
  },
  {
    "subMenu": [],
    "level": 0,
    "checked": true,
    "name": "文件夹6",
    "link": "https://b"
  },
  {
    "subMenu": [
      {
        "link": "http://=",
        "name": "文件1",
        "subMenu": [],
        "level": 0,
        "checked": true,
        "disabled": true
      },
      {
        "link": "https:/rId=",
        "name": "文件2",
        "subMenu": [],
        "level": 0,
        "checked": true,
        "disabled": true
      },
      {
        "link": "https",
        "name": "文件9",
        "subMenu": [],
        "level": 0,
        "checked": true,
        "disabled": true
      }
    ],
    "level": 0,
    "checked": true,
    "name": "有子文件",
    "link": ""
  },
  {
    "subMenu": [],
    "level": 0,
    "checked": true,
    "name": "test7",
    "link": "te"
  },
  {
    "subMenu": [],
    "auth": 'Tom',
    "checked": true,
    "level": 0,
    "name": "test8",
    "link": "http"
  }
];

// 扁平化再合并
function flatten(data, p) {
  var temp = [];
  var flattening = (arr, pName = 0) => {
    arr && arr.map(item => {
      if (item.subMenu && item.subMenu.length) {
        flattening(item.subMenu, item.name);
      }
      temp.push({
        name: item.name,
        pName,
        checked: item.checked,
        level: item.level
      });
    });
    return temp;
  }
  flattening(data, p);
  return temp;
}

flatten(data1);

// list to tree
function list_to_tree(list) {
  var map = {}, node, roots = [], i;
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if ((node.parentId - 0) !== 0) {
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

// 双递归单节点合并
// Method 1 , 适用于data1是棵完整的树，data2是树结构数据的更新
// @arr 新树形结构数据
// @name 原有树形结构递归的当前name(唯一标识)
var steamroller = (arr, name) => arr && arr.map(item => {
  item.name === name && (currentMenu = item);
  if (currentMenu !== {} && item.subMenu && item.subMenu.length) {
    steamroller(item.subMenu, name);
  }
  return item;
});
// @datas 原有树形结构数据，两棵树的结构类似
// @newDatas 新树形结构数据，会覆盖datas数据
var handleMapTrees = (datas, newDatas) => datas.map(item => {
  currentMenu = {};
  steamroller(newDatas, item.name);
  return {
    name: currentMenu.name || item.name,
    level: currentMenu.level || item.level || 0,
    checked: currentMenu.checked !== undefined ? currentMenu.checked : item.checked,
    subMenu: item.subMenu && item.subMenu.length ? handleMapTrees(item.subMenu, newDatas) : []
  };
});
console.log(handleMapTrees(data1, data2));

// 双递归单节点合并
// Method 2
// @arr 新树形结构数据
// @name 原有树形结构递归的当前name(唯一标识)
var steamroller = (arr, name) => arr && arr.map(item => {
  item.name === name && (currentMenu = item);
  if (currentMenu !== {} && item.subMenu && item.subMenu.length) {
    steamroller(item.subMenu, name);
  }
  return item;
});
// @datas 原有树形结构数据，两棵树的结构类似
// @newDatas 新树形结构数据，会覆盖datas数据
var handleMapTrees = (datas, newDatas) => {
  var temp = [];
  for (let i = 0, l = datas.length; i < l; i++) {
    const item = datas[i];
    currentMenu = {};
    steamroller(newDatas, item.name);
    temp.push({
      name: currentMenu.name || item.name,
      level: currentMenu.level || item.level || 0,
      checked: currentMenu.checked !== undefined ? currentMenu.checked : item.checked,
      subMenu: item.subMenu && item.subMenu.length ? handleMapTrees(item.subMenu, newDatas) : []
    });
  }
  return temp;
}
console.log(handleMapTrees(data1, data2));