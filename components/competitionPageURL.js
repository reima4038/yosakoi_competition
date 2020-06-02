// 審査ページURLのコンポーネント

export default function CompetitionPageURL(props) {

  return(
    <div>
      <input type="text" value={'http://competitions/' + props.competitionID} />
    </div>
  );
}