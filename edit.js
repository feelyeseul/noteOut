const textOutput = document.getElementById("textOutput");
resetClickEvent();

// textOutput 내 div 클릭했을 때 발생하는 이벤트
function resetClickEvent() {
  textOutput.addEventListener("click", (e) => {
      console.log(e, e.target, e.target.style, e.currentTarget);

      // Output Page 자체는 이벤트 적용 안되도록 설정
      if (e.target === e.currentTarget) {
        resetClickEvent();
        return;
      }

      editText(e);
    }, { once: true }
  );
}

// div를 textEditBox로 변경
function editText(element) {
  let origin = element.target;
  let textEditBox = createTextEditBox();
  
  // originDiv를 편집할 수 있도록 textEditBox로 변경
  origin.replaceWith(textEditBox);
  
  // textEditBox 기본 내용 설정
  let [fontDiv, reviewDiv, saveButton] = textEditBox.childNodes;
    reviewDiv.textContent = origin.innerHTML;
    reviewDiv.style = origin.style.cssText;
    // 문자 별 span 씌우기
    reviewDiv.innerHTML = mkSpanAllString(reviewDiv.innerText);
    // 초기 폰트 설정(originDiv에서 가져옴)
    setDefaultFontStyle(fontDiv, reviewDiv);
  // reviewDiv.focus();


  

  reviewDiv.onmouseup = function() {
    let reviewChildArr = Array.from(reviewDiv.childNodes);

    fontDiv.onchange = () => {
      let selRange = selectedTextRange();
      let start = selRange.startContainer.parentElement;
      let end = selRange.endContainer.parentElement;
      const Obj = {
        sIndex: reviewChildArr.indexOf(start),
        eIndex: reviewChildArr.indexOf(end),
      }

      const fontStyle = newFontStyle();

      console.log("선택 범위:", selRange, "start:", Obj.sIndex, ", end:", Obj.eIndex);

      for (let i = Obj.sIndex; i < Obj.eIndex + 1; i++) {
        // reviewDiv.childNodes[i].style.cssText = fontStyle;
        reviewChildArr[i].style.cssText = fontStyle;
      }
    }

    // reviewDiv에서 엔터키 누르면 reviewDiv 빠져 나가기
    reviewDiv.onkeydown = function(event) {
      if (event.key === "Enter") {
          this.blur();
      }
    }
    // reviewDiv 빠져 나가면 실행되는 함수
    reviewDiv.onblur = function() {
      // reviewDiv에 focus된 후, blur될 때 까지 변한 내용이 없으면(텍스트 뿐 아니라 style도) 아래 forEach 돌지 않고 바로 끝내기
      // ==============================================================================================================여기부터 작업해라~~~
      

      // <span> 처리가 되지 않은 문자 검사해서 <span> + style 처리하기
      reviewChildArr.forEach((e, i) => {
        if (e.textContent.length !== 1) {
          if (reviewChildArr[i].style.cssText === "") {
            reviewChildArr[i].outerHTML = mkSpanAllString(e.innerText);
          } else {
            let cssText = reviewChildArr[i].style.cssText;
            let cssTextModify = cssText.replaceAll('"', '\'');

            let spanString = mkSpanAllString(e.innerText); // <span>A</span><span>B</span><span>C</span>...
            let spanWithCss = spanString.replaceAll('<span>', `<span style="${cssTextModify}">`);

            reviewChildArr[i].outerHTML = spanWithCss;
          }
        }
      })

      // origin.innerHTML = reviewDiv.innerHTML;
      // origin.className = "innerText-edited";
      // textEditBox.replaceWith(origin);

      // resetClickEvent();
    }
  }
}


// 각 문자열에 span 씌우기
function mkSpanAllString(string) {
  if(string === "&nbsp;") {
    return "<span>\u00A0</span>";
  }

  let spanResult = "";
  for (let i=0; i<string.length; i++) {
    spanResult += `<span>${string[i]}</span>`
  }
  
  return spanResult;
}

// textEditBox 초기 폰트 설정
function setDefaultFontStyle(fDiv, rDiv) {
  const compStyles = window.getComputedStyle(rDiv);
  let ff = compStyles.getPropertyValue("font-family").replaceAll('"', '');
  let fs = compStyles.getPropertyValue("font-size").replace('px', '');
  let fc = rgbToHex(compStyles.getPropertyValue("color"));
  
  console.log(ff, fs, fc);

  fDiv.childNodes[0].value = ff;
  fDiv.childNodes[1].value = fs;
  fDiv.childNodes[2].value = fc;
}

// rgb를 #000000으로 변경
function rgbToHex(color) { // color = rgb(###, ###, ###) 형식
  let rgb = color.replace(/[^0-9,]/g, ""); // 숫자와 ,(쉼표) 남기고 삭제}
  let rgbColor = rgb.split(","); // 쉼표로 구분된 배열 생성

  let rgbHex = "#";
  rgbColor.forEach((element) => {
    let hex = Number(element).toString(16);
    hex.length === 1 ? (hex = "0" + hex) : hex;
    rgbHex += hex;
  });

  console.log("rgb to hex:", rgbColor, "->", rgbHex);
  return rgbHex;
}


// textEditBox reviewDiv에서 바꿀 text 선택
function selectedTextRange() {
  sel = document.getSelection().getRangeAt(0);

  return sel;
}

// 노트 내부에서 바뀐 font 스타일 string으로 저장
function newFontStyle() {
  const classArr = document.getElementsByClassName("selectProperty_inner");
  let f = classArr[0].value;
  let s = classArr[1].value;
  let c = classArr[2].value;
  
  if (f === "폰트 선택") {
    f = "serif";
  }

  let styleString = `font-family: ${f}; font-size: ${s}px; color: ${c};`
  console.log(styleString);
  return styleString;
}




// TextEditBox 생성
function createTextEditBox() {
  let outerDiv = document.createElement("div");
    outerDiv.id = "outerDiv";

  let fontDiv = document.createElement("div");
    fontDiv.id = "fontDiv";
  let fontSelect = document.createElement("select");
    fontSelect.className = "selectProperty_inner";
    fontSelect.id = "selectFontStyle_inner";
  let sizeSelect = document.createElement("select");
    sizeSelect.className = "selectProperty_inner";
    sizeSelect.id = "selectFontSize_inner";
  let colorSelect = document.createElement("input");
    colorSelect.className = "selectProperty_inner";
    colorSelect.type = "color";
    colorSelect.id = "selectFontColor_inner";
  
  let reviewDiv = document.createElement("div");
    reviewDiv.contentEditable = "true";
    reviewDiv.id = "reviewDiv";
  let saveButton = document.createElement("button");
    saveButton.textContent = "저장";
    saveButton.id = "saveButton";

  // font 설정 Div
  fontDiv.appendChild(fontSelect);
  fontDiv.appendChild(sizeSelect);
  fontDiv.appendChild(colorSelect);
  mkFontFamilyList(fontSelect);
  mkFontSizeList(sizeSelect);

  // 전체 Div
  outerDiv.appendChild(fontDiv);
  outerDiv.appendChild(reviewDiv);
  outerDiv.appendChild(saveButton);

  return outerDiv;
}