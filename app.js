let playerName = [];
let cursorPosition = 0;
let startTime = null;
let endTime = null;

const inputName = () => {
  $(".btn").on("click", (event) => {
    // console.log($("#playerName").val())
    let player = $("#playerName").val();
    playerName.push(player);
    event.preventDefault();
    console.log(playerName);
  });
};
$(inputName);

const hideScreen = () => {
  $("#stats").hide();
  $("#typing").hide();
  $("#insClassic").hide();
  $("#insHardmode").hide();
};
$(hideScreen);

const createTypingDiv = () => {
  const createDiv = $("<div>").attr("id", "typing");
  $("body").append(createDiv);
};

const textGen = () => {
  const texts = ["A Hamiltonian path", "Several algorithms for"];

  let randText = texts[Math.floor(Math.random() * texts.length)];
  randText.split("").map((char) => {
    const span = $("<span>").text(char);
    $("#typing").append(span);
    return span;
  });
};

const fadeInterval = () => {
  const intervals = setInterval(() => {
    console.log("hi");
    let spans = $("span").get();
    let i = Math.floor(Math.random() * 9);
    for (j = 0; j < spans.length; j++) {
      if (
        j
          .toString()
          .split("")
          .some((item) => {
            return item % i === 0;
          })
      ) {
        let randomIndex = $("span")[j];
        $(randomIndex).delay(500).animate({ opacity: 0 });
        $(randomIndex).delay(500).animate({ opacity: 1 });
      }
    }
  }, 3000);
  return intervals
};

const cursorMovement = () => {
  // Definitions
  cursorCharacter = $("#typing span")[cursorPosition];
  let firstCharacter = $("#typing span")[0];
  $(firstCharacter).addClass("cursor");

  // Key and keydown logic
  $(document).on("keydown", ({ key }) => {
    // console.log(key);
    if (!startTime) {
      startTime = new Date();
      console.log(startTime);
    }
    // console.log(startTime);
    if (key === cursorCharacter.innerText) {
      $(cursorCharacter).removeClass("cursor");
      $(cursorCharacter).removeClass("error");
      $(cursorCharacter).addClass("correct");
      cursorPosition += 1;
    } else if (key !== cursorCharacter.innerText) {
      $(cursorCharacter).addClass("error");
    }
    cursorCharacter = $("#typing span")[cursorPosition];
    $(cursorCharacter).addClass("cursor");

    if (cursorCharacter == undefined) {
      endTime = new Date();
      const delta = endTime - startTime;
      const seconds = delta / 1000;
      const wps = $("span").length / seconds;
      const wpm = Math.round((wps * 60.0) / 5.0);
      const createWPM = $("<div>").addClass("WPM");

      const createTimeDiv = $("<div>").addClass("time-taken");
      const createNameDiv = $("<div>").addClass("nickname");

      $("#stats").prepend(createTimeDiv);
      $(".time-taken").text("Time taken: " + seconds + " seconds");

      $("#stats").prepend(createWPM);
      $(".WPM").text("Words Per Minute: " + wpm);
      $("#stats").show();
      $("#typing").hide();

      $("#stats").prepend(createNameDiv);
      $(".nickname").text("Player name: " + playerName);
    }
  });
};

const pressReset = (timer) => {
  $("#reset").on("click", () => {
    // location.reload();
    $("#playerName").empty();
    $("#typing").remove();
    $(".nickname").remove();
    $(".WPM").remove();
    $(".time-taken").remove();
    $("#stats").hide();
    $("#selection").show();
    $("#playerName").val("");
    cursorPosition = 0;
    playerName = [];
    startTime = null;
    endTime = null;
    $("#reset").remove();
    $("#reset").off();
    clearInterval(timer)
  });
};

const restartBtn = (timer) => {
  const reset = $("<button>").attr("id", "reset").text("Reset");
  $("#stats").append(reset);
  pressReset(timer)
};

const toggleClassicScrn = () => {
  $("#classic-instruction").on("click", (event) => {
    console.log("hello");
    $("#insClassic").hide();
    createTypingDiv();
    textGen();
    cursorMovement();
    restartBtn();
    $("#typing").show();
    event.preventDefault;
    $("#classic-instruction").off();
  });
};

const toggleHMScrn = () => {
  $("#hardmode-instruction").on("click", (event) => {
    $("#insHardmode").hide();
    createTypingDiv();
    textGen();
    const timer = fadeInterval();
    cursorMovement();
    restartBtn(timer);
    $("#typing").show();
    event.preventDefault();
    $("#hardmode-instruction").off();
  });
};

// ============== Classic Mode ============== //
const classicMode = () => {
  $("#classic").on("click", (event) => {
    $("#selection").hide();
    $("#insClassic").show();
    event.preventDefault();
    clearInterval(fadeInterval);
    $(toggleClassicScrn);
  });
};
$(classicMode);

// ============== Hardmode Mode ============== //
const hardMode = () => {
  $("#hardmode").on("click", (event) => {
    $("#selection").hide();
    $("#insHardmode").show();
    event.preventDefault();
    $(toggleHMScrn);
  });
};
$(hardMode);
