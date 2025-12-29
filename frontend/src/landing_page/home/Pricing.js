import React from 'react'

const Pricing = () => {
  return (
    <div className='container mt-5'>
      <div className="row pt-5">
        <div className="col-4 mt-5">
          <h2>Unbeatable pricing</h2>
          <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
          <a href="" style={{ textDecoration: "none" }}>See pricing<i class="fa-solid fa-arrow-right-long"></i></a>
        </div>
        <div className="col-2"></div>
        <div className="col-6 mt-5">
          <div className="row text-center">
            <div className="col p-4 border">
              <h1 className='mb-3'>₹0</h1>
              <p>Free equity delivery and<br /> direct mutual funds</p>
            </div>
            <div className="col p-4 border">
              <h1 className='mb-3'>₹20</h1>
              <p>Intraday and F&O</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing