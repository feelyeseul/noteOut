// 선택한 파일의 텍스트 읽고 배열에 저장
function readFile(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsText(file, "utf-8");
  reader.onload = () => {
    deleteAllDiv();
    const arrResult = reader.result.split("\r\n");
    createDivEachRow(arrResult);
    // sampleResult.textContent = JSON.stringify(arrResult);
  };

  reader.onerror = function () {
    alert(reader.error);
  };
}
// TextArea의 텍스트 읽고 배열에 저장
function readTextArea() {
  const textAreaContent = document.getElementById("selectTextArea").value;
  
  deleteAllDiv();
  const arrResult = textAreaContent.split("\n"); // TextArea 내용을 개행을 기준으로 나누고 빈 객체에 입력
  createDivEachRow(arrResult);
  copyOriginProp();
}


// 배열 요소 개수 만큼 div 생성
function createDivEachRow(array) {
  const output = document.getElementById("textOutput");

  array.forEach((e, i) => {
    let div = document.createElement("div");
    if(e === "") {
        div.textContent = "\u00A0";
    } else {
        div.textContent = e;
    }
    div.id = `text${i}`;
    div.className = "innerText";

    output.appendChild(div);
  });
}

// output 내 요소 전부 삭제
function deleteAllDiv() {
  const output = document.getElementById("textOutput");
  const len = output.childElementCount;

  console.log("div 개수는 ", len);

  for (let i = 0; i < len; i++) {
    output.removeChild(output.firstChild);
  }
}

// ==============================Font 설정==============================
// Font family List 생성
function mkFontFamilyList() {
  const fontFamily = document.getElementById("selectFontStyle");
  const fontList = [
    "폰트 선택",
    "Dongle",
    "Gaegu",
    "Nanum Gothic",
    "Nanum Pen Script",
    "Noto Sans KR",
    "Noto Serif KR",
    "Single Day",
  ];

  for (let i in fontList) {
    fontFamily.options[i] = new Option(fontList[i], fontList[i]);
  }
}
// Font size List 생성
function mkFontSizeList() {
    const fontSize = document.getElementById("selectFontSize");
    let sizeList = [];

    for(let i = 10; i < 31; i++) {
        sizeList.push(i);
    }

    for (let j in sizeList) {
        fontSize.options[j] = new Option(sizeList[j], sizeList[j]);
      }
}

// Font family 설정
function changeFontFamily(font) {
  const textDiv = document.querySelectorAll(".innerText");
  let fSize = document.getElementById("selectBorderSize").value;

  console.log(font);
  if (font === "폰트 선택") {
    textDiv.forEach((f1) => (f1.style.fontFamily = "serif"));
  } else {
    textDiv.forEach((f1) => (f1.style.fontFamily = font));
  }
}
// Font size 설정
function changeFontSize(size) {
    const textDiv = document.querySelectorAll(".innerText");
  
    console.log(size);
    textDiv.forEach((f2) => (f2.style.fontSize = `${size}px`));
}
// Font color 설정
function changeFontColor(fColor) {
  const textDiv = document.querySelectorAll(".innerText");
  textDiv.forEach((f3) => f3.style.color = fColor);
}

// ==============================Border 설정==============================
// Border Style List 생성
function mkBorderStyleList() {
  const borderStyle = document.getElementById("selectBorderStyle");
  const borderList = [
    "밑줄 선택",
    "solid",
    "dashed",
    "dotted",
    "double",
  ];

  for (let i in borderList) {
    borderStyle.options[i] = new Option(borderList[i], borderList[i]);
  }
}
// function changeBorder(bSize, bType, bColor) {
function changeBorder() {  
  const textDiv = document.querySelectorAll(".innerText");
  let bSize = document.getElementById("selectBorderSize").value;
  let bStyle = document.getElementById("selectBorderStyle").value;
  let bColor = document.getElementById("selectBorderColor").value;
  let bTrans = document.getElementById("selectBorderTrans").value;
  const bTransHex = Number(bTrans).toString(16);
  
  console.log(`${bSize}px ${bStyle} ${bColor}${bTransHex}`);
  
  textDiv.forEach((b) => b.style.borderBottom = `${bSize}px ${bStyle} ${bColor}${bTransHex}`);
}

// ==============================BackGround 설정==============================
// note 배경색 변경
function changeBGColor(color) {
    console.log(color);
    const output = document.getElementById("textOutput");
    output.style.backgroundColor = color;
}

// PDF로 저장
function printPDF() {
    setTimeout(() => {
        window.print();    
    }, 100);    
}

// 노트 만들기 버튼 누르면 기존 텍스트 속성 복사, 붙여넣기
function copyOriginProp() {
  let fontStyle = document.getElementById("selectFontStyle").value;
  let fontSize = document.getElementById("selectFontSize").value;
  let fontColor = document.getElementById("selectFontColor").value;

  changeFontFamily(fontStyle);
  changeFontSize(fontSize);
  changeFontColor(fontColor);
}

mkFontFamilyList();
mkFontSizeList();
mkBorderStyleList();
