// 審査への参照
function competitionRef(db) {
  return db.collection('competitions');
}

async function readCollection(ref) {
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

async function readDocument(ref) {
  let result = await new Promise((resolve, reject) => {
    ref.get()
      .then(doc => {
        resolve(doc.data())
      }).catch(error => {
        reject({})
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
  return readCollection(competitionRef(db));
}

// 特定の審査を取得
export function getCompetition(db, competitionID) {
  return readDocument(competitionRef(db).doc(competitionID));
}

// 評価結果
export function addJudgement(db, data) {
  return db.collection('judgements').add(data);
}

export function getJudgement(db, competitionID) {
  return readCollection(db.collection('judgements').where('competitionID', '==', competitionID));
}


