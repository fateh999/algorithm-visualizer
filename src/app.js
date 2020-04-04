let defaultDataSetLength = 10;
let algorithmRunning = false;
const dataSetLengthInputRef = document.getElementById("dataSet");
const searchInputRef = document.getElementById("search");
const activeAlgorithmRef = document.getElementById("activeAlgorithm");

function bootUp() {}

function resetData(length) {
  let dataSetArray = [];
  for (let i = 0; i < length; i++) {
    dataSetArray.push(getRandomInt(1, length));
  }
  return dataSetArray;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function repaintSearch(array, max, activeIndex, active) {
  const resultRef = document.getElementById("result");
  let htmlString = "";
  console.log(array, max, activeIndex, active);
  for (let i = 0; i < array.length; i++) {
    htmlString += `
    <div
          style="height: ${100 * (array[i] / max)}%;"
          class="${
            active && activeIndex === i
              ? "bg-success"
              : activeIndex === i
              ? "bg-primary"
              : "bg-grey"
          } ml-2 d-flex align-items-end p-1 bar"
        >
        <p class="text-light text-center">${array[i]}</p>          
        </div>
        `;
  }
  resultRef.innerHTML = htmlString;
}

function linearSearch() {
  if (algorithmRunning) {
    return alert(
      "Algorithm is already running. Please wait or refresh the page."
    );
  }
  if (!searchInputRef.value) {
    alert("Search number is required");
    return;
  }

  function recursion(i) {
    if (dataSetArray[i] == searchInputRef.value) {
      repaintSearch(dataSetArray, dataSetLengthInputRef.value || 10, i, true);
      algorithmRunning = false;
      return i;
    }
    repaintSearch(dataSetArray, dataSetLengthInputRef.value || 10, i);

    if (i === dataSetArray.length - 1) {
      algorithmRunning = false;
      return alert("Number not found!!!");
    }
    setTimeout(() => {
      recursion(++i);
    }, 1000);
  }

  const dataSetArray = resetData(dataSetLengthInputRef.value || 10);
  algorithmRunning = true;
  recursion(0);
}

function binarySearch() {
  if (algorithmRunning) {
    return alert(
      "Algorithm is already running. Please wait or refresh the page."
    );
  }
  if (!searchInputRef.value) {
    alert("Search number is required");
    return;
  }

  const dataSetArray = resetData(dataSetLengthInputRef.value || 10);
  var lowIndex = 0;
  var highIndex = dataSetArray.length - 1;

  function recursion(sortedArray) {
    if (lowIndex <= highIndex) {
      var midIndex = Math.floor((lowIndex + highIndex) / 2);
      repaintSearch(sortedArray, dataSetLengthInputRef.value || 10, midIndex);
      if (sortedArray[midIndex] == searchInputRef.value) {
        repaintSearch(
          sortedArray,
          dataSetLengthInputRef.value || 10,
          midIndex,
          true
        );
        algorithmRunning = false;
        return midIndex;
      } else if (sortedArray[midIndex] < parseInt(searchInputRef.value)) {
        lowIndex = midIndex + 1;
      } else {
        highIndex = midIndex - 1;
      }
      setTimeout(() => {
        recursion(sortedArray);
      }, 1000);
    } else {
      algorithmRunning = false;
      return alert("Number not found!!!");
    }
  }
  algorithmRunning = true;
  recursion(dataSetArray.sort((a, b) => a - b));
}

function selectionSort() {}

function bubbleSort() {}
