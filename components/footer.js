import React from 'react' 

class Footer extends React.Component {
  render() {
    return (
      <footer>
        (C) BambooShrine - {new Date().getFullYear()}
      </footer>
    )
  }
}

export default Footer