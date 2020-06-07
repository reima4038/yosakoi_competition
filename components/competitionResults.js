import Link from 'next/link';

// 審査結果
export default function competitonResults({ judgements }) {

  const href = (id, title, judgerName) => {
    return ({
      pathname: '/result',
      query: { id: id, title: title, judgerName: judgerName }
    })
  };

  const offset = 1;
  const tags = []
  judgements.forEach((judgement, i) => {
    tags.push(<li><Link href={href(judgement.competitionID, judgement.title, judgement.judgerName)}><a>#{i + offset}{judgement.judgerName}</a></Link></li>)
  })

  
  return(
    <div>
      <h2>審査結果</h2>
      <ul>
        {tags}
      </ul>
    </div>
  );
}