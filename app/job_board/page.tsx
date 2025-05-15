import Link from "next/link";

export default function JobBoard(){
    return(
        <div className="vh-100 container d-flex  justify-content-center align-items-center">
            <div>
            <h1 className="display-1 fw-bold p-text">
                We are launching soon!
            </h1>
            <h5>Sign up for beta to get early access</h5>
            <Link href="/waitlist"><button className="btn p-btn text-white"><span className="d-flex justify-content-between">Sign Up <i className="bi bi-person-plus"></i></span></button></Link>
            </div>
          
        </div>
    )
}