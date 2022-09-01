export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

// Function to swap two elements in array
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}



export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortHelper(array, 0, array.length - 1, animations);
  return animations;
}


function bubbleSortHelper(
  mainArray,
  startIdx,
  endIdx,
  animations,
) {
  if (startIdx === endIdx) return;

  for(var k = 0; k < mainArray.length; k++){

    let i = startIdx;

    for (var j = startIdx + 1; j <= endIdx; j++){


    animations.push([i, j]);

    animations.push([i, j]);


    if(mainArray[i] > mainArray[j]){
      animations.push([i, mainArray[j]]);
      swap(mainArray, i, j);
      animations.push([i, j]);

      animations.push([i, j]);

      animations.push([j, mainArray[j]]);

    }
    else{
      animations.push([j, mainArray[j]]);
    }

    i++;

  }

    endIdx--;

  }


}


export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSortHelper(array, 0, array.length - 1, animations);
  return animations;
}


function heapSortHelper(
  mainArray,
  startIdx,
  endIdx,
  animations,
) {

  var N = mainArray.length;

  for (var i = Math.floor(N / 2) - 1; i >= 0; i--){
    heapify(mainArray, N, i, animations);
  }

  // One by one extract an element from heap
  for (var j = N - 1; j > 0; j--) {
    animations.push([0, j])
    animations.push([0, j])
    // Move current root to end
    swap(mainArray, 0, j);

    animations.push([j, mainArray[j]]);

    // call max heapify on the reduced heap
    heapify(mainArray, j, 0, animations);
}




}

function heapify(arr, N, i, animations)
{
    var largest = i; // Initialize largest as root
    var l = 2 * i + 1; // left = 2*i + 1
    var r = 2 * i + 2; // right = 2*i + 2
  
    // If left child is larger than root
    if (l < N && arr[l] > arr[largest]){
      largest = l;
    }
  
    // If right child is larger than largest so far
    if (r < N && arr[r] > arr[largest]){
      largest = r;
    }

    animations.push([i, largest]);
    animations.push([i, largest]);
  
    // If largest is not root
     if (largest !== i) {
        animations.push([i, arr[largest]]);
        swap(arr, i, largest);
        animations.push([i, largest]);
        animations.push([i, largest]);

        animations.push([largest, arr[largest]]);
        // Recursively heapify the affected sub-tree
        heapify(arr, N, largest, animations);
    }
    else{
      animations.push([i, arr[i]]);
    }
}

/* This function takes last element as pivot, places
   the pivot element at its correct position in sorted
   array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot */
   function partition(arr, low, high, animations) {
  
    // sets pivot to last (highest) element
    let pivot = arr[high];
  
    // Index of smaller element and
    // indicates the right position
    // of pivot found so far
    let i = (low - 1);
  
    for (let j = low; j <= high - 1; j++) {

        animations.push([j, high]);

        animations.push([j, high]);

        animations.push([high, arr[high]]);
        
  
        // If current element is smaller 
        // than the pivot
        if (arr[j] < pivot) {
            // Increment index of 
            // smaller element
            i++;
            animations.push([i, j]);
            animations.push([i, j]);
            animations.push([i, arr[j]]);
            swap(arr, i, j);
            animations.push([i, j]);
            animations.push([i, j]);
            animations.push([j, arr[j]]);
        }
    }
    animations.push([i+1, high]);
    animations.push([i+1, high]);
    animations.push([i+1, arr[high]]);
    swap(arr, i + 1, high);
    animations.push([i+1, high]);
    animations.push([i+1, high]);
    animations.push([high, arr[high]]);
    return (i + 1);
}



export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  QuickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function QuickSortHelper(
  mainArray,
  startIdx,
  endIdx,
  animations,
) {
  if (startIdx < endIdx) {

    // pi is partitioning index, arr[p]
    // is now at right place 
    let pi = partition(mainArray, startIdx, endIdx, animations);

    // Separately sort elements before
    // partition and after partition
    QuickSortHelper(mainArray, startIdx, pi - 1, animations);
    QuickSortHelper(mainArray, pi + 1, endIdx, animations);
}

}


export function getSelectionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  selectionSortHelper(array, animations);
  return animations;
}



function selectionSortHelper(arr, animations)
{
  console.log("In selection sort helper")
    var i, j, min_idx;

    const n = arr.length;
 
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < n; j++){
          animations.push([j, min_idx]);
          animations.push([j, min_idx]);
          animations.push([j, arr[j]]);
          if (arr[j] < arr[min_idx]){
            min_idx = j;
          }

        }
        animations.push([min_idx, i]);
        animations.push([min_idx, i]);
        animations.push([min_idx, arr[i]]);
        // Swap the found minimum element with the first element
        swap(arr,min_idx, i);
        animations.push([min_idx, i]);
        animations.push([min_idx, i]);
        animations.push([i, arr[i]]);
    }

}



