import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Page5 = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/mshikhar353@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.purpose,
          _subject: `New Portfolio Message from ${data.name}`,
          _honey: data._honey,
          _captcha: "false"
        })
      });

      if (response.ok) {
        setShowSuccess(true);
        reset();
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        alert('Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Error sending message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0817] text-white flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Some cool background effect to match the theme */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-fuchsia-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-orange-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-5xl z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left Col: Contact Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500">
            Let's Collaborate
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-md">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
          
          <div className="space-y-6">
            <a href="mailto:mshikhar353@gmail.com" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-pink-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Email</p>
                <p className="text-lg text-white">mshikhar353@gmail.com</p>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/shikharmishra007" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">LinkedIn</p>
                <p className="text-lg text-white">linkedin.com/in/shikharmishra007</p>
              </div>
            </a>
            <a href="https://github.com/shikharcode-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">GitHub</p>
                <p className="text-lg text-white">github.com/shikharcode-dev</p>
              </div>
            </a>
          </div>
        </div>

        {/* Right Col: Form */}
        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input type="text" name="_honey" style={{ display: 'none' }} {...register("_honey")} />
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
              <input 
                {...register("name", { required: true })} 
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                placeholder="John Doe"
              />
              {errors.name && <span className="text-red-500 text-sm mt-1">Name is required</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
              <input 
                type="email"
                {...register("email", { required: true })} 
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                placeholder="john@example.com"
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">Email is required</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Purpose / Message</label>
              <textarea 
                {...register("purpose", { required: true })} 
                rows="4"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors resize-none"
                placeholder="How can we help each other?"
              ></textarea>
              {errors.purpose && <span className="text-red-500 text-sm mt-1">Message is required</span>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl text-white font-bold tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50">
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
        
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#131124] border border-white/10 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center relative overflow-hidden transform transition-all">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-pink-500"></div>
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-white mb-3">Thank You!</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Your message has been securely delivered to my inbox. I'll get back to you as soon as possible!
            </p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page5;
