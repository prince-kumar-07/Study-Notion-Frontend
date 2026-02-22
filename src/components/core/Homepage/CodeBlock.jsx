import { useEffect, useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./codeblock.css";

const fullCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Learn coding with StudyNotion" />
  <title>StudyNotion | Learn to Code</title>
</head>

<body>

  <header class="navbar">
    <div class="logo">StudyNotion</div>
    <nav>
      <a href="#courses">Courses</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <button class="btn-primary">Sign Up</button>
    </nav>
  </header>

  <section class="hero">
    <h1>Unlock Your Coding Potential</h1>
    <p>Master web development, backend, and DevOps.</p>
  </section>

  <footer>
    <p>© 2026 StudyNotion. All rights reserved.</p>
  </footer>

</body>
</html>`;

function CodeBlock() {
  const [typedCode, setTypedCode] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedCode(fullCode.slice(0, index));
      index++;
      if (index > fullCode.length) clearInterval(interval);
    }, 12);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="code-wrapper neon-glow"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <SyntaxHighlighter
        language="html"
        style={vscDarkPlus}
        showLineNumbers={true}
        customStyle={{
          background: "transparent",
          margin: 0,
          padding: "30px",
        }}
      >
        {typedCode}
      </SyntaxHighlighter>
    </motion.div>
  );
}

export default CodeBlock;
