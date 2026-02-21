import React from 'react';
import {MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import './Home.css';
import { Link, useNavigate } from "react-router-dom";
import CTAButton from '../components/core/Homepage/CTAButton';
import TextBlock from '../components/core/Homepage/TextBlock';
import CodeBlock from '../components/core/Homepage/CodeBlock';
import bannerVideo from "../../assets/Images/banner.mp4";
import Footer from './Footer';
import Timeline from '../components/core/Homepage/Timeline';
import LearningLanguage from '../components/core/Homepage/LearningLanguage';
import Otherlernerreview from '../components/core/Homepage/Otherlearnerreview';
import InstructorSection from '../components/core/Homepage/InstructorSection';
import Explore from '../components/core/Homepage/Explore';
import usePageTitle from '../services/Oprations/Title/Title';




function Home() {
  usePageTitle("Home")

  const navigate = useNavigate()
  return (
    <div className="home">
      <div className="section-block-1">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="get-started-btn"
        >
          Get Started <MoveRight size={30} />
        </motion.button>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="tagline"
        >
          Empower Your Future with <span>Coding Skills</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="home-paragraph"
        >
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </motion.p>

        <div className="learn-and-bookdemo-div">
          <CTAButton text="Learn More" link="/learn-more" active={true} />
          <CTAButton text="Book a Demo" link="/book-demo" active={false} />
        </div>

        <div className="home-video-container">
          <motion.video
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="home-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={bannerVideo} type="video/mp4" />
          </motion.video>
        </div>

        <div className="section-2">
          <TextBlock
            btnText1="Try it yourself"
            btnText2="Learn More"
            btnLink1="/try-it-yourself"
            btnLink2="/learn-more"
            heading="Start coding in seconds"
            subheading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson. No setup, no downloads, just pure coding fun right in your browser."
          />

          <CodeBlock />
        </div>

        <div className="section-3">

          <CodeBlock />
          <TextBlock
            btnText1="Countinue Learning"
            btnText2="Learn More"
            btnLink1="/try-it-yourself"
            btnLink2="/learn-more"
            heading="Unlock your coding potential with our online courses."
            subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          />
          
        </div>
        <Explore />
      </div>

      <div className="section-block-2">

       <div className='learn-and-bookdemo-div'>
         <CTAButton text="Explore Full Catalog" link="/signup" active={true} />
         <CTAButton text="Learn More" link="/signup" active={false} />
       </div>

       <div className='text-para'>
        <p className='tag-text'>
          Get the skills you need for a job that is in deemand
        </p>

        <div className='div-4'>
          <p className='text'>
            The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills
          </p>
          <CTAButton text="Learn More" link="/signup" active={true} />
        </div>

       </div>

        <Timeline/>
        <LearningLanguage />
    
        </div>
        <InstructorSection />
        <Otherlernerreview />
      <Footer />
    </div>
  );
}

export default Home;