let squares = document.querySelector('.grid').children;
let score = localStorage.getItem('score') == null ? 0 : +localStorage.getItem('score');
let scoreElem = document.querySelector('.score-number');
let highScoreElem = document.querySelector('.high-score-number');
let messageResult = document.querySelector('.win');

scoreElem.innerHTML = score;
highScoreElem.innerHTML = localStorage.getItem('highScore') == null ? "0" : localStorage.getItem('highScore');



function createBoard(array){
  let board = JSON.parse(localStorage.getItem('board'));
  if(board == null){
    for (let elem of array){
      elem.innerHTML = 0;
    }
    scoreElem.innerHTML = 0;
    createRandomCell(squares)
    createRandomCell(squares)
  } else {
    for (let i = 0; i<board.length; i++){
      array[i].innerHTML = board[i];
      array[i].style.backgroundColor = getNumberBackgroundColor(+array[i].innerHTML);
    }
  }
  checkNull(array);
}
createBoard(squares);

function checkNull(array){
  for (let item of array){
    if(item.innerHTML == 0){
      item.style.color = 'rgba(0, 0, 0, 0)'
    } else if(item.innerHTML >= 8){
      item.style.color = '#fff';
    }
    else {
      item.style.color = '#776e65'
    }
  }
}

setInterval(()=>{ lose(createRows(squares), createColumns(createRows(squares))), 1000})

function getNumbersOfSquare(domElem){
  let array = [];
  for (let num of domElem){
    array.push(+num.innerHTML);
  }
  return array;
}

function createRows(array){
  let row = [];
  let result = [];
  for(let i = 0; i<array.length; i++){
    row.push(array[i]);
    if((i+1) % 4 === 0 && (i+1) > 0){
      result.push(row);
      row = [];
    }
  }
  return result;
}
createRows(squares);

function createColumns(array){
  let column = [];
  let result = [];
  for(let i = 0; i<array.length; i++){
    for(let j = 0; j<array[i].length; j++){
      column.push(array[j][i])
    }
    result.push(column);
    column = [];
  }
  return result
}
createColumns(createRows(squares));

function createRandomCell(array){
  if (getNumbersOfSquare(squares).includes(0)){
    let numberCell = Math.floor(Math.random() * array.length);
    while(array[numberCell].innerHTML != 0){
      numberCell = Math.floor(Math.random() * array.length);
    }
    array[numberCell].innerHTML = Math.random() > 0.5 ? 4 : 2;
    array[numberCell].style.backgroundColor = getNumberBackgroundColor(+array[numberCell].innerHTML);
  }
  checkNull(array)
  localStorage.setItem('board', JSON.stringify(getNumbersOfSquare(squares)));
  localStorage.setItem('score', score);
}

function moveRightDown(rowOrColumn){
  for (let i = rowOrColumn.length-1; i >= 0; i--) {
    for(let j = i; j >= 0; j--){
      if(+rowOrColumn[i].innerHTML == 0 && +rowOrColumn[j].innerHTML != 0){
        let replaceNode = rowOrColumn[i].innerHTML;
        rowOrColumn[i].innerHTML = rowOrColumn[j].innerHTML;
        rowOrColumn[j].innerHTML = replaceNode;

        rowOrColumn[i].style.backgroundColor = getNumberBackgroundColor(+rowOrColumn[i].innerHTML);
        rowOrColumn[j].style.backgroundColor = getNumberBackgroundColor(+rowOrColumn[j].innerHTML);
      }
    }
  }
}

function moveLeftTop(rowOrColumn) {
  for (let i = 0; i < rowOrColumn.length; i++) {
    for(let j = i; j < rowOrColumn.length; j++){
      if(+rowOrColumn[i].innerHTML == 0 && +rowOrColumn[j].innerHTML != 0){
        let replaceNode = rowOrColumn[j].innerHTML;
        rowOrColumn[j].innerHTML = rowOrColumn[i].innerHTML;
        rowOrColumn[i].innerHTML = replaceNode;
        
        rowOrColumn[j].style.backgroundColor = getNumberBackgroundColor(+rowOrColumn[j].innerHTML);
        rowOrColumn[i].style.backgroundColor = getNumberBackgroundColor(+rowOrColumn[i].innerHTML);
      } 
    }
  }
}

function lose(columns, rows){
  let countLose = 0;
  for (let i = 0; i < columns.length; i++){
    let k = 0;
    for(let j = 1; j < columns[i].length; j++) {
      if(columns[i][j-1].innerHTML != columns[i][j].innerHTML && rows[i][j-1].innerHTML != rows[i][j].innerHTML){
        if(columns[i][k].innerHTML != '0'){
          countLose += 2;
        }
      }
      k++;
    }
  }
  if(countLose == 24){
    messageResult.innerHTML = 'YOU LOSE';
    messageResult.style.display = 'flex';
  } else {
    messageResult.style.display = 'none';
  }
}


