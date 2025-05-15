import { bg_img } from "./components/styles"

export default function Home() {
 return(
  <main className="">
    <div className="text-center d-flex justify-content-center align-items-center min-vh-100 h-100" style={bg_img("https://ngratesc.sirv.com/exalt/64570.jpg")}>
      <div className="d-flex justify-content-center flex-column text-center">
      <h1 className="p-text fw-bold display-1">Remo <br/> Redefining Remote Work</h1>
      </div>
    </div>
    <div className="container"> 
    <div className="row  mt-5 mb-5 h-50 w-100 align-content-center align-items-center ">
      <div className="col-sm mb-3">
        <img src="https://ngratesc.sirv.com/exalt/2147839979.jpg" width="650" className="img-fluid rounded"/>
      </div>
     <div className="col-sm">
      <h3 className="p-text fw-bold">Hire A Proffesional</h3>
      <p className="p-text">At Remo, we connect you with Vetted/Qualified Professionals. We do the hard work so you can have everything running smoothly</p>
     </div>
    </div>
    <div className="row mb-5  h-50 w-100 justify-content-center align-items-center ">
    <div className="col-sm order-md-2 mb-3">
        <img src="https://ngratesc.sirv.com/exalt/8953.jpg" width="650" className="img-fluid rounded"/>
      </div>
     <div className="col-sm">
      <h3 className="p-text fw-bold">Fair Compensation .</h3>
      <p className="p-text">Remo is focused on helping candidates receive fair compensation without hidden clauses. Making sure you get paid not exploited</p>
     </div>
     
    </div>
    <div className="p-5"> 
      <h1 className="text-center p-text display-1 fw-bold">We're Launching Soon ! </h1>
    </div>
    {/* <div className="row gap-2 align-items-center">
      <div className="col-sm  p-2 card-main mb-3">
          <img src="https://ngratesc.sirv.com/exalt/2147626421.jpg" className="img-fluid rounded mb-2"/>
          <h3 className="p-text">Qualified</h3>
          <p className="mb-3 text-white">Our talent pool consists of individuals who possess the necessary skills, education, and experience required for their respective roles. Each candidate undergoes a meticulous qualification process, ensuring they meet the industry standards and possess the technical proficiency needed to excel. We evaluate their certifications, degrees, and past job performances to ensure they bring a wealth of knowledge and expertise to your team.</p>
      </div>
      <div className="col-sm rounded mb-3 p-2 card-main">
        <img src="https://ngratesc.sirv.com/exalt/4686.jpg" className="img-fluid rounded mb-2"/>
          <h3 className="p-text">Vetted</h3>
          <p className="mb-3 text-white">We go beyond traditional hiring practices by implementing a thorough vetting process. This includes comprehensive background checks, detailed reference verifications, and skill assessments. Our aim is to ensure that each professional we recommend has a proven track record of reliability, integrity, and excellence. By scrutinizing every aspect of their professional history, we provide you with peace of mind knowing that you are hiring individuals who are not only talented but also trustworthy.</p>
      </div>
      <div className="col-sm rounded mb-3  p-2 card-main">
        <img src="https://ngratesc.sirv.com/exalt/2848.jpg" className="img-fluid rounded mb-2"/>
        <h3 className="p-text">Proffesional</h3>
        <p className="mb-3 text-white">Professionalism is at the core of what we do. Our candidates are not just skilled workers; they are ambassadors of your brand. We ensure that they exhibit the highest levels of professionalism in their conduct, communication, and collaboration. Whether they are engaging with clients, working with team members, or representing your company in any capacity, our professionals embody the values and standards of your business. We prioritize soft skills such as leadership, problem-solving, and adaptability to ensure they can thrive in dynamic work environments.</p>
      </div>

    </div> */}
    </div>
  </main>
 )
}
