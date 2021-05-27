// Code from: https://www.guru99.com/quicksort-in-javascript.html
// console.log(items, items_to_follow);
function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function partition(items, items_to_follow, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            swap(items_to_follow, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, items_to_follow, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, items_to_follow, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, items_to_follow, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, items_to_follow, index, right);
        }
    }
    return [items, items_to_follow];
}
const sorting = function(items, items_to_follow) {
    // first call to quick sort
    var sortedArray = quickSort(items, items_to_follow, 0, items.length - 1);
    console.log(sortedArray[0], sortedArray[1]); //prints [2,3,5,6,7,9]
    return sortedArray;
}
