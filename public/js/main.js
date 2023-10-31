/* ----- 変数の初期化 ----- */
let untyped = '';
let typed = '';
let score = 0;
let keypresstime = 0;
let startTime = 0;
let endTime = 0;
const title = 'Keypress Game';

/* ----- 必要なHTML要素の取得 ----- */
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const startBtnArea = document.querySelector('.start-btn-area');
const gameInputArea = document.querySelector('.game-input-area');
const gameStartBtn = document.getElementById('game-start-btn');
const startBtn = document.getElementById('start');
const tryAgainBtnArea = document.querySelector('.try-again-btn-area');
const tryAgainBtn = document.getElementById('try-again');
const timerArea = document.getElementById('timer-area');
const timeLeft = document.getElementById('time-left');
let time = timeLeft.textContent;

const textField = document.getElementById('text-field');

const checkWindow = document.getElementById('check-window');
const checkWindowCloseBtn = document.querySelector('.check-window-close');
const checkInputs = document.querySelectorAll('.check-input');
const inputsCheck = [];
checkInputs.forEach((value,index)=>{inputsCheck[index]=0});
let totalInputsCheck = 0;

const alertMsg = document.getElementById('alert-msg');

const scoreTableArea = document.getElementById('score-table-area');
const scoreAreaClose = document.querySelector('.score-area-close');
const typeAccurancyPercentage = document.getElementById('percentage');
const yourSkill = document.getElementById('your-skill');
const resultDetails = document.getElementById('result-details');

const typeResult = document.getElementById('type-result');

const gifImg = document.getElementById('gif-img');

const gameDetails = document.getElementById('game-details');

/* ----- 複数のテキストを格納する配列 ----- */
let fixText;
const texts = document.getElementById("texts");
const textArray = texts.textContent;
const typeTextArray = [];
for(let m = 0;m < textArray.split(",").length;m++){
  fixText = textArray.split(",")[m];
  fixText = fixText.replace(/\r?\n/g,"");
  fixText = fixText.trim();
  typeTextArray.push(fixText);
};
const textList = typeTextArray;

let doneText = [];

/* ----- ランダムなテキストを表示 ----- */
const createText = _ => {
  typed = '';
  typedfield.textContent = typed;
  let random = Math.floor(Math.random()*textList.length);
  untyped = textList[random];
  untypedfield.textContent = untyped;
  startTime = time;
};

const keyPress = e => {
  keypresstime++;
  if(e.key !== untyped.substring(0,1)){
    wrap.classList.add('mistyped');
    setTimeout(()=>{
      wrap.classList.remove('mistyped');
    },100);
    alertMsg.classList.remove('correct');
    alertMsg.classList.add('incorrect');
    if(untyped.substring(0,1) == ' ')
      alertMsg.textContent = 'スペースを入力してください';
    else
      alertMsg.textContent = "'" + untyped.substring(0,1) + "'を入力してください";
    setTimeout(_=>{textField.value = '';},200);
    textField.value = '';
    return;
  }
  score++;
  typed += untyped.substring(0,1);
  typedfield.textContent = typed;
  untyped = untyped.substring(1);
  untypedfield.textContent = untyped;
  if(untyped === ''){
    textList.forEach((key,index)=>{
      if(typed == key)
        textList.splice(index,1);
    });
    endTime = time;
    doneText.push([typed,(Number(startTime - endTime).toFixed(2))]);
    createText();
  }
  alertMsg.classList.remove('incorrect');
  alertMsg.classList.add('correct');
  alertMsg.textContent = 'Ok';
  setTimeout(_=>{textField.value = '';},100);
  textField.value = '';
};

/* ----- カウントダウンタイマー ----- */
const timer = _ => {
  timeLeft.textContent = Math.round(Number(time));
  let id = setInterval(()=>{
    time -= 0.01;
    timeLeft.textContent = Math.round(Number(time));
    if(time <= 0){
      gameOver(id);
    }
  },10);
};

/* ----- ゲームを終了 ----- */
const gameOver = id => {
  doneText.push([typed,(Number(startTime - 0).toFixed(2))]);
  document.removeEventListener('keypress',keyPress);
  clearInterval(id);
  gameInputArea.classList.add('hide');
  tryAgainBtnArea.classList.remove('hide');
  gifImg.classList.add('after');
  tryAgainBtn.addEventListener('click',_=>{
    window.location.reload();
  });
  typedfield.textContent = '';
  untypedfield.textContent = 'Game Over';
  showScore();
  textField.blur();
};

/* ------------------ スタートボタンを押したときのアクション ------------------ */
startBtn.addEventListener('click',_=>{
  checkWindow.classList.remove('hidden');
});

/* ------------------ チェックウィンドゥの閉じるボタンを押したときのアクション ------------------ */
checkWindowCloseBtn.addEventListener('click',_=>{
  checkWindow.classList.add('hidden');
  startBtn.disabled = false;
});

