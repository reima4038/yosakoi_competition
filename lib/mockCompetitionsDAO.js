// 審査開催
export function holdCompetition(db, title) {
  return JSON.stringify({id: 'mockId_pasokdpaodiufb'});
}

// 審査一覧
export function getCompetitions(db) {
  return new Promise((resolve) => {
      resolve([{
        id: 'mockId_wertyuidghjk',
        title: 'サンプルお祭り'
      }])
  })
}

// 審査演舞の追加
export function addTargets(db, competitionId, data) {
  return new Promise(resolve => {
    resolve({id: 'mockId_qweiinaoisd'})
  })
}

// 審査演舞の一覧
export function getTargets(db, competitionId) {
    return new Promise(resolve => {
      resolve([
        {
          id: 'mockId_aspdokapokd',
          title: 'サンプル演舞: 平岸天神2019',
          videoID: '-QcteL1eD3E'
        },
        {
          id: 'mockId_aposdkpaoskdp',
          title: 'サンプル演舞: AZUKI2019',
          videoID: 'uf0q9wUBB7g'
        }
      ])
    })
}

// 評価結果の追加
export function addResults(db, competitionId, targetId, data) {
  return new Promise(resolve => resolve({id: 'mockId_daposkdpaokdpo'}))
}

export function getResults(db, competitionId, targetId,) {
  return new Promise(resolve => {
    resolve([{
      id: 'mockId_apsodkpaokdpoa',
      comment: '',
      judgerName: '',
      score1: 1,
      score2: 3,
      score3: 5
    }])
  })
}
