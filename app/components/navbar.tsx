import Link from "next/link"
export function Navbar(){
    return(
            <nav className="d-flex justify-content-between p-3 s-bg">
                <div>
                <h4 className="fw-bolder p-text">Remo</h4>
                </div>
                <div className="d-flex gap-2 fs-7 align-items-center">
                    <Link href="mailto:info@remo-global.com">info@remo-global.com</Link>
                    {/* <Link href="/">Home</Link>
                    <Link href="/job_board">Job Board</Link>
                    <Link href="/support">Support</Link>
                    <Link href="/account">Account</Link> */}
                </div>
            </nav>
    )
}

export function Footer(){
    return(
        <div className="container">
            <div className="row">

            <div className="col-sm mb-3 text-white">
            <h5 className="p-text">Get in touch</h5>
            <p >Tel : +263773611545</p>
            <p >Whatsapp : +447722523935</p>

            <p>info@remo-global.com</p>
            </div>
            <div className="col-sm mb-3 text-white">
                <h5 className="p-text">Legal</h5>
                <p><Link href="https://startup.co.zw">StartUp</Link></p>
                <p><Link href="/privacy_policy">Privacy Policy</Link></p>
                <p><Link href="/terms_and_conditions">Terms and Conditions</Link></p>
                <p>{new Date().getFullYear()} © Remo</p>
            </div>
            <div className="col-sm">
                <h1 className="display-2 mt-5 p-text fw-bold">
                    Remo
                </h1>
            </div>
            </div>

            
        </div>
    )
}