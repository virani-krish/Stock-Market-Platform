import React from 'react'

const Team = () => {
  return (
    <div className='container pb-5 mb-5'>
      <hr />
      <h1 className='fs-3 text-center text-muted py-5'>People</h1>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-3">
          <img src="media/images/me2.png" alt="nithin" style={{ borderRadius: "100%", width: "110%"}} />
          <p className='text-center pt-2 text-muted'>Krish Virani</p>
        </div>
        <div className="col-5 ps-5">
          <p>Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.</p>
          <p>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>
          <p>Playing basketball is his zen.</p>
          <p>Connect on Homepage / TradingQnA / Twitter</p>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  )
}

export default Team