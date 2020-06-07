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

export function addJudgement(db, data) {
  return new Promise(resolve => {
    resolve({id: 'mockId_qweiinaoisd'})
  })
}

export function getJudgement(db, comeptitionID) {
  // TODO 最初はモックで実装。後にCloudFireStoreと連携。
  return new Promise(resolve => {
    resolve(
      [
        {
          id: 'mockId_qweiinaoisd',
          competitionID: 'mockCompetitionID_apodkpaoskd',
          title: 'サンプルお祭り',
          judgerName: 'よさこい太郎',
          target: [
            {
              videoID: '_QcteL1eD3E',
              title: 'サンプル演舞: 平岸天神2019',
              smile: 2,
              heat: 3,
              oneness: 4
            },
            {
              videoID: 'uf0q9wUBB7g',
              title: 'サンプル演舞: AZUKI2019',
              smile: 2,
              heat: 3,
              oneness: 4
            }
          ]
        },
        {
          id: 'mockId_pokpodkpdas',
          competitionID: 'mockCompetitionID_apodkpaoskd',
          title: 'サンプルお祭り',
          judgerName: 'ソーラン次郎',
          target: [
            {
              videoID: '_QcteL1eD3E',
              title: 'サンプル演舞: 平岸天神2019',
              smile: 5,
              heat: 5,
              oneness: 5
            },
            {
              videoID: 'uf0q9wUBB7g',
              title: 'サンプル演舞: AZUKI2019',
              smile: 3,
              heat: 2,
              oneness: 1
            }
          ]
        }
      ]
    )
  })
}
