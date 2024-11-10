import React from 'react'
import "../Styles/Error.css"
function Error() {
    return (
        <div className='body'>
        <div className="containers">
          <h1>404 Not Found</h1>
          <p>The page you're looking for cannot be found.</p><br/>
          <a href="/" className="button">Home</a>
        </div>
        </div>
      );
}

export default Error