function unityLeftTop(rowOrColumn){
  nextElem:
  for (let i = 0; i < rowOrColumn.length; i++) {
    for(let j = i+1; j < rowOrColumn.length; j++){
      if(+rowOrColumn[i].innerHTML == +rowOrColumn[j].innerHTML && +rowOrColumn[i].innerHTML != 0){
        rowOrColumn[i].innerHTML *= 2;
        rowOrColumn[j].innerHTML = 0;
        score += +rowOrColumn[i].innerHTML;
        scoreElem.innerHTML = score;
        if(score > +highScoreElem.innerHTML){
          highScoreElem.innerHTML = score;
          localStorage.setItem('highScore', score)
        }

        rowOrColumn[i].style.backgroundColor = getNumberBackgroundColor(+rowOrColumn[i].innerHTML);
        rowOrColumn[j].style.backgroundColor = getNumberBackgroundColor(+rowOrColumn[j].innerHTML);
        if(rowOrColumn[i].innerHTML == '2048'){
          messageResult.innerHTML = 'YOU WIN';
          messageResult.style.display = 'flex';
        }
        break;  
      } else{
        continue nextElem;
      }
    }
  }
}


function unityRightDown(rowOrColumn){
  nextElem:
  for (let i = rowOrColumn.length-1; i >= 0; i--) {
    for(let j = i-1; j >=0; j--){
      if(+rowOrColumn[j].innerHTML == +rowOrColumn[i].innerHTML && +rowOrColumn[j].innerHTML != 0){
        rowOrColumn[i].innerHTML *= 2;
        rowOrColumn[j].innerHTML = 0;

        score += +rowOrColumn[i].innerHTML;
        scoreElem.innerHTML = score;
        if(score > +highScoreElem.innerHTML){
          highScoreElem.innerHTML = score;
          localStorage.setItem('highScore', score)
        }

        if(rowOrColumn[i].innerHTML == '2048'){
          messageResult.innerHTML = 'YOU WIN';
          messageResult.style.display = 'flex';
        }

        rowOrColumn[i].style.backgroundColor = getNumberBackgroundColor(+rowOrColumn[i].innerHTML);
        rowOrColumn[j].style.backgroundColor = getNumberBackgroundColor(+rowOrColumn[j].innerHTML);

        break
      } else {
        continue nextElem;
      }
    }
  }
}

function movementLeft(rows){
  window.addEventListener('keyup', (e)=>{
    if (e.key == "ArrowLeft"){
      for (let row of rows){
        moveLeftTop(row);
        checkNull(squares);
        unityLeftTop(row)
        moveLeftTop(row);
      }
      createRandomCell(squares)
    }
  })
}

function movementRight(rows){
  window.addEventListener('keyup', (e)=>{
    if (e.key == "ArrowRight"){
      for (let row of rows){
        moveRightDown(row);
        checkNull(squares);
        unityRightDown(row)
        moveRightDown(row);
      }
      createRandomCell(squares)
    }
  })
}

function movementUp(columns){
  window.addEventListener('keyup', (e)=>{
    if (e.key == "ArrowUp"){
      for (let column of columns){
        moveLeftTop(column);
        checkNull(squares);
        unityLeftTop(column)
        moveLeftTop(column);
      }
      createRandomCell(squares)
    }
  })
}

function movementDown(columns,){
  window.addEventListener('keyup', (e)=>{
    if (e.key == "ArrowDown"){
      for (let column of columns){
        moveRightDown(column);
        checkNull(squares);
        unityRightDown(column)
        moveRightDown(column);
      }
      createRandomCell(squares)
    }
  })
}

function lost(board){
  let newGameButton = document.querySelector('.new-game');
  newGameButton.addEventListener('click',()=> {
    for (let elem of board){
      elem.innerHTML = 0;
      elem.style.backgroundColor = getNumberBackgroundColor(+elem.innerHTML)
    }
    score = 0;
    scoreElem.innerHTML = score;
    messageResult.innerHTML = '';
    messageResult.style.display = 'none';
    createRandomCell(squares)
    createRandomCell(squares)
  })

}

function getNumberBackgroundColor(num) {
  switch (num) {
    case 0:
      return "#cdc1b4";
    case 2:
      return "#eee4da";
    case 4:
      return "#ede0c8";
    case 8:
      return "#f2b179";
    case 16:
      return "#f59563";
    case 32:
      return "#f67c5f";
    case 64:
      return "#f65e3b";
    case 128:
      return "#edcf72";
    case 256:
      return "#edcc61";
    case 512:
      return "#9c0";
    case 1024:
      return "#33b5e5";
    case 2048:
      return "#09c";
    case 4096:
      return "#a6c";
    case 8192:
      return "#93c";
  }
  return "#000";
}

lost(squares);
movementRight(createRows(squares))
movementLeft(createRows(squares))
movementDown(createColumns(createRows(squares)))
movementUp(createColumns(createRows(squares)))

console.log("easy")