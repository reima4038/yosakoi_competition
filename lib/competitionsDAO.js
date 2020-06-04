// 審査への参照
function competitionRef(db) {
  return db.collection('competitions');
}

// 審査演舞への参照
function targetRef(db, competitionID) {
  return competitionRef(db).doc(competitionID).collection('targets')
}

// 審査結果への参照
function resultRef(db, competitionID, targetID) {
  return targetRef(db, competitionID).doc(targetID).collection('results')
}

async function read(ref) {
  let result = await new Promise((resolve, reject) => {
    ref.get()
      .then(snapshot => {
        let data = []
        snapshot.forEach((doc) => {
          data.push(
            Object.assign({
              id: doc.id
            }, doc.data())
          )
        })
        resolve(data)
      }).catch(error => {
        reject([])
      })
  })
  return result;
}

// 審査開催
export function holdCompetition(db, title) {
  return competitionRef(db).add({title})
}

// 審査一覧
export function getCompetitions(db) {
  return read(competitionRef(db));
}

// 審査演舞の追加
export function addTargets(db, competitionId, data) {
  targetRef(db, competitionId).add(data)
}

// 審査演舞の一覧
export function getTargets(db, competitionId) {
  return read(targetRef(db, competitionId))
}

// 評価結果の追加
export function addResults(db, competitionId, targetId, data) {
  resultRef(db, competitionId, targetId).add({
    comment: data.comment,
    judgerName: data.judgerName,
    smile: data.smile,
    heat: data.heat,
    oneness: data.oneness
  })
}

export function getResults(db, competitionId, targetId,) {
  return read(resultRef(db, competitionId, targetId))
}

