"use strict"

const CELL_SIZE = 50;
const CELL_COLOR = "#c7c7c7";
const EMPTY_CELL_COLOR = "#333333";
const CELL_MARGIN = 5;
const TABLE_SIZE = 10;
const SLEEP = 1000;

let table = []
let empty_cell = {row: Math.floor((Math.random() * TABLE_SIZE)), col: Math.floor((Math.random() * TABLE_SIZE))};

initTable();
makeTable();
pushCells();

async function pushCells(){
  for(let i = 0; i < i + 1; i++){
    await sleep(SLEEP);

    let selected_random_cell = getRandomCell();

    let push_cells = [];

    let row_index;
    for(row_index = 0; row_index < TABLE_SIZE; row_index++){
      let col_index;
      for(col_index = 0; col_index < TABLE_SIZE; col_index++){
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
        for(row_index = TABLE_SIZE; row_index >= 0; row_index--){
          let col_index;
          for(col_index = 0; col_index < TABLE_SIZE; col_index++){
            push_cells.forEach(cell => {
              if(cell.row === row_index && cell.col === col_index){
                if(row_index - 1 >= 0){
                  table[row_index][col_index].color = table[row_index - 1][col_index].color;
                }
              }
            });
          }
        }
      }
      else{
        for(row_index = 0; row_index < TABLE_SIZE; row_index++){
          let col_index;
          for(col_index = 0; col_index < TABLE_SIZE; col_index++){
            push_cells.forEach(cell => {
              if(cell.row === row_index && cell.col === col_index){
                if(row_index + 1 < TABLE_SIZE){
                  table[row_index][col_index].color = table[row_index + 1][col_index].color;
                }
              }
            });
          }
        }
      }
    }
    else if(empty_cell.row === selected_random_cell.row){
      if(empty_cell.col > selected_random_cell.col){
        for(row_index = 0; row_index < TABLE_SIZE; row_index++){
          let col_index;
          for(col_index = TABLE_SIZE; col_index >= 0; col_index--){
            push_cells.forEach(cell => {
              if(cell.row === row_index && cell.col === col_index){
                if(col_index - 1 >= 0){
                  table[row_index][col_index].color = table[row_index][col_index - 1].color;
                }
              }
            });
          }
        }
      }
      else{
        for(row_index = 0; row_index < TABLE_SIZE; row_index++){
          let col_index;
          for(col_index = 0; col_index < TABLE_SIZE; col_index++){
            push_cells.forEach(cell => {
              if(cell.row === row_index && cell.col === col_index){
                if(col_index + 1 < TABLE_SIZE){
                  table[row_index][col_index].color = table[row_index][col_index + 1].color;
                }
              }
            });
          }
        }
      }
    }

    table[empty_cell.row][empty_cell.col].hidden = false;
    table[selected_random_cell.row][selected_random_cell.col].hidden = true;

    empty_cell = selected_random_cell;

    makeTable();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomCell(){
  let get_random_cell = [];
  let stop = false;
  while(!stop){
    let new_random_cell = {row: Math.floor((Math.random() * TABLE_SIZE)), col: Math.floor((Math.random() * TABLE_SIZE))};
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
  let row_index;
  let index = 210;
  for(row_index = 0; row_index < TABLE_SIZE; row_index++){
    let row = []
    let col_index;
    for(col_index = 0; col_index < TABLE_SIZE; col_index++){
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
  for(row_index = 0; row_index < TABLE_SIZE; row_index++){
    let row_div = document.createElement("div");
    row_div.className = "row";

    let col_index;
    for(col_index = 0; col_index < TABLE_SIZE; col_index++){
      if(table[row_index][col_index].hidden){
        let cell_div = document.createElement("div");
        cell_div.style.width = CELL_SIZE + "px";
        cell_div.style.height = CELL_SIZE + "px";
        cell_div.style.background = EMPTY_CELL_COLOR;
        cell_div.style.margin = CELL_MARGIN + "px";
        cell_div.id = "cell_" + row_index + ";" + col_index;
        cell_div.className = "cell";
        row_div.appendChild(cell_div);
      }
      else{
        let cell_div = document.createElement("div");
        cell_div.style.width = CELL_SIZE + "px";
        cell_div.style.height = CELL_SIZE + "px";
        cell_div.style.background = table[row_index][col_index].color;
        cell_div.style.margin = CELL_MARGIN + "px";
        cell_div.id = "cell_" + row_index + ";" + col_index;
        cell_div.className = "cell";
        row_div.appendChild(cell_div);
      }
    }
    document.getElementById("game").appendChild(row_div);
  }

  let row_div = document.createElement("div");
  for(row_index = 0; row_index < TABLE_SIZE; row_index++){
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
  var rgb = HSVtoRGB(p / 100 * 0.2, 1, 1);
  return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
}
