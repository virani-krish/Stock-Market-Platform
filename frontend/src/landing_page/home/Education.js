import React from 'react'

const Education = () => {
  return (
    <div className='container mt-5'>
      <div className="row pt-5">
        <div className="col-6 mt-5">
          <img src="media/images/education.svg" alt="" />
        </div>

        <div className="col-6 mt-5">
          <div className='pt-5'>
            <h2 className='mb-5'>Free and open market education</h2>
            <p>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
            <a href="" style={{ textDecoration: "none" }}>Varsity<i className="fa-solid fa-arrow-right-long"></i></a>
          </div>
          <div className='mt-5'>
            <p>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
            <a href="" style={{ textDecoration: "none" }}>TradingQ&A<i className="fa-solid fa-arrow-right-long"></i></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Education