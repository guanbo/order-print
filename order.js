var inputs = document.getElementsByClassName('orderId');
var order = {
  orderId: inputs[0].value,
  items:[]
}

var tbodies = document.getElementsByTagName('tbody');
// console.log(/^商品编号/.test(tbodies[0].outerText));
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
xhr.open("POST", "http://127.0.0.1:3000/print", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.onreadystatechange = function() {
  // console.log(xhr.responseText);
}
xhr.send(JSON.stringify(order));
