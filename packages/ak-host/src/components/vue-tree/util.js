const HEX16 = 0xFFFF
const HEX8 = 0xFF

const uuidV4 = function () {
  const timeLow = randomHexStr(16, HEX16) + randomHexStr(16, HEX16)
  const timeMid = randomHexStr(16, HEX16)
  const timeHighAndVersion = int2Hex((rand(16, HEX16) & 0x0FFF) | (1 << 14))
  const clockSeqHighAndReserved = int2Hex((rand(16, HEX16) & 0x3F00 >>> 8) | 0x80)
  const clockSeqLow = randomHexStr(8, HEX8)
  const node = randomHexStr(16, HEX16) + randomHexStr(16, HEX16) + randomHexStr(16, HEX16)
  return `${timeLow}-${timeMid}-${timeHighAndVersion}-${clockSeqHighAndReserved}${clockSeqLow}-${node}`
}

const int2Hex = function (num, n) {
  if (n) {
    return pad(num.toString(16), n)
  } else {
    return num.toString(16)
  }
}

const rand = function (bits, hex) {
  let n = Math.ceil(Math.random() * Math.pow(2, bits)) & hex
  return n
}

const randomHexStr = function (bits, hex) {
  return int2Hex(rand(bits, hex), bits / 4)
}

const pad = function (n, width, z) {
  z = z || '0'
  n = n + ''
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

const getOffset = function (el) {
  el = el.getBoundingClientRect()
  return {
    left: el.left + window.scrollX,
    top: el.top + window.scrollY
  }
}

const treeDiff = function (tree1, tree2) {
}

export {
  uuidV4,
  getOffset,
  treeDiff
}
