
function add() {

  let inputMemo = document.querySelector('#input_memo');
  let getInputMemo = inputMemo.value;
  if (getInputMemo === "") {
    Swal.fire({
      icon: 'warning',
      position: 'top',
      toast: true,
      text: 'ボックス内に予定を記入してください',
      confirmButtonColor: "#dd8d54",
      width:400
    })
    // alert('ボックス内に予定を記入してください')

  } else {
    let listData = document.querySelector('#list');
    let addLi = document.createElement('li');

    let iconC = document.createElement('i')

    let printText = document.createElement('span');

    let showFinish = document.createElement('span');
    let iconDel = document.createElement('i');


    //選單 依選項做樣式變化
    let typeSelect = document.querySelector('#typeSelect');
    let textSelected = typeSelect.options[typeSelect.selectedIndex].value;

    if (textSelected === 'normal') {
      addLi.className = 'normal';
    }
    if (textSelected === 'important') {
      addLi.className = 'important'
    } 
    if (textSelected === 'urgent') {
      addLi.className = 'urgent';
    }
    
    
    //將輸入的待辦事項 放到 span裡
    printText.textContent = getInputMemo;
    printText.className = 'printText';

    //完成標籤
    showFinish.textContent = '[未完了]'
    showFinish.className = 'finish'
    
    iconC.className = 'fa-regular fa-square'
    iconC.addEventListener('click', downToggle);

    iconDel.className = 'fa-solid fa-trash-can delIcon';
    iconDel.onclick = delContent;

    listData.append(addLi);
    addLi.append(iconC, printText, showFinish, iconDel);

    inputMemo.value = "";

  }

}

function downToggle(e) {
  let iconC = e.target;
  let showFinish = e.target.closest('li').querySelector('.finish');
  
  if (iconC.className.includes('fa-square')) {
    showFinish.textContent = '[完了]';
    iconC.className = 'fa-solid fa-check'
  } else {
    showFinish.textContent = '[未完了]';
    iconC.className = 'fa-regular fa-square'
  }
}



function delContent(e) {
  e.target.closest('li').remove();
}

/* 匯出文字 */
let outputBtn = document.querySelector('#outputBtn');
outputBtn.onclick = exportList;

function exportList() {
  let listLi = document.querySelectorAll('#list li');
  let num = 1;
  let str = "";

  for (let li of listLi) {
  let printText = li.querySelector('span').textContent;

    if (li.className === 'urgent') {
      str = str + num.toString() + "." + printText + " (緊急)" + "<br>";
    } else if (li.className === 'important') {
      str = str + num.toString() + "."+ printText + "(重要)" + "<br>";
    } else {
      str = str + num.toString() + "." + printText + "<br>";
    }
    num++
  }
  if (listLi.length === 0) {
    Swal.fire({
      icon: 'warning',
      position: 'top',
      toast: true,
      text: 'リストアップした項目がありません',
      confirmButtonColor: "#dd8d54",
      width:400
    })
   
  } else {
    Swal.fire({
      title: "ToDoリスト :",
      html:`
      <hr>
      <div class="show-list">${str}</div>`,
      confirmButtonColor: "#dd8d54"
    })
    // alert('ToDoリスト :\n' + str)
  }
}

function selectChange(e) {
  let inputMemo = document.querySelector('#input_memo');
  let selectedItem = e.target.options[e.target.selectedIndex].value;

  if (selectedItem === 'important') {
    inputMemo.className = 'item selectChangeY';
  } else if (selectedItem === 'urgent') {
    inputMemo.className = 'item selectChangeR';
  } else {
    inputMemo.className = 'item';
  }

}

// 存檔
function save (){
  let list = document.querySelectorAll('#list li');
  let listData = [];
  list.forEach((li) =>{
    let liType = li.className;
    let check = li.children[0].className;
    let content = li.children[1].textContent;
    let finish = li.children[2].textContent;
    
    let liObj = {
      liType : liType,
      check : check,
      content : content,
      finish : finish,  
    };
    listData.push(liObj);
    
  })
  
  localStorage.setItem('saveData', JSON.stringify(listData));
  Swal.fire({
    icon: 'success',
    position: 'top',
    toast: true,
    text: '保存されました !!',
    confirmButtonColor: "#dd8d54"
  })
 
}

// 取出已存檔案
if (localStorage.getItem('saveData')){
  let getData = JSON.parse(localStorage.getItem('saveData'));
  for (let i = 0; i < getData.length; i++){
    let savedList = document.querySelector('#list');
    
    let saveLi = document.createElement('li')
    let iconC = document.createElement('i')
    let printText = document.createElement('span');
    let showFinish = document.createElement('span');
    let iconDel = document.createElement('i');
    
    saveLi.className = getData[i].liType;
    
    iconC.className = getData[i].check;
    iconC.addEventListener('click', downToggle);
    
    printText.textContent = getData[i].content;
    printText.className = 'printText';
    
    showFinish.textContent = getData[i].finish;
    showFinish.className = 'finish'
    
    iconDel.className = 'fa-solid fa-trash-can delIcon';
    iconDel.onclick = delContent;
    
    savedList.append(saveLi);
    saveLi.append(iconC, printText, showFinish, iconDel);
  }
}


