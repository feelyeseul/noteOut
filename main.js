// 선택한 파일의 텍스트 읽고 배열에 저장
function readfile(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsText(file, "utf-8");
  reader.onload = () => {
    deleteAllDiv();
    const arrResult = textSplit(reader.result);
    createDivEachRow(arrResult);
    // sampleResult.textContent = JSON.stringify(arrResult);
  };

  reader.onerror = function () {
    alert(reader.error);
  };
}

// text를 개행 기준으로 나누고 배열에 저장
function textSplit(text) {
  let rows = text.split("\r\n"); // 읽은 파일을 개행을 기준으로 나누고 빈 객체에 입력

  console.log(rows);
  return rows;
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

// Font family List 생성
function mkFontFamilyList() {
  const fontFamily = document.getElementById("selectfontstyle");
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

// Font family 설정
function changeFontFamily(font) {
  const textDiv = document.querySelectorAll(".innerText");

  console.log(font);
  if (font === "폰트 선택") {
    textDiv.forEach((el) => (el.style.fontFamily = "serif"));
  } else {
    textDiv.forEach((el) => (el.style.fontFamily = font));
  }
}

// Font size List 생성
function mkFontSizeList() {
    const fontSize = document.getElementById("selectfontsize");
    let sizeList = [];

    for(let i = 10; i < 31; i++) {
        sizeList.push(i);
    }

    for (let j in sizeList) {
        fontSize.options[j] = new Option(sizeList[j], sizeList[j]);
      }
}

// Font size 설정
function changeFontSize(size) {
    const textDiv = document.querySelectorAll(".innerText");
  
    console.log(size);
    textDiv.forEach((ele) => (ele.style.fontSize = `${size}px`));
}

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


mkFontFamilyList();
mkFontSizeList();
