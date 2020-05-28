export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  if (req.method == 'GET') {
    res.end(JSON.stringify({ method: 'GET' }))      
  } else {
    res.end(JSON.stringify({ method: 'POST' }))
  }
}