// constants
const HOME_LEFT = { label: "Left", index: 0 };
const HOME_MIDDLE = { label: "Middle", index: 1 };
const HOME_RIGHT = { label: "Right", index: 2 };

const HOMES_COUNT = 3;
const FLOORS_COUNT = 10;
const FIND_HOME_NUMBER = 1;

const homeHandlers = {
  [HOME_LEFT.index]: HOME_LEFT.label,
  [HOME_MIDDLE.index]: HOME_MIDDLE.label,
  [HOME_RIGHT.index]: HOME_RIGHT.label,
};

const generateButton = document.querySelector(
  ".building__field--button.generate"
);
const findButton = document.querySelector(".building__field--button.find");

const data = [];

function main() {
  addEventOnButton({
    button: generateButton,
    handleEvent: handleClickOnGenerate,
  });
  addEventOnButton({
    button: findButton,
    handleEvent: handleClickOnFind,
  });
}

function handleClickOnGenerate({ button } = { button }) {
  const input = getInputElement({
    selector: ".building__field--input.generate",
  });
  const validatedInput = checkInputValidation({ input: input.value.trim() });

  if (validatedInput) {
    generateFloors({ floorsCount: validatedInput });
    input.value = "";
  }
}

function handleClickOnFind() {
  const input = getInputElement({ selector: ".building__field--input.find" });
  const validatedInput = checkInputValidation({ input: input.value.trim() });

  if (validatedInput) {
    const { floor, home } = findHome({ findNumber: validatedInput });
    updateContent({ floor, home });
    input.value = "";
  }
}

function updateContent({ floor, home } = {}) {
  try {
    document.querySelector(
      ".building__content__result--text.floor"
    ).textContent = floor;
    document.querySelector(
      ".building__content__result--text.home"
    ).textContent = home;
  } catch (e) {
    console.error(e);
  }
}

function addEventOnButton(
  { event, button, handleEvent } = {
    event: "click",
    button: {},
    handleEvent: () => {},
  }
) {
  button.addEventListener("click", handleEvent);
}

function getInputElement({ selector } = {}) {
  return document.querySelector(selector);
}

function generateFloors({ floorsCount } = {}) {
  for (let i = 0; i < floorsCount; i++) {
    const generateIndex = findLastHomeIndex({ floorIndex: i });
    const [start, end] = generateHomeIndexes({
      index: generateIndex,
    });

    data.push({
      floor: i + 1,
      homes: generateHomes({ start, end }),
    });
  }
}

function findLastHomeIndex({ floorIndex } = {}) {
  const floor = data[floorIndex - 1];
  return floor ? floor.homes[HOMES_COUNT - 1] : 0;
}

function generateHomeIndexes({ index } = { index: 0 }) {
  return [index + 1, index + 3];
}

function generateHomes({ start, end } = {}) {
  const homes = [];
  for (let i = start; i <= end; i++) {
    homes.push(i);
  }

  return homes;
}

function findHome({ findNumber } = { findNumber: 1 }) {
  try {
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const homes = row.homes;

      for (let j = 0; j < homes.length; j++) {
        let homeIndex = homes[j];
        if (findNumber === homeIndex) {
          return {
            floor: row.floor,
            home: homeHandlers[j],
          };
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
}

function checkInputValidation({ input } = {}) {
  if (!Number(input)) {
    alert("Invalid input!");
    return;
  }

  return +input;
}

main();
