"use client"
import Countdown from "react-countdown"

export default function LaunchDay(){
    const render=({days,hours,minutes,seconds,completed}:any)=>{
        if(completed){
            return (<h1>0.000 seconds, you can sign in now😉</h1>)
        }else{
            return(
                // change into
                <h1>
                    {days} Days<br/> {hours}  Hours <br/>{minutes} Minutes <br/>{seconds.length==1?`0${seconds}`:seconds} Seconds
                </h1>
            ) 
        }
    }
    return(
        <div className="container mb-5">
            <div className="row mt-5">
                <div className="col-sm">
                <h1 className="p-text mt-5">We are launching in</h1>
                <Countdown date={new Date("2024-08-01T00:00:00Z").getTime()} renderer={render}/>
                </div>
                <div className="col-sm">
                    <img src="https://ngratesc.sirv.com/exalt/undraw_Time_management_re_tk5w.png" className="img-fluid rounded"/>
                </div>
               
            </div>
            
        </div>
    )
}
