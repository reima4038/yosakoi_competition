import Link from 'next/link'

class LatestCompetitions extends React.Component {
  render() {
    return (
      <ul>
        <li><Link href='/competition'><a>YOSAKOIソーラン祭り 審査ブロック１</a></Link></li>
        <li>YOSAKOIソーラン祭り 審査ブロック２</li>
        <li>YOSAKOIソーラン祭り 審査ブロック３</li>
        <li>YOSAKOIソーラン祭り 審査ブロック４</li>
        <li>YOSAKOIソーラン祭り 審査ブロック５</li>
      </ul>
    )
  }
}

export default LatestCompetitions;