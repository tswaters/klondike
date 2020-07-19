export enum PersistanceType {
  gameMode = 'game-mode',
  theme = 'theme',
  score = 'score',
}

export const persist: <T>(name: PersistanceType, thing: T) => void = (name, thing) => {
  try {
    localStorage.setItem(name, JSON.stringify(thing))
  } catch (err) {
    // that sucks
  }
}

export const retrieve = <T>(name: PersistanceType, init: T) => {
  try {
    const thing = localStorage.getItem(name) || ''
    return JSON.parse(thing) as T
  } catch (err) {
    return init
  }
}
