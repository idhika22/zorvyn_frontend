import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
const Login=()=>{
    const navigate=useNavigate();

    const [name,setName]=useState("");
    const [password,setPassword]=useState("");

    const handleLogin=(e: React.SyntheticEvent<HTMLFormElement>)=>{
        e.preventDefault();
        localStorage.setItem("name",name);
        navigate('/dashboard');
    }

    return(
        <motion.div
       className="min-h-screen bg-dark flex flex-col items-center justify-center"
       initial={{ y: 100, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 1, ease: "easeOut" }}
       >
        <h1 className="text-5xl font-bold text-white mb-6 text-center">Welcome to <span className="text-primary">FinSight</span></h1>
        <div className="bg-accent p-8 rounded-2xl shadow-lg w-[350px]">
             <h1 className="text-2xl font-bold text-dark mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4" >
            <input
             placeholder="Name"
             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
             value={name}
             onChange={(e) => setName(e.target.value)}
             required
            />

            <input
             type="password"
             placeholder="Password"
             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
            />


            <button type="submit" className="w-full bg-primary text-dark font-semibold p-3 rounded-lg hover:opacity-90 transition">Login</button>
        </form>
        </div>
        </motion.div>
    );
};

export default Login