
// Each key corresponds to the current practical room level and contains a separate objects containing settings enabled
// at that level. Each higher level inherits the settings from the level below it.
let roomLevelOptions = {
  1: {
    'UPGRADERS_QUANTITY': 5,
    'RESERVER_COUNT': 0,
    'SCOUTS': true
  },
  2: {},
  3: {
    'PURE_CARRY_FILLERS': true,
    'ADDITIONAL_FILLERS': true,
    'SELF_SUFFICIENT': true,
    'REMOTE_MINES': 1
  },
  4: {
    'DEDICATED_MINERS': true,
    'ADDITIONAL_FILLERS': false,
    'RESERVER_COUNT': 3,
    'REMOTE_MINES': 2,
    'EXPAND_FROM': true,
    'ALLOW_MINING_SCALEBACK': true
  },
  5: {},
  6: {
    'EXTRACT_MINERALS': true,
    'RESERVER_COUNT': 2,
    'ALLOW_MINING_SCALEBACK': false
  },
  7: {
    'RESERVER_COUNT': 1
  },
  8: {
    'UPGRADERS_QUANTITY': 1,
    'REMOTE_MINES': 3
  }
}

// Have each level inherit the settings from the previous level unless already set.
for (let level = 0; level <= 8; level++) {
  for (let addLevel = level - 1; addLevel > 0; addLevel--) {
    const keys = Object.keys(roomLevelOptions[addLevel])
    for (let key of keys) {
      if (typeof roomLevelOptions[level][key] === 'undefined') {
        roomLevelOptions[level][key] = roomLevelOptions[addLevel][key]
      }
    }
  }
}

Room.prototype.getRoomSetting = function (key) {
  const level = this.getPracticalRoomLevel()
  return roomLevelOptions[level][key] ? roomLevelOptions[level][key] : false
}
