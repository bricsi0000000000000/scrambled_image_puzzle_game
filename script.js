"use strict"

const CELL_SIZE = 50;
const EMPTY_CELL_COLOR = "#333333";
const CELL_MARGIN = 5;
const SLEEP = 1000;
const PUSH_TIME = 10;

let table_width = 0;
let table_height = 0;
let table = []
let empty_cell = {row: Math.floor((Math.random() * table_width)), col: Math.floor((Math.random() * table_height))};

function initTableSize(){
  table_height = window.innerWidth / (CELL_SIZE) *.8;
  table_width = window.innerHeight / (CELL_SIZE) *.8;
}

function move_cell(row_index, col_index, direction){
  try{
    let pos = 0;
    if(direction === 0 || direction === 2){
      pos = document.getElementById("cell_" + row_index + ";" + col_index).style.top;
    }
    else if(direction === 1 || direction === 3){
      pos = document.getElementById("cell_" + row_index + ";" + col_index).style.left;
    }
    pos = pos.substring(0, pos.length - 2);
    let prev_pos = pos;

    let end = 0;
    
    if(direction === 0 || direction === 1){
      end = +prev_pos - (CELL_SIZE + CELL_MARGIN * 2);
    }
    else if(direction === 2 || direction === 3){
      end = +prev_pos + (CELL_SIZE + CELL_MARGIN * 2);
    }

    let id = setInterval(frame, PUSH_TIME);
    function frame() {
      if (pos === end) {
        clearInterval(id);
      }
      else {
        if(direction === 0 || direction === 1){
          pos--;
        }
        else if(direction === 2 || direction === 3){
          pos++;
        }

        if(direction === 0){
          try{
            document.getElementById("cell_" + row_index + ";" + col_index).style.top = pos + "px"; //up
          } catch(err){}
        }
        else if(direction === 1){
          try{
            document.getElementById("cell_" + row_index + ";" + col_index).style.left = pos + "px"; //right
          } catch(err){}
        }
        else if(direction === 2){
          try{
            document.getElementById("cell_" + row_index + ";" + col_index).style.top = pos + "px"; //down
          } catch(err){}
        }
        else if(direction === 3){
          try{
            document.getElementById("cell_" + row_index + ";" + col_index).style.left = pos + "px"; //left
          } catch(err){}
        }
      }
    }
  }
  catch(err){}
}

