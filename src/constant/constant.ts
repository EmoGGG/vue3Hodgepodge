export interface treeNodeType {
  name: string
  children: treeNodeType[]
}

let treeNode0: treeNodeType
let treeNode1: treeNodeType
let treeNode2: treeNodeType
let treeNode3: treeNodeType
let treeNode4: treeNodeType
let treeNode5: treeNodeType
let treeNode6: treeNodeType
let treeNode7: treeNodeType
let treeNode8: treeNodeType
let treeNode9: treeNodeType
let treeNode10: treeNodeType
let treeNode11: treeNodeType
// eslint-disable-next-line prefer-const
treeNode0 = {
  name: 'treeNode0',
  children: []
}
// eslint-disable-next-line prefer-const
treeNode7 = {
  name: 'treeNode7',
  children: []
}

// eslint-disable-next-line prefer-const
treeNode9 = {
  name: 'treeNode9',
  children: []
}
// eslint-disable-next-line prefer-const
treeNode10 = {
  name: 'treeNode10',
  children: []
}
// eslint-disable-next-line prefer-const
treeNode11 = {
  name: 'treeNode11',
  children: []
}
// eslint-disable-next-line prefer-const
treeNode8 = {
  name: 'treeNode8',
  children: [treeNode9, treeNode10, treeNode11]
}
// eslint-disable-next-line prefer-const
treeNode6 = {
  name: 'treeNode6',
  children: [treeNode7]
}
// eslint-disable-next-line prefer-const
treeNode5 = {
  name: 'treeNode6',
  children: [treeNode8]
}
// eslint-disable-next-line prefer-const
treeNode4 = {
  name: 'treeNode4',
  children: []
}
// eslint-disable-next-line prefer-const
treeNode3 = {
  name: 'treeNode3',
  children: [treeNode4, treeNode5]
}
// eslint-disable-next-line prefer-const
treeNode2 = {
  name: 'treeNode2',
  children: [treeNode6]
}
// eslint-disable-next-line prefer-const
treeNode1 = {
  name: 'treeNode1',
  children: [treeNode2, treeNode3]
}
export const treeNodex = [treeNode0, treeNode1]
export const treeNodez = treeNode1
