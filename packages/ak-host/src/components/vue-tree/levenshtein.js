const ACTION_TYPE = { DEL: 1, SUB: 1, INS: 1 }

const cost = function (a, b) {
  if (a === b) {
    return 0
  }
  return ACTION_TYPE.SUB
}

const minimum = function (a, b, c) {
  return Math.min(a, Math.min(b, c))
}

const len = function (s) {
  return s.length
}

const arrayOfLengh = function (n) {
  return new Array(n)
}

const levenshtein = function (orig, dest, costFunc) {
  // set flatten array and initialize it
  const origLen = len(orig) + 1
  const destLen = len(dest) + 1
  let lstn = arrayOfLengh(origLen * destLen)
  for (let i = 0; i < origLen; i++) {
    lstn[i] = i
  }
  for (let j = 0; j < destLen; j++) {
    lstn[j * origLen] = j
  }
  let subCost = 0
  for (let i = 1; i < origLen; i++) {
    for (let j = 1; j < destLen; j++) {
      if (costFunc) {
        subCost = costFunc(orig[i - 1], dest[j - 1])
      } else {
        subCost = cost(orig[i - 1], dest[j - 1])
      }
      lstn[j * origLen + i] = minimum(lstn[j * origLen + i - 1] + ACTION_TYPE.DEL,
        lstn[(j - 1) * origLen + i] + ACTION_TYPE.INS,
        lstn[(j - 1) * origLen + i - 1] + subCost)
    }
  }
  return lstn
}

// find the action path
const backtrack = function (lstn, h) {
  let modified = {'DEL': [], 'SUB': [], 'INS': [], 'SAME': []}
  const arrLen = lstn.length
  let slt = lstn[arrLen - 1]
  let pointer = arrLen - 1

  let y0 = Math.floor(pointer / h)
  let x0 = pointer % h
  while (x0 + y0 !== 0) {
    if (x0 > 0 && y0 > 0) {
      if (lstn[y0 * h + x0 - 1] < slt) {
        console.log('DEL', y0, x0, y0, x0 - 1)
        modified.DEL.push(x0 - 1)
        slt = lstn[y0 * h + x0 - 1]
        x0 = x0 - 1
      } else if (lstn[(y0 - 1) * h + x0] < slt) {
        console.log('INS', y0, x0, y0 - 1, x0)
        modified.INS.push(y0 - 1)
        slt = lstn[(y0 - 1) * h + x0]
        y0 = y0 - 1
      } else if (lstn[(y0 - 1) * h + x0 - 1] < slt) {
        console.log('SUB', y0, x0, y0 - 1, x0 - 1)
        modified.SUB.push([x0 - 1, y0 - 1])
        slt = lstn[(y0 - 1) * h + x0 - 1]
        x0 = x0 - 1
        y0 = y0 - 1
      } else {
        modified.SAME.push([x0 - 1, y0 - 1])
        x0 = x0 - 1
        y0 = y0 - 1
      }
    } else if (x0 > 0) {
      if (lstn[y0 * h + x0 - 1] < slt) {
        console.log('DEL', y0, x0, y0, x0 - 1)
        modified.DEL.push(x0 - 1)
        slt = lstn[y0 * h + x0 - 1]
        x0 = x0 - 1
      }
    } else if (y0 > 0) {
      if (lstn[(y0 - 1) * h + x0] < slt) {
        console.log('INS', y0, x0, y0 - 1, x0)
        modified.INS.push(y0 - 1)
        slt = lstn[(y0 - 1) * h + x0]
        y0 = y0 - 1
      }
    }
  }
  return modified
}

const editDistance = function (arr1, arr2, costFunc) {
  // arr1 and arr2 must be ordered by the same algorithm
  return backtrack(levenshtein(arr1, arr2, costFunc), arr1.length + 1)
}

export {
  editDistance
}
