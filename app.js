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
};
$(hideScreen);

const moveToClassic = () => {
  $("#classic").on("click", (event) => {
    $("#selection").hide();
    $("#typing").show();
    event.preventDefault();
    // ============== Classic Mode ============== //
    const classicMode = () => {
      const texts = ["A Hamiltonian path", "Several algorithms for"];

      let randText = texts[Math.floor(Math.random() * texts.length)];
      randText.split("").map((char) => {
        const span = $("<span>").text(char);
        $("#typing").append(span);
        return span;
      });

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
          $(cursorCharacter).addClass("correct");
          cursorPosition += 1;
          // console.log(nextChar)
        }
        cursorCharacter = $("#typing span")[cursorPosition];
        // let nextChar = $(nextPos).val()
        // console.log(nextPos)
        $(cursorCharacter).addClass("cursor");

        if (cursorCharacter == undefined) {
          endTime = new Date();
          const delta = endTime - startTime;
          const seconds = delta / 1000;
          const wps = randText.length / seconds;
          // console.log(wps)
          const wpm = Math.round((wps * 60.0) / 5.0);
          // console.log(wpm)
          const createWPM = $("<div>").addClass("WPM");

          const createNameDiv = $("<div>").addClass("nickname");
          $("#stats").append(createNameDiv);
          $(".nickname").text("Player name: " + playerName);

          $("#stats").append(createWPM);
          $(".WPM").text("Words Per Minute: " + wpm);
          $("#stats").show();
          $("#typing").hide();

          const createTimeDiv = $("<div>").addClass("time-taken");
          $("#stats").append(createTimeDiv);
          $(".time-taken").text("Time taken: " + seconds + " seconds");

          const reset = $("<button>").attr("id", "reset").text("Reset");
          $("#stats").append("<br>", reset);

          const pressReset = () => {
            $("#reset").on("click", () => {
              location.reload();
            });
          };
          $(pressReset);
        }
      });
    };
    $(classicMode);
  });
};
$(moveToClassic);

const moveToHardmode = () => {
  $("#hardmode").on("click", (event) => {
    $("#selection").hide();
    $("#typing").show();
    event.preventDefault();
    // ============== Hardmode Mode ============== //
    const hardmode = () => {
      const texts = [
        "A Hamiltonian path or traceable path is a path that visits each vertex of the graph exactly once. A graph that contains a Hamiltonian path is called a traceable graph. A graph is Hamiltonian-connected if for every pair of vertices there is a Hamiltonian path between the two vertices.",
        "Several algorithms for finding cycles quickly and with little memory are known. Robert W. Floyd's tortoise and hare algorithm moves two pointers at different speeds through the sequence of values until they both point to equal values. Alternatively, Brent's algorithm is based on the idea of exponential search. Both Floyd's and Brent's algorithms use only a constant number of memory cells, and take a number of function evaluations that is proportional to the distance from the start of the sequence to the first repetition. Several other algorithms trade off larger amounts of memory for fewer function evaluations.",
      ];

      let randText = texts[Math.floor(Math.random() * texts.length)];
      randText.split("").map((char) => {
        const span = $("<span>").text(char);
        $("#typing").append(span);
        return span;
      });

      let spans = $("span").get();
      console.log(spans.length);

      const fadeInterval = () => {
        setInterval(() => {
          let i = Math.floor(Math.random() * spans.length);
          let randomIndex = $("span")[i];
          console.log(randomIndex);
          $(randomIndex).delay(500).fadeOut(1200);
          $(randomIndex).delay(500).fadeIn(1200);
        }, 1000);
      };
      $(fadeInterval);

      // Definitions
      let cursorPosition = 0;
      let cursorCharacter = $("#typing span")[cursorPosition];
      let firstCharacter = $("#typing span")[0];
      $(firstCharacter).addClass("cursor");

      let startTime = null;
      let endTime = null;

      // Key and keydown logic
      $(document).on("keydown", ({ key }) => {
        if (!startTime) {
          startTime = new Date();
        }
        if (key === cursorCharacter.innerText) {
          $(cursorCharacter).removeClass("cursor");
          $(cursorCharacter).addClass("correct");
          cursorPosition += 1;
        }
        cursorCharacter = $("#typing span")[cursorPosition];
        $(cursorCharacter).addClass("cursor");

        if (cursorCharacter == undefined) {
          endTime = new Date();
          const delta = endTime - startTime;
          const seconds = delta / 1000;
          const wps = randText.length / seconds;
          const wpm = Math.round((wps * 60.0) / 5.0);
          const createWPM = $("<div>").addClass("WPM");

          const createNameDiv = $("<div>").addClass("nickname");
          $("#stats").append(createNameDiv);
          $(".nickname").text("Player name: " + playerName);

          $("#stats").append(createWPM);
          $(".WPM").text("Words Per Minute: " + wpm);
          $("#stats").show();
          $("#typing").hide();

          const createTimeDiv = $("<div>").addClass("time-taken");
          $("#stats").append(createTimeDiv);
          $(".time-taken").text("Time taken: " + seconds + " seconds");

          const reset = $("<button>").attr("id", "reset").text("Reset");
          $("#stats").append("<br>", reset);

          const pressReset = () => {
            $("#reset").on("click", () => {
              location.reload();
            });
          };
          $(pressReset);
        }
      });
    };
    $(hardmode);
  });
};
$(moveToHardmode);
