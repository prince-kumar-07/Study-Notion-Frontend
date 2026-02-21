
import { motion } from "framer-motion";
import './Ctabutton.css';
import { useNavigate } from "react-router-dom";
import {MoveRight } from "lucide-react";

function CTAButton({text, link, active}) {

    const navigate = useNavigate()

    return (<>

    <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className= {active ? "white-btn" : "blue-btn"}
            onClick={() => navigate(link)}
          >
            {text}
             {
              active && <MoveRight size={20} />
             }
          </motion.button>
    </>)
}

export default CTAButton;