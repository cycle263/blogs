// json 转换 csv 并下载CSV文件
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
  var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
  var CSV = '';
  if (ShowLabel) {
      var row = "";
      for (var index in arrData[0]) {
          row += index + ',';
      }
      row = row.slice(0, -1);
      CSV += row + '\r\n';
  }
  for (var i = 0; i < arrData.length; i++) {
      var row = "";
      for (var index in arrData[i]) {
          var arrValue = arrData[i][index] == null ? "" : '="' + arrData[i][index] + '"';
          row += arrValue + ',';
      }
      row.slice(0, row.length - 1);
      CSV += row + '\r\n';
  }
  if (CSV == '') {
      growl.error("Invalid data");
      return;
  }

  //Generate a file name
  var fileName = "MyReport_";
  //this will remove the blank-spaces from the title and replace it with an underscore
  fileName  = ReportTitle.replace(/ /g, "_");

  //Initialize file format you want csv or xls
  var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
  //this trick will generate a temp <a /> tag
  var link = document.createElement("a");
  link.href = uri;

  //set the visibility hidden so it will not effect on your web-layout
  link.style = "visibility:hidden";
  link.download = fileName + ".csv";

  //this part will append the anchor tag and remove it after automatic click
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
