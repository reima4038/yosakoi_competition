// 審査対象

export default function competitionTargets(props) {
  // 演舞動画リスト
  const movies_list = []
  props.movies.forEach(movie => {
    movies_list.push(<li>{movie}</li>)
  })
  
  return (
    <div>
        <h2>審査対象</h2>
        <ul>
          {movies_list}
        </ul>
    </div>
  )
}