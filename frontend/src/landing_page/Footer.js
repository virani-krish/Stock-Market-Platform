import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-3">
          <img src="media/images/logo.svg" alt="Logo" style={{ width: "50%" }} className='mb-4' />
          <p style={{ fontSize: "14px" }}>© 2010 - 2025, Zerodha Broking Ltd.</p>
          <p style={{ fontSize: "14px" }}>All rights reserved.</p>
          <div>
            <i className="fa-brands fa-x-twitter fs-4 text-muted m-2"></i>
            <i className="fa-brands fa-facebook fs-4 text-muted m-2"></i>
            <i className="fa-brands fa-instagram fs-4 text-muted m-2"></i>
            <i className="fa-brands fa-linkedin-in fs-4 text-muted m-2"></i>
          </div>
          <hr />
          <div>
            <i className="fa-brands fa-youtube fs-5 text-muted m-2"></i>
            <i className="fa-brands fa-whatsapp fs-5 text-muted m-2"></i>
            <i className="fa-brands fa-telegram fs-5 text-muted m-2"></i>
          </div>
        </div>
        <div className="col">
          <p>Account</p>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Open demat account</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Minor demat account</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>NRI demat account</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Commodity</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Dematerialisation</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Fund transfer</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>MTF</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Referral program</Link></div>
        </div>
        <div className="col">
          <p>Support</p>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Contact us</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Support portal</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>How to file a complaint?</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Status of your complaints</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Bulletin</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Circular</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Z-Connect blog</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Downloads</Link></div>
        </div>
        <div className="col">
          <p>Company</p>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>About</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Philosophy</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Press & media</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Careers</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Zerodha Cares (CSR)</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Zerodha.tech</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Open source</Link></div>
        </div>
        <div className="col">
          <p>Quick links</p>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Upcoming IPOs</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Brokerage charges</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Market holidays</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Economic calendar</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Calculators</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Markets</Link></div>
          <div className="mt-3"><Link to="" style={{ textDecoration: "none" }} className='text-muted'>Sectors</Link></div>
        </div>
      </div>

      <p className='text-muted mt-5' style={{fontSize: "12px"}}>Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF</p>

      <p className='text-muted' style={{fontSize: "12px"}}>Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances</p>

      <p className='text-muted' style={{fontSize: "12px"}}>Smart Online Dispute Resolution | Grievances Redressal Mechanism</p>

      <p className='text-muted' style={{fontSize: "12px"}}>Investments in securities market are subject to market risks; read all the related documents carefully before investing.</p>

      <p className='text-muted' style={{fontSize: "12px"}}>Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.</p>

      <p className='text-muted' style={{fontSize: "12px"}}>India's largest broker based on networth as per NSE. NSE broker factsheet</p>

      <p className='text-muted' style={{fontSize: "12px"}}>"Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please create a ticket here.</p>

      <p className='text-muted' style={{fontSize: "12px"}}>*Customers availing insurance advisory services offered by Ditto (Tacterial Consulting Private Limited | IRDAI Registered Corporate Agent (Composite) License No CA0738) will not have access to the exchange investor grievance redressal forum, SEBI SCORES/ODR, or arbitration mechanism for such products.</p>

      <div className='d-flex'>
        <p><Link to="" className='text-muted mx-3' style={{textDecoration: "none", fontSize: "14px"}}>NSE</Link></p>
        <p><Link to="" className='text-muted mx-3' style={{textDecoration: "none", fontSize: "14px"}}>BSE</Link></p>
        <p><Link to="" className='text-muted mx-3' style={{textDecoration: "none", fontSize: "14px"}}>MCX</Link></p>
        <p><Link to="" className='text-muted mx-3' style={{textDecoration: "none", fontSize: "14px"}}>Terms & conditions</Link></p>
        <p><Link to="" className='text-muted mx-3' style={{textDecoration: "none", fontSize: "14px"}}>Policies & procedures</Link></p>
        <p><Link to="" className='text-muted mx-3' style={{textDecoration: "none", fontSize: "14px"}}>Privacy policy</Link></p>
        <p><Link to="" className='text-muted mx-3' style={{textDecoration: "none", fontSize: "14px"}}>Disclosure</Link></p>
        <p><Link to="" className='text-muted mx-3' style={{textDecoration: "none", fontSize: "14px"}}>For investor's attention</Link></p>
        <p><Link to="" className='text-muted mx-3' style={{textDecoration: "none", fontSize: "14px"}}>Investor charter</Link></p>
      </div>

    </div>
  )
}

export default Footer