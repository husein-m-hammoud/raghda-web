import React, { useState } from 'react';
import { FaRegCopy, FaRegCheckCircle } from 'react-icons/fa';

const CopyableText = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000); // Reset copy state after 1 second
  };

  return (
    <div className="flex items-start gap-1 max-w-full">
      <span
        title={text}
        className="break-all line-clamp-3"
        dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }}
      ></span>
      <button onClick={copyToClipboard} className="shrink-0 mt-0.5">
        {isCopied ? <FaRegCheckCircle /> : <FaRegCopy />}
      </button>
    </div>
  );
};

export default CopyableText;
