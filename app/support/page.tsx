"use client"
import { useState, useRef, FormEvent } from "react";
import { PhoneInput } from "react-international-phone";
import emailjs from "@emailjs/browser"
import { ToastContainer, toast } from "react-toastify";

export default function Support() {
    const [loading, set_loading] = useState<boolean>(false)
    const form: any = useRef(null)
    const sendEmail = (e: FormEvent) => {
        e.preventDefault();
        set_loading(true)
        emailjs
            .sendForm('service_zqhjr5l', 'template_8jax61k', form.current, {
                publicKey: 'GKPYzSLir6JMsOzah',
            })
            .then(
                () => {
                    toast("✅ Message Sent!");
                    form.current.reset()
                    set_loading(false)
                },
                (error) => {
                    toast("⚠️ Message not sent, please try agan!");
                    set_loading(false)
                },
            );
    };
    return (
        <div className="container mt-5 mb-5">
            <form ref={form} onSubmit={sendEmail}>

                <div className="row ">

                    <div className="col-sm  mb-4">
                        <div>
                            <h1 className="p-text display-1 fw-bold">Support</h1>
                            <p>Send us a message and we will get in touch ASAP!</p>
                        </div>
                        <div className="mb-2">
                            <span>Name</span>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <span>Email</span>
                            <input
                                type="email"
                                name="email"
                                required
                                className="form-control"
                                placeholder="john@doe.com"
                            />
                        </div>
                        <div className="mb-2">
                            <span>Message</span>
                            <textarea
                                name="message"
                                className="form-control"
                                placeholder="Hi, I need assistance with..."
                                required
                            ></textarea>
                        </div>
                        <div>
                            <button type="submit" disabled={loading} className="btn text-white p-btn">{loading ? <div className="loader"></div> : <span className="d-flex justify-content-between">Send <i className="bi bi-send"></i></span>}</button>
                        </div>
                    </div>
                    <div className="col-sm">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.7359223020458!2d31.040485709006287!3d-17.8041039830856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a50d113d919d%3A0x5d4522fee5c535b0!2s17%20Phillips%20Ave%2C%20Harare!5e0!3m2!1sen!2szw!4v1717491941451!5m2!1sen!2szw" className="img-fluid w-100 h-100 rounded"  style={{ border: 0 }} loading="lazy" ></iframe>
                    </div>
                </div>
            </form>
            <ToastContainer progressClassName={"toastify-background-progress"} />
        </div>
    )
}