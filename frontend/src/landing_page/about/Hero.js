import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='container'>
      <div className="row my-5 py-5">
        <div className="col-3"></div>
        <div className="col">
          <h1 className='fs-3 text-muted pb-5'>We pioneered the discount broking model in India.
            Now, we are breaking ground with our technology.</h1>
        </div>
        <div className="col-3"></div>
        <hr className='my-5' />
      </div>
      <div className="row mb-5 pb-5">
        <div className="col-1"></div>
        <div className="col">
          <p className='text-muted' style={{fontSize: "20px"}}>We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology. We named the company Zerodha, a combination of Zero and "Rodha", the Sanskrit word for barrier.</p>
          <p className='text-muted' style={{fontSize: "20px"}}>Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.</p>
          <p className='text-muted' style={{fontSize: "20px"}}>Over 1.6+ crore clients place billions of orders every year through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.</p>
        </div>
        <div className="col">
          <p className='text-muted' style={{fontSize: "20px"}}>In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.</p>
          <p className='text-muted' style={{fontSize: "20px"}}><Link style={{textDecoration: "none"}}>Rainmatter</Link>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.</p>
          <p className='text-muted' style={{fontSize: "20px"}}>And yet, we are always up to something new every day. Catch up on the latest updates on our <Link style={{textDecoration: "none"}}>blog</Link> or see what the media is <Link style={{textDecoration: "none"}}>saying about us</Link> or learn more about our business and product <Link style={{textDecoration: "none"}}>philosophies</Link>.</p>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  )
}

export default Hero