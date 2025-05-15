"use client"
import { FormEvent, useState } from "react"
import titles from "../db/titles.json"
import professions from "../db/office_proffesions.json"
import countries from "../db/countries.json"
import industries from "../db/industries.json"
import { PhoneInput } from "react-international-phone"
import {PhoneNumberUtil} from "google-libphonenumber"
import 'react-international-phone/style.css';
import { waitlist_company_default, waitlist_company_interface, waitlist_individual_default, waitlist_individual_interface} from "../db/schemas"
import { ToastContainer,toast } from "react-toastify"
import { is_password_strong } from "../components/scripts"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import {  doc, setDoc } from "firebase/firestore"
import { db,auth } from "../init/firebase"
import { useRouter } from "next/navigation"
import { unknown_error } from "../components/resusable_text"

export default function Waitlist() {
    const nav = useRouter()
    const [show_industries,set_show_industries] = useState<boolean>(false)
    const [loading, set_loading] =useState<boolean>(false)
    const [user_type, set_user_type] = useState<"individual" | "company">("individual")
    const [selected_profession,set_selected_profession] = useState<number>()
    const [selected_proffesion_category,set_selected_proffesion_category] = useState<number>()
    const [waitlist_individual,set_waitlist_individual] = useState<waitlist_individual_interface>(waitlist_individual_default)
    const [waitlist_company,set_waitlist_company] = useState<waitlist_company_interface>(waitlist_company_default)
    const [search_industry,set_search_industry] = useState<any>([])
    const [password,set_password] = useState({
        new_password:"",
        repeat_password:""
    })
    const handle_prefession_category = (index:number)=>{
        set_selected_proffesion_category(index)
        set_waitlist_individual({...waitlist_individual, profession_category:professions[index].Category})
    }

    const handle_individual_form=async(e:FormEvent)=>{
        e.preventDefault()
        set_loading(true)
        if(password.new_password!==password.repeat_password){
            set_loading(false)
            return toast("⚠️ Passwords don't match!")
        }

        if(!is_password_strong(password.new_password)){
            return toast("⚠️ Password isn't strong, should contain a special character and atleast one capital letter, minimum length of 8 and maximum length of 16")
        }
        // check if 
        if(selected_proffesion_category!==undefined){
            if(selected_proffesion_category !==selected_profession ){
                return toast("⚠️ Category and profession don't match!")
            }
        }
        try{
            const phoneUtil = PhoneNumberUtil.getInstance()
            const isValid = phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(waitlist_individual.mobile_number))
            if(!isValid){
           
                toast("⚠️ Please Enter A Valid Number")
              
                set_loading(false)
                return
               }
        }catch(error){
            toast("⚠️ Please Enter A Valid Number")
            set_loading(false)
            return
        }

        try{
            const data = {...waitlist_individual, type:"user"}
            const user =  await createUserWithEmailAndPassword(auth, waitlist_individual.email, password.new_password)
            const db_ref = doc(db,"users",user.user.uid)
            await setDoc(db_ref, data)
            await sendEmailVerification(user.user)
            nav.push("/confirm_email")
        }catch(error){
            set_loading(false)
            return toast(unknown_error)
        }


    }

    const handle_company_form=async(e:FormEvent)=>{
        e.preventDefault()
        set_loading(true)
        if(password.new_password!==password.repeat_password){
            set_loading(false)
            return toast("⚠️ Passwords don't match!")
        }
        if(!is_password_strong(password.new_password)){
            return toast("⚠️ Password isn't strong, should contain a special character and atleast one capital letter, minimum length of 8 and maximum length of 16")
        }
        try{
            const phoneUtil = PhoneNumberUtil.getInstance()
            const isValid = phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(waitlist_company.contact_number))
            if(!isValid){
           
                toast("⚠️ Please Enter A Valid Number")
              
                set_loading(false)
                return
               }
        }catch(error){
            toast("⚠️ Please Enter A Valid Number")
            set_loading(false)
            return
        }
        try{
            const user =  await createUserWithEmailAndPassword(auth, waitlist_company.email, password.new_password)
            const db_ref = doc(db,"users",user.user.uid)
            const data = {...waitlist_company, type:"company"}
            await setDoc(db_ref, data)
            await sendEmailVerification(user.user)
            nav.push("/confirm_email")
        }catch(error){
            set_loading(false)
            return toast(unknown_error)
        }
    }

    const clean_up=()=>{
        set_waitlist_individual(waitlist_individual_default)
        set_waitlist_company(waitlist_company_default)
        set_password({
            new_password:"",
            repeat_password:""
        })
    }

    const handle_hiring_interns=(value:string)=>{
        if(value==="yes"){
            set_waitlist_company({...waitlist_company, hiring_interns:true})
        }else{
            set_waitlist_company({...waitlist_company, hiring_interns:false})

        }
    }
   
    return (
        <div className="container mb-5">
            <div>
                <h1 className="p-text fw-bold">We are launching soon!</h1>
                <p>Sign Up for beta to get early access</p>
                <div className="d-flex flex-row align-items-center gap-1 mb-3">
                    <div>
                        <span>You are</span>
                    </div>
                    <div>
                        <select className="form-control" value={user_type} onChange={(e:any)=>set_user_type(e.target.value)}>
                            <option value="individual">looking to get hired</option>
                            <option value="company">looking to hire </option>
                        </select>
                    </div>
                </div>
                <div className="mt-3">
                    {
                        user_type === "individual" ?
                            <form onSubmit={(e)=>handle_individual_form(e)}>
                                <div className="row">
                                    <div className="col-sm mb-2">
                                        <span>Title</span>
                                        <select
                                            className="form-control"
                                            onChange={(e)=>{
                                                clean_up()
                                                set_waitlist_individual({...waitlist_individual, title:e.target.value})}
                                            }
                                            required
                                        >
                                            <option value="">Select Title</option>
                                            {
                                                titles.map((title, index) => {
                                                    return (
                                                        <option value={title.title} key={index}>{title.title}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-sm mb-2">
                                        <span>First Name</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="John"
                                            value={waitlist_individual.first_name}
                                            onChange={(e)=>set_waitlist_individual({...waitlist_individual, first_name:e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="col-sm mb-2">
                                        <span>Last Name</span>
                                        <input
                                            type=""
                                            className="form-control"
                                            placeholder="Doe"
                                            value={waitlist_individual.last_name}
                                            onChange={(e)=>set_waitlist_individual({...waitlist_individual, last_name:e.target.value})}
                                            required

                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm mb-2">
                                        <span>Date of Birth</span>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={waitlist_individual.date_of_birth}
                                            onChange={(e)=>set_waitlist_individual({...waitlist_individual, date_of_birth:e.target.value})}
                                            required

                                        />
                                    </div>
                                    <div className="col-sm mb-2">
                                        <span>Mobile Number</span>
                                        <PhoneInput
                                            className="w-100"
                                            defaultCountry="zw"
                                            value={waitlist_individual.mobile_number}
                                            onChange={(e)=>set_waitlist_individual({...waitlist_individual,mobile_number:e})}
                                            required
                                        />
                                    </div>
                                    <div className="col-sm mb-2">
                                        <span>Email</span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="johndoe@email.com"
                                            value={waitlist_individual.email}
                                            onChange={(e)=>set_waitlist_individual({...waitlist_individual, email:e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm mb-2">
                                        <span>Proffesion Category</span>
                                        <select     
                                            className="form-control"
                                            onChange={(e:any)=>handle_prefession_category(e.target.value)}
                                            required
                                        >
                                            <option>Select A category</option>
                                            {
                                                professions.map((category, index) => {
                                                    return (
                                                        <option value={index} key={index}>{category.Category}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-sm mb-2">
                                        <span>Proffesion</span>
                                        <select disabled={selected_proffesion_category===undefined?true:false} className="form-control"
                                            value={waitlist_individual.profession}
                                            onChange={
                                                (e)=>{
                                                    set_selected_profession(selected_proffesion_category)
                                                    set_waitlist_individual(
                                                        {
                                                            ...waitlist_individual, profession:e.target.value
                                                        }
                                                    );
                                                   
                                                    }
                                                }
                                                required
                                        >
                                            <option>Select a proffesion</option>
                                            {
                                                professions[selected_proffesion_category!==undefined?selected_proffesion_category:0].Professions.map((profession, index) => {
                                                    return (
                                                        <option value={profession} key={index}
                                                        onClick={()=>set_selected_proffesion_category(index)}
                                                        >{profession}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-sm mb-2">
                                        <span>Are you still studying for your profession?</span>
                                        <select className="form-control"
                                            value={waitlist_individual.studying}
                                            onChange={(e:any)=>{
                                                set_waitlist_individual({...waitlist_individual, studying:e.target.value})
                                            }
                                        }
                                        required
                                        >
                                            <option disabled>Select </option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm mb-2">
                                        <span>Country</span>
                                        <select 
                                            className="form-control" 
                                            onChange={(e)=>set_waitlist_individual({...waitlist_individual, country:e.target.value})}
                                            required
                                        >
                                            <option value="">Select Country</option>
                                            {
                                                countries.map((i,index:number)=>{
                                                    return(
                                                        <option key={index} value={i.country}>{i.country}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-sm mb-2">
                                        <span>Password</span>
                                        <input 
                                            type="password" 
                                            className="form-control"
                                            value={password.new_password}
                                            onChange={(e)=>set_password({...password, new_password:e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="col-sm mb-2">
                                        <span>Repeat Password</span>
                                        <input 
                                            type="password" 
                                            className="form-control"
                                            value={password.repeat_password}
                                            onChange={(e)=>set_password({...password, repeat_password:e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <input type="checkbox" className="form-check-input" required/>
                                    <span> You agree to our <a href="/terms_and_conditions" className="pointer"><u>terms and conditions</u></a></span>
                                </div>
                                <div className="mb-2">
                                    <button className="btn p-btn text-white" disabled={loading} type="submit">{loading?"loading..":"Register"}</button>
                                </div>
                            </form>
                            :
                            <form onSubmit={handle_company_form}>
                                <div className="row">
                                    <div className="col-sm mb-2">
                                        <span>Full Company Name</span>
                                        <input 
                                            type="text" 
                                            placeholder="John Doe Pvt LTD"
                                            className="form-control"
                                            value={waitlist_company.company_name}
                                            onChange={(e)=>set_waitlist_company({...waitlist_company,company_name:e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="col-sm mb-2">
                                        <span>Email</span>
                                        <input 
                                            type="email" 
                                            placeholder="john@thecompany.com"
                                            className="form-control"
                                            value={waitlist_company.email}
                                            onChange={(e)=>set_waitlist_company({...waitlist_company,email:e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="col-sm mb-2">
                                        <span>Contact Number</span>
                                        <PhoneInput
                                            placeholder="+263 ** *** ***"
                                            defaultCountry="zw"
                                            value={waitlist_company.contact_number}
                                            onChange={(e)=>set_waitlist_company({...waitlist_company,contact_number:e})}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                <div className="col-sm mb-2">
                                        <span>Country</span>
                                        <select 
                                            className="form-control" 
                                            onChange={(e)=>set_waitlist_company({...waitlist_company, country:e.target.value})}
                                            required
                                        >
                                            <option value="">Select Country</option>
                                            {
                                                countries.map((i,index:number)=>{
                                                    return(
                                                        <option key={index} value={i.country}>{i.country}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-sm mb-2">
                                        <span>Industry</span>
                                        <select 
                                            className="form-control"
                                            onChange={(e)=>set_waitlist_company({...waitlist_company,industry:e.target.value})}
                                        >
                                            <option value="">Select Industry</option>
                                            {
                                                industries.map((i,index:number)=>{
                                                    return(
                                                        <option key={index} value={i.industry}>{i.industry}</option>
                                                    )
                                                })
                                            }
                                        </select>     
                                    </div>
                                    <div className="col-sm mb-2">
                                        <span>Workforce</span>
                                        <select className="form-control" onChange={(e)=>set_waitlist_company({...waitlist_company,workforce:e.target.value})} required>
                                            <option value="">Select Workforce</option>
                                            <option value="basic" >0-50</option>
                                            <option value="standard">51-300</option>
                                            <option value="premium">300+</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-sm">
                                        <span>Hiring Interns?</span>
                                        <select 
                                            onChange={(e)=>handle_hiring_interns(e.target.value)}
                                            className="form-control" 
                                            required
                                        >
                                            <option value="">Select Option</option>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                        <div className="col-sm mb-2">
                                            <span>Password</span>
                                            <input 
                                                className="form-control" 
                                                type="password" 
                                                value={password.new_password} 
                                                onChange={(e)=>set_password({...password, new_password:e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="col-sm mb-2">
                                            <span>Repeat Password</span>
                                            <input 
                                                className="form-control" 
                                                type="password" 
                                                value={password.repeat_password} 
                                                onChange={(e)=>set_password({...password, repeat_password:e.target.value})}
                                                required
                                            />
                                        </div>
                                        
                                </div>
                                <div className="mb-2">
                                    <input type="checkbox" className="form-check-input me-2" required/>
                                    <span>You agree to our <a href="/terms_and_conditions"><u>terms and conditions</u></a></span>
                                </div>
                                <div className="mb-2">
                                    <button className="btn p-btn text-white" disabled={loading} type="submit">{loading?<div className="loader"></div>:<span className="d-flex justify-content-between">Register <i className="bi bi-person-plus"></i></span>}</button>
                                </div>                                
                            </form>
                    }
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}