/* ------------------ ゲームスタートボタンを押したときのアクション ------------------ */
gameStartBtn.addEventListener('click',()=>{
  gameDetails.classList.add('hidden');
  gameStartBtn.disabled = true;
  startBtnArea.classList.add('hide');
  gameInputArea.classList.remove('hide');
  checkWindow.classList.add('hidden');
  gifImg.classList.remove('show');
  let toStartTime = 3000;
  let interval = setInterval(_=>{
    if(toStartTime <= 0){
      timeLeft.textContent = toStartTime/1000;
      clearInterval(interval);
      /* --- ゲーム開始時のアクション --- */
      document.addEventListener('keypress',keyPress);
      createText();
      timer();
      textField.focus();
      textField.value = '';
      return
    }
    timeLeft.textContent = toStartTime/1000;
    timerArea.classList.add('counting');
    setTimeout(_=>{
      timerArea.classList.remove('counting');
    },500);
    untypedfield.classList.remove('shadow');
    untypedfield.textContent = 'Text Display';
    toStartTime -= 1000;
  },1000);
});

/* ------------------ 開始前確認項目がチェックされているかを判別する関数 ------------------ */
const isChecked = (index) => {
  if(inputsCheck[index] == 0){
    inputsCheck[index] = 1;
    totalInputsCheck++;
  } else if(inputsCheck[index] == 1){
    inputsCheck[index] = 0;
    totalInputsCheck--;
  }
  if(totalInputsCheck == checkInputs.length){
    gameStartBtn.disabled = false;
    startBtn.disabled = true;
  } else {
    gameStartBtn.disabled = true;
    startBtn.disabled = false;
  }
}

/* ------------------ スコアテーブルを表示する関数 ------------------ */
const showScore = _ => {
  /* ----- スコアテーブルを表示する ----- */
  scoreTableArea.classList.remove('hide');
  scoreAreaClose.addEventListener('click',_=>{
    gameDetails.classList.remove('hidden');
    scoreTableArea.classList.add('hide');
    gifImg.classList.add('show');
    document.querySelectorAll('tbody tr').forEach((node)=>{
      node.remove();
    });
  });
  /* ----- タイピングの正確性(%)を計算して表示する ----- */
  typeAccurancyPercentage.textContent = Math.round(score/keypresstime*100) + '%';
  /* ----- ランク付けをしてスコア画面に表示 ----- */
  let text = '';
  if(score < 100)
    text = `あなたのランクはCです<br>Bランクまであと${100 - score}文字です`;
  else if (score < 180)
    text = `あなたのランクはBです<br>Aランクまであと${180 - score}文字です`;
  else if(score < 250)
    text = `あなたのランクはAです<br>Sランクまであと${250 - score}文字です`; 
  else if(score >= 250)
    text = `あなたのランクはSです<br>おめでとうございます!`;  
  yourSkill.innerHTML = `${score}文字打てました!<br>${text}<br>`;
  /* ----- ランク付けをしてアラートメッセージ領域に表示 ----- */
  alertMsg.classList.remove('correct');
  alertMsg.classList.remove('incorrect');
  alertMsg.classList.add('final');
  alertMsg.innerHTML = `${score}文字打てました!<br>${text}`;
  resultDetails.style.display = 'block';
  resultDetails.addEventListener('click',_=>{
    scoreTableArea.classList.remove('hide');
    showScore();
  });
  /* ----- スコア画面に打ったテキストとかかった時間を表示 ----- */
  for(let i=0;i<doneText.length;i++){
    const tableLine = document.createElement('tr');
    const tableText = document.createElement('td');
    if(i == doneText.length-1)
      tableText.innerHTML = doneText[i][0] + `<span style='opacity: .5;'>${untyped}</span>`;
    else
      tableText.textContent = doneText[i][0];
    const tableTime = document.createElement('td');
    tableTime.textContent = doneText[i][1];
    tableLine.appendChild(tableText);
    tableLine.appendChild(tableTime);
    typeResult.appendChild(tableLine);
  }
  console.log(doneText);
}

/* ------------------ ページをアクセスした時のアクション ------------------ */
typedfield.textContent = '';
untypedfield.textContent = title;
typedfield.textContent += untypedfield.textContent.substring(0,1);
untypedfield.textContent = untypedfield.textContent.substring(1);
let opening = setInterval(_=>{
  typedfield.textContent += untypedfield.textContent.substring(0,1);
  untypedfield.textContent = untypedfield.textContent.substring(1);
  if(untypedfield.textContent.length == 0){
    clearInterval(opening);
    wrap.classList.add('initial-effect');
    setTimeout(_=>{
      wrap.classList.remove('initial-effect');
      typedfield.textContent = '';
      untypedfield.textContent = title;
      untypedfield.classList.add('shadow');
    },100);
  }
},150);
checkInputs.forEach((input)=>{
  input.checked = false;
});

/* ------------------ キーボードの判定 ------------------ */
window.addEventListener('keydown', e => {
  if (e.isComposing || e.key === 'Process' || e.keyCode === 229){
    alertMsg.classList.remove('correct');
    alertMsg.classList.remove('incorrect');
    alertMsg.textContent = '英列キーボードを使用してください';
  }
});


window.addEventListener('resize',_=>{
  document.scrollingElement.scrollTop = 0;
});

document.addEventListener('keypress',(e)=>{
  if(e.key == ' ')
    event.preventDefault();
});

/* ------------------ スマホでキーボードを表示した際に画面の主要なブブが隠れないようにするための処理 ------------------ */
visualViewport.onresize = function () {
  if(visualViewport.height < document.documentElement.clientHeight)
    timerArea.classList.add('onkeyboard');
  else 
    timerArea.classList.remove('onkeyboard');
};