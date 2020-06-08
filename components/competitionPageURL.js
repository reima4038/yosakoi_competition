// 審査ページURLのコンポーネント

export default function CompetitionPageURL(props) {
  const baseUrl = 'http://competitions/';
  return(
    <div>
      <input type="text" value={baseUrl + props.competitionID} />
    </div>
  );
}