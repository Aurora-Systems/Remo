"use client"
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "../init/firebase"
import { ToastContainer, toast } from "react-toastify"
import { Modal } from "react-bootstrap"
import { unknown_error } from "../components/resusable_text"


export default function Account(){
    const nav = useRouter()
    const [reset_email,set_reset_email] = useState<string>("")
    const [show,set_show] = useState<boolean>(false)
    const [loading,set_loading] = useState<boolean>(false)
    const [credential,set_credential] = useState({email:"",password:""})
    const handle_signin=async(e:FormEvent)=>{
        e.preventDefault()
        set_loading(true)
        try{
            const user = await signInWithEmailAndPassword(auth, credential.email,credential.password)
            if(user.user.emailVerified){
                nav.push("launch_day")
            }else{
                nav.push("confirm_email")
            }

        }catch(error){
            toast("⚠️ Please make sure you entered the correct details!")
        }finally{
            set_loading(false)
        }

    }

    const handle_password_reset=async(e:FormEvent)=>{
        e.preventDefault()
        set_loading(true)
        try{
            await sendPasswordResetEmail(auth, reset_email)
            toast("✅ A link to reset your password has been sent to your email!")
            set_show(false)
        }catch(error){
            toast(unknown_error)
        }finally{
            set_loading(false)
        }
    }

    return(
        <div className="container mb-5">
            <div className="row">
            <div className="mt-5 col-sm">
                <form onSubmit={handle_signin}>
                <div>
                <h1 className="p-text ">Welcome back!</h1>
                <p>Sign in into your account</p>
                </div>
                <div className="mb-2">
                    <span>Email</span>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="john@doe.com"
                        value={credential.email}
                        onChange={(e)=>set_credential({...credential, email:e.target.value})}
                    />
                </div>
                <div className="mb-2">
                    <span>Password</span>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="its_too_complex_too_guess"
                        value={credential.password}
                        onChange={(e)=>set_credential({...credential, password:e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <button className=" btn p-btn text-white" disabled={loading}>{loading?<div className="loader"></div>:<span className="d-flex justify-content-between">Sign In <i className="bi bi-key"></i></span>}</button>
                </div>
                <div>
                    <p ><a className="p-text pointer" onClick={()=>set_show(true)}>Forgot your password?</a> | <a href="/waitlist">Create Account</a></p>
                </div>
                </form>
            </div>
            <div className="col-sm">
<img className="img-fluid rounded" src="https://ngratesc.sirv.com/exalt/undraw_Fingerprint_login_re_t71l.png"/>
            </div>
            </div>
            <Modal centered show={show} size="sm">
                <Modal.Body>
                    <form onSubmit={handle_password_reset}>
                        <h4 className="p-text d-flex justify-content-between">Enter your email. <span className="text-danger" onClick={()=>set_show(false)}><i className="bi bi-x-circle"></i></span></h4>
                        <input 
                            type="email" 
                            className="form-control mb-2" 
                            placeholder="john@doe.com"
                            onChange={(e)=>set_reset_email(e.target.value)}
                        />
                            <button type="submit" className="btn text-white p-btn">
                                {
                                    loading?
                                    <div className="loader"></div>
                                    :
                                    <span className="d-flex justify-content-between">Reset Password <i className="bi bi-key"></i></span>
                                }
                            </button>
                        </form>
                </Modal.Body>
            </Modal>
            <ToastContainer/>
        </div>
    )
}
