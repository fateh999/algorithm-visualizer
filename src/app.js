let defaultDataSetLength = 10;
const dataSetLengthInputRef = document.getElementById("dataSet");
const searchInputRef = document.getElementById("search");

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
  console.log(array, active);
  for (let i = 0; i < array.length; i++) {
    htmlString += `
    <div
          style="height: ${100 * (array[i] / max)}%;"
          class="${
            active && activeIndex === i
              ? "bg-success"
              : activeIndex === i
              ? "bg-primary"
              : "bg-info"
          } ml-2 d-flex align-items-end p-1 bar"
        >
        <p class="text-light text-center">${array[i]}</p>          
        </div>
        `;
  }
  resultRef.innerHTML = htmlString;
}

function linearSearch() {
  if (!searchInputRef.value) {
    alert("Search number is required");
    return;
  }

  function recursion(i) {
    if (dataSetArray[i] == searchInputRef.value) {
      repaintSearch(dataSetArray, dataSetLengthInputRef.value || 10, i, true);
      return i;
    }
    repaintSearch(dataSetArray, dataSetLengthInputRef.value || 10, i);

    if (i === dataSetArray.length - 1) {
      return null;
    }
    timeout = setTimeout(() => {
      recursion(++i);
    }, 1000);
  }

  const dataSetArray = resetData(dataSetLengthInputRef.value || 10);
  recursion(0);
}
