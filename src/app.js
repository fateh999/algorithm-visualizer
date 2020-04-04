let defaultDataSetLength = 10;
let algorithmRunning = false;
const dataSetLengthInputRef = document.getElementById("dataSet");
const searchInputRef = document.getElementById("search");
const activeAlgorithmRef = document.getElementById("activeAlgorithm");
const resultRef = document.getElementById("result");

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

function repaintSort(array, max, leftIndex, rightIndex, swap) {
  let htmlString = "";
  console.log(
    array,
    max,
    leftIndex,
    rightIndex,
    array[leftIndex],
    array[rightIndex]
  );
  for (let i = 0; i < array.length; i++) {
    htmlString += `
    <div
          style="height: ${100 * (array[i] / max)}%;"
          class="${
            !array[rightIndex]
              ? "bg-grey"
              : swap && (leftIndex === i || rightIndex === i)
              ? "bg-warning"
              : leftIndex === i || rightIndex === i
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
  activeAlgorithmRef.innerText = "Linear Search";
  const inputValue = dataSetLengthInputRef.value || 10;
  const dataSetArray = resetData(inputValue);
  const searchInputValue = searchInputRef.value;

  function recursion(i) {
    if (dataSetArray[i] == searchInputValue) {
      repaintSearch(dataSetArray, inputValue, i, true);
      algorithmRunning = false;
      return i;
    }
    repaintSearch(dataSetArray, inputValue, i);

    if (i === dataSetArray.length - 1) {
      algorithmRunning = false;
      repaintSearch(dataSetArray, inputValue, -1);
      return alert("Number not found!!!");
    }
    setTimeout(() => {
      recursion(++i);
    }, 1000);
  }

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
  activeAlgorithmRef.innerText = "Binary Search";
  const inputValue = dataSetLengthInputRef.value || 10;
  const searchInputValue = searchInputRef.value;
  const dataSetArray = resetData(inputValue);
  var lowIndex = 0;
  var highIndex = dataSetArray.length - 1;

  function recursion(sortedArray) {
    if (lowIndex <= highIndex) {
      var midIndex = Math.floor((lowIndex + highIndex) / 2);
      repaintSearch(sortedArray, inputValue, midIndex);
      if (sortedArray[midIndex] == searchInputValue) {
        repaintSearch(sortedArray, inputValue, midIndex, true);
        algorithmRunning = false;
        return midIndex;
      } else if (sortedArray[midIndex] < parseInt(searchInputValue)) {
        lowIndex = midIndex + 1;
      } else {
        highIndex = midIndex - 1;
      }
      setTimeout(() => {
        recursion(sortedArray);
      }, 1000);
    } else {
      algorithmRunning = false;
      repaintSearch(sortedArray, inputValue, -1);
      return alert("Number not found!!!");
    }
  }
  algorithmRunning = true;
  recursion(dataSetArray.sort((a, b) => a - b));
}

function selectionSort() {
  if (algorithmRunning) {
    return alert(
      "Algorithm is already running. Please wait or refresh the page."
    );
  }
  activeAlgorithmRef.innerText = "Selection Sort";
  const inputValue = dataSetLengthInputRef.value || 10;
  const dataSetArray = resetData(inputValue);

  let sort = (inputArr) => {
    let len = inputArr.length;
    function recursion(i) {
      if (i < len - 1) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
          (function (j) {
            setTimeout(function () {
              if (inputArr[min] > inputArr[j]) {
                min = j;
                repaintSort(inputArr, inputValue, i, j, true);
              } else {
                repaintSort(inputArr, inputValue, i, j);
              }
              if (j === len - 1) {
                if (min !== i) {
                  let tmp = inputArr[i];
                  inputArr[i] = inputArr[min];
                  inputArr[min] = tmp;
                  repaintSort(inputArr, inputValue, i, j);
                }
                recursion(++i);
              }
            }, 1000 * (j - i));
          })(j);
        }
      } else {
        repaintSort(inputArr, inputValue, -1, -1);
      }
    }
    recursion(0);
  };
  sort(dataSetArray);
}

function bubbleSort() {
  if (algorithmRunning) {
    return alert(
      "Algorithm is already running. Please wait or refresh the page."
    );
  }
  activeAlgorithmRef.innerText = "Bubble Sort";
  const inputValue = dataSetLengthInputRef.value || 10;
  const dataSetArray = resetData(inputValue);

  let sort = (inputArr) => {
    let len = inputArr.length;
    function recursion(i, swapped) {
      if (i < len - 1) {
        for (let j = 0; j < len; j++) {
          (function (j) {
            setTimeout(function () {
              if (inputArr[j] > inputArr[j + 1]) {
                repaintSort(inputArr, inputValue, j, j + 1, true);
                let tmp = inputArr[j];
                inputArr[j] = inputArr[j + 1];
                inputArr[j + 1] = tmp;
                swapped = true;
              } else {
                repaintSort(inputArr, inputValue, j, j + 1);
              }
              if (j === len - 1) {
                if (swapped === true) {
                  swapped = false;
                  recursion(++i, true);
                } else {
                  repaintSort(inputArr, inputValue, -1, -1);
                }
              }
            }, 1000 * j);
          })(j);
        }
      }
    }
    recursion(0, false);
  };

  sort(dataSetArray);
}

function reset() {
  location.href = "/";
}
