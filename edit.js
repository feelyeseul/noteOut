const textOutput = document.getElementById("textOutput");

// div를 textarea로 변경
function editText(element) {
  let origin = element.target;
  let tArea = document.createElement("textarea");
  tArea.className = "textEditBox";
  tArea.textContent = origin.innerHTML;

  origin.replaceWith(tArea);
  tArea.focus();

  // textarea에서 엔터키 누르면 textarea빠져 나가기
  tArea.onkeydown = function(event) {
    if (event.key === "Enter") {
        this.blur();
    }
  }

  // textarea 빠져 나가면 실행되는 함수
  tArea.onblur = function() {
    if (tArea.value === "") {
        origin.innerHTML = "\u00A0";
    } else {
        origin.innerHTML = tArea.value;
    }
    origin.className = "innerText-edited";
    tArea.replaceWith(origin);

    resetClickEvent();
  }
}

// textOutput 내 div 클릭했을 때 발생하는 이벤트
function resetClickEvent() {
  textOutput.addEventListener("click", (e) => {
      console.log(e, e.target, e.target.outerHTML, e.currentTarget);

      // Output Page 자체는 이벤트 적용 안되도록 설정
      if (e.target === e.currentTarget) {
        resetClickEvent();
        return;
      }

      editText(e);
    }, { once: true }
  );
}

resetClickEvent();

