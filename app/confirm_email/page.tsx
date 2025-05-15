"use client"
import {auth} from "../init/firebase"
import { sendEmailVerification } from "firebase/auth"
import { ToastContainer,toast } from "react-toastify"
import { unknown_error } from "../components/resusable_text"
import { useState } from "react"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
export default function ConfirmEmail(){
    const nav = useRouter()
    const [loading,set_loading] = useState<boolean>(false)
    const send_email_confirmation=async()=>{
        set_loading(true)
        if(auth.currentUser){
            try{
               await sendEmailVerification(auth.currentUser)
               toast("✅ Verification email sent!")
            }catch(error){
                toast(unknown_error)
            }finally{
                set_loading(false)
            }
        }else{
            toast("You aren't signed in. Sign in to verify your email!")
        }
    }

    const already_confirmed=async()=>{
        if(auth.currentUser==null){
            await signOut(auth)
            nav.push("/account")
        }else{
            nav.push("/account")
        }
    }
    return(
        <div className="container mt-5 mb-5">
            <div className="mt-5 row">
                <div className="col-sm mt-5 mb-3">
                <h1 className="p-text mt-5">Confirm your email</h1>
            <p>Check your inbox/spam folder for the verification email we sent you!</p>
            <div className="d-flex flex-row flex-wrap gap-2 ">
                <button onClick={send_email_confirmation} className="btn p-btn text-white text-start">{loading?<div className="loader"></div>:"Send Again"}</button>
                <button onClick={already_confirmed} className="btn p-btn text-white text-start">Already confirmed</button>
            </div>
            </div>
            <div className="col-sm ">
                <img src="https://ngratesc.sirv.com/exalt/undraw_Opened_re_i38e.png" className="img-fluid rounded" alt="image of a letter in an envelop"/>
            </div>
            </div>
        <ToastContainer/>
        </div>
    )
}