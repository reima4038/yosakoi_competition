// 審査結果集計

export default function competitionResultGraph() {
  const mock_titles = [
    '演舞動画タイトル1',
    '演舞動画タイトル2',
    '演舞動画タイトル3',
    '演舞動画タイトル4',
    '演舞動画タイトル5',
    '演舞動画タイトル6',
  ]
  const graph_items = []
  const offset = 1;
  mock_titles.forEach((title, i) => {
    graph_items.push(<li>({i + offset}) {title}</li>)
  })

  return (
    <div>
      <h2>審査結果集計</h2>
      [TODO] ここにグラフ
      <ul>
        {graph_items}
      </ul>
    </div>
  );
}