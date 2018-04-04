/**
 * Created by nihilism on 01/11/2017.
 */

const find = function (a, arr) {
  let index = -1
  for (let i = 0; i < arr.length; i++) {
    if (a.data().id === arr[i].id) {
      index = i
      break
    }
  }
  return index
}

const arrayDiff = function (arr1, arr2) {
  let sameIds = []
  let delIds = []
  let newIds = []
  let idxList = []
  for (let i = 0; i < arr1.length; i++) {
    const index = find(arr1[i], arr2)
    if (index > -1) {
      sameIds.push({ left: arr1[i], right: arr2[index] })
      idxList.push(i)
    } else {
      delIds.push(arr1[i])
    }
  }

  // check arr2 to find items to add
  for (let i = 0; i < arr2.length; i++) {
    if (idxList.indexOf(i) < 0) {
      newIds.push(arr2[i])
    }
  }

  return { DEL: delIds, SAME: sameIds, ADD: newIds }
}

export default arrayDiff
