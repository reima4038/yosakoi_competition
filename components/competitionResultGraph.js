import { Bar } from 'react-chartjs-2';
import {
  Box, Container,
  List, ListItem, ListItemText,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
  chart: {
    paddingTop: '16px',
    marginLeft: '-16px'
  }
})

// 審査結果集計
export default function competitionResultGraph({ targets, judgements }) {
  const classes = useStyle();
  
  const graph_items = []
  const offset = 1;
  let graphData = [];

  targets.forEach((target, i) => {
    graph_items.push(<ListItem><ListItemText>({i + offset}) {target['title']}</ListItemText></ListItem>)
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
      position: 'top'
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
          stepSize: 5,
        }
      }],
      // Y軸
      yAxes: [{
        stacked: true
      }]
    }
  };

  return (
    <Box>
      <Typography variant="h6">審査結果集計</Typography>
      <Container maxWidth="md" className={classes.chart}>
        <Bar
          data={data}
          width={350}
          height={400}
          options={options}
        />
      </Container>
      <List>
        {graph_items}
      </List>
    </Box>
  );
}