import { useState, useEffect } from 'react'
import db from '../lib/db'
// import { getTargets } from '../lib/competitionsDAO'
import { getTargets } from '../lib/mockCompetitionsDAO'

// 審査対象
export default function competitionTargets({ targets }) {

  const tags = [];
  targets?.forEach(target => {
    tags.push(<li key={target.videoID}>{target.title}</li>)
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