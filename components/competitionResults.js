// 審査結果

export default function competitonResults() {
  const mock_results = [
    'よさこい太郎 2020/05/20',
    'ソーラン次郎 2020/05/20',
    'どまつり三郎 2020/05/20',
    'みちのく四郎 2020/05/20',
    'させぼ五郎丸 2020/05/20',
  ]
  const competition_results = []
  const offset = 1;
  mock_results.forEach((result, i) => {
    competition_results.push(<li>#{i + offset} {result}</li>)
  })
  
  return(
    <div>
      <h2>審査結果</h2>
      <ul>
        {competition_results}
      </ul>
    </div>
  );
}