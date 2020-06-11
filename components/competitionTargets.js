import { useState, useEffect } from 'react'
import db from '../lib/db'
// import { getTargets } from '../lib/competitionsDAO'
import { getTargets } from '../lib/mockCompetitionsDAO'

// 審査対象
export default function competitionTargets({ targets }) {

  const tags = [];
  const baseurl = 'https://www.youtube.com/watch?v=';
  targets?.forEach(target => {
    tags.push(<li key={target.videoID}><a href={baseurl + target.videoID}>{target.title}</a></li>)
  });

  return (
    <div>
        <h2>審査対象</h2>
        <ul>
          {tags}
        </ul>
    </div>
  )
}