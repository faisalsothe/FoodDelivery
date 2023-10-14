"use client"
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';


const ContactPage = () => {
      const form = useRef(null);

      const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        emailjs.sendForm("service_qne406j", 'template_w51iu28',form.current, '-690n2hqHlGQe75Rw')
          .then((result) => {
              toast.success("Message Sent",{position:"top-right"})
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
              toast.error(error.text,{position:"top-right"});
          });
      };
    
      return (
        <div className="bg-white text-red h-screen flex flex-col justify-center items-center">
          <h1 className="text-3xl text-red-500 font-bold mb-4">Contact Us</h1>
          <form ref={form} className="w-full max-w-md" onSubmit={sendEmail} method={'POST'}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-red-500 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-max appearance-none border rounded md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Name"
                required
                autoComplete="on"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-red-500 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-max appearance-none border rounded md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Email"
                required
                autoComplete="on"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-red-500 text-sm font-bold mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-max appearance-none border rounded md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Message"
                required
                autoComplete="on"
              />
            </div>
            <div className="flex items-center justify-center mb-4">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
              >
                send
              </button>
            </div>
          </form>
        </div>
  );
};

export default ContactPage;
