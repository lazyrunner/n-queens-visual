'use strict';

var totalSoultions = 0;

var solveNQueens = function (n) {
  var res = [];
  if (n === 1 || n >= 4) dfs(res, [], n, 0);
  return res;
};

var dfs = async function (res, points, n, index) {
  for (var i = index; i < n; i++) {
    if (points.length !== i) return;
    for (var j = 0; j < n; j++) {
      await sleep(200)
      var tempCopy = [...points];
      tempCopy.push([i, j]);
      createTable(n, tempCopy, true);
      if (isValid(points, [i, j])) {
        points.push([i, j]);
        await dfs(res, points, n, i + 1);
        if (points.length === n) {
          res.push(buildRes(points));
        }
        points.pop();
      }
    }
  }
};

var buildRes = function (points) {
  var res = [];
  var n = points.length;
  for (var i = 0; i < n; i++) {
    res[i] = '';
    for (var j = 0; j < n; j++) {
      res[i] += (points[i][1] === j ? 'Q' : '.');
    }
  }
  createTable(n, points)
  return res;
};

var isValid = function (oldPoints, newPoint) {
  var len = oldPoints.length;
  for (var i = 0; i < len; i++) {
    if (oldPoints[i][0] === newPoint[0] || oldPoints[i][1] === newPoint[1]) return false;
    if (Math.abs((oldPoints[i][0] - newPoint[0]) / (oldPoints[i][1] - newPoint[1])) === 1) return false;
  }
  return true;
};

var createTable = function (size, points, existingTable = false) {
  var list = document.getElementById('board-warpper'); // table reference
  var table = document.createElement('table');
  if (existingTable) {
    table = document.getElementById('checking-table');
    $("#checking-table tr").remove();
  }
  for (var i = 0; i < size; i++) {
    var tr = document.createElement('tr');

    for (var j = 0; j < size; j++) {
      var td = document.createElement('td');
      if (points[i] && points[i][1] === j)
        td.innerHTML = '&#9819;'
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  if (!existingTable) {
    totalSoultions++;
    var solCounts = document.getElementById('solutions');
    solCounts.innerText = totalSoultions;
    list.appendChild(table);
  }

}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// solveNQueens(5);

// document.body.appendChild(table);

var submit = document.getElementById('submit');

submit.addEventListener('click', () => {
  totalSoultions = 0;
  var submit = document.getElementById('nums');
  var list = document.getElementById('board-warpper');
  list.innerText = 'Solutions ';
  var iDiv = document.createElement('span');
  iDiv.id = 'solutions';
  iDiv.innerText = totalSoultions;
  list.appendChild(iDiv);
  solveNQueens(parseInt(submit.value));
});
