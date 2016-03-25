var tags = document.getElementById('tags');
var inputs = document.getElementsByClassName('orderId');
var lis = document.getElementsByClassName('o-cont')[5].getElementsByTagName('li');
// console.log(lis[3].outerText.split("：")[1]);
// console.log(/^门店名称：/.test(contents[5].outerText));
var order = {
  store: lis[0].outerText.split("：")[1],
  orderId: inputs[0].value,
  serialNumber: tags.getElementsByTagName('span')[0].outerText,
  dealAt: lis[3].outerText.split("：")[1],
  items:[]
}

var tbodies = document.getElementsByTagName('tbody');
var trs = tbodies[0].getElementsByTagName('tr');
for (var i = 1; i < trs.length; i++) {
  var tds = trs[i].getElementsByTagName('td');
  var arr = []
  for (var j = 0; j < tds.length; j++) {
    arr.push(tds[j].outerText);
  }
  order.items.push(arr);
}
// console.log(order);

var xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost:3000/print", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    var str = "没有找到下列商品对应的打印机：\n";
    var skus = JSON.parse(xhr.response);
    for (var i = 0; i < skus.length; i++) {
      str += skus[i]+"\n";
    }
    if(skus.length > 0) {
      alert(str);
    } else {
      alert("打印成功！");
    }
  }
}
xhr.send(JSON.stringify(order));
