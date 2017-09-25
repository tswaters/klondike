
namespace Program {

  export type datum = {
    name: string,
    label: string,
    positions?: {x: number, y: number}[]
  }

  export const values: datum[] = [
    {label: 'A', name: 'ace'},
    {label: '2', name: 'two'},
    {label: '3', name: 'three'},
    {label: '4', name: 'four'},
    {label: '5', name: 'five'},
    {label: '6', name: 'six'},
    {label: '7', name: 'seven'},
    {label: '8', name: 'eight'},
    {label: '9', name: 'nine'},
    {label: '10', name: 'ten'},
    {label: 'J', name: 'jack'},
    {label: 'Q', name: 'queen'},
    {label: 'K', name: 'king'},
  ].map((value: datum) => {
    let positions: {x: number, y: number}[] = []

    if (['ace', 'three', 'five', 'nine', 'jack', 'queen', 'king'].indexOf(value.name) > -1) {
      positions.push({x: 1, y: 3})
    }
    if (['two', 'three'].indexOf(value.name) > -1) {
      positions.push({x: 1, y: 0}, {x: 1, y: 6})
    }
    if (['four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].indexOf(value.name) > -1) {
      positions.push({x: 0, y: 0}, {x: 2, y: 0}, {x: 0, y: 6}, {x: 2, y: 6})
    }
    if (['six', 'seven', 'eight'].indexOf(value.name) > -1) {
      positions.push({x: 0, y: 3}, {x: 2, y: 3})
    }
    if (['seven', 'ten', 'eight'].indexOf(value.name) > -1) {
      positions.push({x: 1, y: 1})
    }
    if (['nine', 'ten'].indexOf(value.name) > -1) {
      positions.push({x: 0, y: 2}, {x: 2, y: 2}, {x: 0, y: 4}, {x: 2, y: 4})
    }
    if (['ten', 'eight'].indexOf(value.name) > -1) {
      positions.push({x: 1, y: 5})
    }

    value.positions = positions
    return value

  })

  export const suits: datum[] = [
    {label: '♠', name: 'spade'},
    {label: '♣', name: 'club'},
    {label: '♥', name: 'heart'},
    {label: '♦', name: 'diamond'}
  ]

}
