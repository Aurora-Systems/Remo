export interface waitlist_individual_interface{
    title:string,
    first_name:string,
    last_name:string,
    date_of_birth:string,
    mobile_number:string,
    email:string,
    profession_category:string,
    profession:string,
    studying:"yes"|"no",
    country:string
}

export const waitlist_individual_default:waitlist_individual_interface={
    title:"",
    first_name:"",
    last_name:"",
    date_of_birth:"",
    mobile_number:"",
    email:"",
    profession_category:"",
    profession:"",
    studying:"no",
    country:""
}

export interface waitlist_company_interface{
    company_name:string,
    email:string,
    country:string,
    contact_number:string,
    hiring_interns:boolean,
    workforce:string,
    industry:string
}

export const waitlist_company_default:waitlist_company_interface={
    company_name:"",
    email:"",
    country:"",
    contact_number:"",
    hiring_interns:false,
    workforce:"",
    industry:""
}