async function pushCells(){
  for(let i = 0; i < i + 1; i++){
    let selected_random_cell = getRandomCell();

    let push_cells = [];

    let row_index;
    for(row_index = 0; row_index < table_width; row_index++){
      let col_index;
      for(col_index = 0; col_index < table_height; col_index++){
        if(empty_cell.col === selected_random_cell.col){
          if(empty_cell.row > selected_random_cell.row){
            if(row_index >= selected_random_cell.row && row_index <= empty_cell.row){
              if(col_index === empty_cell.col){
                push_cells.push({row: row_index, col: col_index});
              }
            }
          }
          else{
            if(row_index <= selected_random_cell.row && row_index >= empty_cell.row){
              if(col_index === empty_cell.col){
                push_cells.push({row: row_index, col: col_index});
              }
            }
          }
        }
        else if(empty_cell.row === selected_random_cell.row){
          if(empty_cell.col > selected_random_cell.col){
            if(col_index >= selected_random_cell.col && col_index <= empty_cell.col){
              if(row_index === empty_cell.row){
                push_cells.push({row: row_index, col: col_index});
              }
            }
          }
          else{
            if(col_index <= selected_random_cell.col && col_index >= empty_cell.col){
              if(row_index === empty_cell.row){
                push_cells.push({row: row_index, col: col_index});
              }
            }
          }
        }
      }
    }

    if(empty_cell.col === selected_random_cell.col){
      if(empty_cell.row > selected_random_cell.row){
        for(row_index = 0; row_index < table_width; row_index++){
          let col_index;
          for(col_index = 0; col_index < table_height; col_index++){
            push_cells.forEach(cell => {
              if(cell.row === row_index && cell.col === col_index){
                move_cell(row_index, col_index, 2);
              }
            });
          }
        }
      }
      else{
        for(row_index = 0; row_index < table_width; row_index++){
          let col_index;
          for(col_index = 0; col_index < table_height; col_index++){
            push_cells.forEach(cell => {
              if(cell.row === row_index && cell.col === col_index){
                move_cell(row_index, col_index, 0);
              }
            });
          }
        }
      }
    }
    else if(empty_cell.row === selected_random_cell.row){
      if(empty_cell.col > selected_random_cell.col){
        for(row_index = 0; row_index < table_width; row_index++){
          let col_index;
          for(col_index = 0; col_index < table_height; col_index++){
            push_cells.forEach(cell => {
              if(cell.row === row_index && cell.col === col_index){
                move_cell(row_index, col_index, 3);
              }
            });
          }
        }
      }
      else{
        for(row_index = 0; row_index < table_width; row_index++){
          let col_index;
          for(col_index = 0; col_index < table_height; col_index++){
            push_cells.forEach(cell => {
              if(cell.row === row_index && cell.col === col_index){
                move_cell(row_index, col_index, 1);
              }
            });
          }
        }
      }
    }

    await sleep(PUSH_TIME * 100);

    if(empty_cell.col === selected_random_cell.col){
      if(empty_cell.row > selected_random_cell.row){
        for(let index = push_cells.length; index >= 1 ; index--){
          try{
            table[push_cells[index].row][push_cells[index].col].color = table[push_cells[index].row - 1][push_cells[index].col].color;
          }catch(err){}
        }
      }
      else{
        for(let index = 0; index < push_cells.length - 1; index++){
          try{
            table[push_cells[index].row][push_cells[index].col].color = table[push_cells[index].row + 1][push_cells[index].col].color;
          }catch(err){}
        }
      }
    }
    else if(empty_cell.row === selected_random_cell.row){
      if(empty_cell.col > selected_random_cell.col){
        for(let index = push_cells.length; index >= 1 ; index--){
          try{
            table[push_cells[index].row][push_cells[index].col].color = table[push_cells[index].row][push_cells[index].col - 1].color;
          }catch(err){}
        }
      }
      else{
        for(let index = 0; index < push_cells.length - 1; index++){
          try{
            table[push_cells[index].row][push_cells[index].col].color = table[push_cells[index].row][push_cells[index].col + 1].color;
          }catch(err){}
        }
      }
    }

    empty_cell = selected_random_cell;

    makeTable();

    await sleep(SLEEP);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomCell(){
  let get_random_cell = [];
  let stop = false;
  while(!stop){
    let new_random_cell = {row: Math.floor((Math.random() * table_width)), col: Math.floor((Math.random() * table_height))};
    if(empty_cell.row === new_random_cell.row || empty_cell.col === new_random_cell.col){
      stop = true;
      get_random_cell = {row: new_random_cell.row, col: new_random_cell.col};
    }
  }

  if(get_random_cell.row === empty_cell.row && get_random_cell.col === empty_cell.col){
    return getRandomCell();
  }

  return get_random_cell;
}

function initTable(){
  table = [];
  let row_index;
  let index = 2800;
  for(row_index = 0; row_index < table_width; row_index++){
    let row = []
    let col_index;
    for(col_index = 0; col_index < table_height; col_index++){
      if(row_index === empty_cell.row && col_index === empty_cell.col){
        row.push({row: row_index, col: col_index, hidden: true, color: rainbow(index)});
      }
      else{
        row.push({row: row_index, col: col_index, hidden: false, color: rainbow(index)});
      }
      index++;
    }
    table.push(row);
  }
}

function makeTable(){
  document.getElementById("game").innerHTML = "";

  let row_index;
  for(row_index = 0; row_index < table_width; row_index++){
    let row_div = document.createElement("div");
    row_div.className = "row";

    let col_index;
    for(col_index = 0; col_index < table_height; col_index++){
      if(!(row_index === empty_cell.row && col_index === empty_cell.col)){
        let cell_div = document.createElement("div");
        cell_div.style.width = CELL_SIZE + "px";
        cell_div.style.height = CELL_SIZE + "px";
        cell_div.style.background = table[row_index][col_index].color;
        cell_div.style.margin = CELL_MARGIN + "px";
        cell_div.id = "cell_" + row_index + ";" + col_index;
        cell_div.style.top = (CELL_SIZE + CELL_MARGIN * 2) * row_index  + "px";
        cell_div.style.left = (CELL_SIZE + CELL_MARGIN * 2) * col_index + "px";
        cell_div.style.position = "absolute";
        cell_div.style.borderRadius = "5px";
        row_div.appendChild(cell_div);
      }
    }
    document.getElementById("game").appendChild(row_div);
  }

  let row_div = document.createElement("div");
  for(row_index = 0; row_index < table_width; row_index++){
    let cell_div = document.createElement("div");
    cell_div.style.width = CELL_SIZE + "px";
    cell_div.style.height = CELL_SIZE + "px";
    cell_div.style.background = EMPTY_CELL_COLOR;
    row_div.appendChild(cell_div);
  }
  document.getElementById("game").appendChild(row_div);
}

function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
      s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
  }
  return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
  };
}

function rainbow(p) {
  var rgb = HSVtoRGB(p / 100 * 0.05, 1, 1);
  return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
}

function start(){
  initTableSize();
  initTable();
  makeTable();
  pushCells();
}

start();