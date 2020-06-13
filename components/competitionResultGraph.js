import { Bar } from 'react-chartjs-2';

// 審査結果集計
export default function competitionResultGraph({ targets, judgements }) {
  const graph_items = []
  const offset = 1;
  let graphData = [];

  targets.forEach((target, i) => {
    graph_items.push(<li>({i + offset}) {target['title']}</li>)
    graphData.push({title: target.title, videoID: target.videoID, smile: 0, heat: 0, oneness: 0});
  })

  for(let i = 0; i < graphData.length; i++) {
    judgements.flatMap(j => j.target)
      .forEach(t => {
        if (graphData[i]['videoID'] == t['videoID']) {
          graphData[i] = Object.assign(graphData[i], {
            smile: parseInt(graphData[i]['smile']) + parseInt(t['smile']),
            heat: parseInt(graphData[i]['heat']) + parseInt(t['heat']),
            oneness: parseInt(graphData[i]['oneness']) + parseInt(t['oneness'])
          });
        }
      })
  }

  const data = {
    labels: graphData.map(g => g.title),
    datasets: [
      {
        label: "笑顔",
        data: graphData.map(g => g.smile),
        backgroundColor: "#ffe600",
      },
      {
        label: "熱量",
        data: graphData.map(g => g.heat),
        backgroundColor: "#ff2600",
      },
      {
        label: "一体感",
        data: graphData.map(g => g.oneness),
        backgroundColor: "#0d0803",
      },
      ]
    }
  const options = {
    // 凡例
    legend: {
      position: 'right'
    },
    // レスポンシブ（true だとサイズ自動調整）
    responsive: false,
    scales: {
      // X軸
      xAxes: [{
        scaleLabel: {
          display: true,
          fontColor: "#999",
          //labelString: "Sales Quantity"
        },
        stacked: true,
        ticks: {
          // 下記のように固定値ではなく、
          // データに応じて算出するのがいいと思います
          max: 24,
          stepSize: 4,
        }
      }],
      // Y軸
      yAxes: [{
        stacked: true
      }]
    }
  };

  return (
    <div>
      <h2>審査結果集計</h2>
      <Bar
        data={data}
        width={500}
        height={300}
        options={options}
      />

      <ul>
        {graph_items}
      </ul>
    </div>
  );
}