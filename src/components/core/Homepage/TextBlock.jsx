import './textblock.css';
import CTAButton from './CTAButton';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";


function TextBlock({ heading, subheading, btnText1, btnLink1, btnText2, btnLink2 }) {
  return (
    <div className="text-content">
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-block-heading"
      >
        {heading}
      </motion.h2>

      <p className="text-block-subheading">
        {subheading}
      </p>

      <div className="btn-div">
        <CTAButton text={btnText1} link={btnLink1} active={true} />
        <CTAButton text={btnText2} link={btnLink2} active={false} />
      </div>

    </div>
  );
}


export default TextBlock;

