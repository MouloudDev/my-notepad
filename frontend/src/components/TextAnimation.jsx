import { useEffect, useRef, useState } from 'react';

const textArr = [
  "Our notepad app makes it easy to quickly jot down, organize, and access your ideas whenever inspiration strikes.",
  "Take notes effortlessly with our intuitive interface and powerful organization tools.",
  "Stay productive and never lose an important thought again."
];

export default function TextAnimation() {
  const movingTxtRef = useRef(null);
  const [currTextIdx, setCurrTextIdx] = useState(0);

  const getLines = (maxWidth, text, font) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = font;

    let words = text.split(' ');
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      let word = words[i];
      let width = ctx.measureText(currentLine + " " + word).width;

      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const animateLine = async (text, element) => {
    return new Promise(resolve => {
      let index = 0;
      const chars = [...text];
      element.textContent = '';

      const intervalId = setInterval(() => {
        if (index < chars.length) {
          element.textContent = chars.slice(0, index + 1).join('');
          index++;
        } else {
          clearInterval(intervalId);
          resolve();
        }
      }, 50);
    });
  };

  useEffect(() => {
    const textHolder = movingTxtRef.current;
    if (!textHolder) return;

    let isActive = true;
    let currentAnimation = null;

    const calculateAndSetHeight = () => {
      const computedStyle = window.getComputedStyle(textHolder);
      const font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const txtWidth = textHolder.getBoundingClientRect().width;

      // Find the text that will need the most lines
      const maxLines = Math.max(...textArr.map(text =>
        getLines(txtWidth, text, font).length
      ));

      // Set the height
      textHolder.style.height = `${maxLines * lineHeight}px`;

      return { font, lineHeight, txtWidth };
    };

    const runAnimation = async () => {
      if (!isActive) return;

      const { font, txtWidth } = calculateAndSetHeight();
      const text = textArr[currTextIdx];
      const lines = getLines(txtWidth, text, font);

      // Clear previous content
      while(textHolder.firstChild) {
        textHolder.removeChild(textHolder.firstChild);
      }

      // Store the promise in currentAnimation
      currentAnimation = (async () => {
        // Animate each line
        for (let i = 0; i < lines.length; i++) {
          if (!isActive) return;
          const span = document.createElement('span');
          span.style.display = 'block';
          textHolder.appendChild(span);
          await animateLine(lines[i], span);
        }

        // Wait before starting next animation
        if (isActive) {
          await new Promise(res => setTimeout(res, 3000));
          if (isActive) {
            setCurrTextIdx(prev => (prev === textArr.length - 1 ? 0 : prev + 1));
          }
        }
      })();

      await currentAnimation;
    };

    // Debounce function for resize handler
    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    // Handle resize
    const handleResize = debounce(() => {
      if (currentAnimation) {
        // Reset the animation
        while(textHolder.firstChild) {
          textHolder.removeChild(textHolder.firstChild);
        }
        runAnimation();
      }
    }, 250);

    window.addEventListener('resize', handleResize);
    runAnimation();

    return () => {
      isActive = false;
      window.removeEventListener('resize', handleResize);
    };
  }, [currTextIdx, textArr]);

  return (
    <p
      ref={movingTxtRef}
      className="text-[#dcdcdc] font-normal text-xl text-center sm:text-left w-[80%] sm:w-[60%] mx-auto sm:mx-0 mb-6"
    ></p>
  );
}
