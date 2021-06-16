let playerName = [];

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

const textGen = () => {
  const texts = [
    "A Hamiltonian path",
    "Several algorithms for",
  ];

  let randText = texts[Math.floor(Math.random() * texts.length)];
  randText.split("").map((char) => {
    const span = $("<span>").text(char);
    $("#typing").append(span);
    return span;
  });
};

const fadeInterval = () => {
  setInterval(() => {
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
};

const cursorMovement = () => {
  // Definitions
  let cursorPosition = 0;
  let cursorCharacter = $("#typing span")[cursorPosition];
  let firstCharacter = $("#typing span")[0];
  $(firstCharacter).addClass("cursor");

  let startTime = null;
  let endTime = null;

  // Key and keydown logic
  $(document).on("keydown", ({ key }) => {
    // console.log(key);
    if (!startTime) {
      startTime = new Date();
    }
    // console.log(startTime);
    if (key === cursorCharacter.innerText) {
      $(cursorCharacter).removeClass("cursor");
      $(cursorCharacter).removeClass("error");
      $(cursorCharacter).addClass("correct");
      cursorPosition += 1;
    } else if (key !== cursorCharacter.innerText){
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

      const createNameDiv = $("<div>").addClass("nickname");
      $("#stats").prepend(createNameDiv);
      $(".nickname").text("Player name: " + playerName);

      $(".nickname").append(createWPM);
      $(".WPM").text("Words Per Minute: " + wpm);
      $("#stats").show();
      $("#typing").hide();

      const createTimeDiv = $("<div>").addClass("time-taken");
      $(".WPM").prepend(createTimeDiv);
      $(".time-taken").text("Time taken: " + seconds + " seconds");
    }
  });
};

const restartBtn = () => {
  const reset = $("<button>").attr("id", "reset").text("Reset");
  $("#stats").append("<br>", reset);

  const pressReset = () => {
    $("#reset").on("click", () => {
      location.reload();
      // $("#typing").remove();
      // $("#stats").empty();
      // $("#stats").hide();
      // $("#selection").show();
    });
  };
  $(pressReset);
};

// ============== Classic Mode ============== //
const moveToClassic = () => {
  $("#classic").on("click", (event) => {
    $("#selection").hide();
    $("#insClassic").show();
    event.preventDefault();

    const toggleScrn = () => {
      $("#classic-instruction").on("click", (event) => {
        $("#insClassic").hide();
        $("#typing").show();
        event.preventDefault();
      });
    };
    $(toggleScrn);
  });
};
$(textGen);
$(cursorMovement);
$(restartBtn);
$(moveToClassic);

// ============== Hardmode Mode ============== //
const moveToHardmode = () => {
  $("#hardmode").on("click", (event) => {
    $("#selection").hide();
    $("#insHardmode").show();
    event.preventDefault();

    const toggleHMScrn = () => {
      $("#hardmode-instruction").on("click", (event) => {
        $("#insHardmode").hide();
        $("#typing").show();
        event.preventDefault();
      });
    };
    $(toggleHMScrn);
    $(fadeInterval);
  });
};
$(moveToHardmode);