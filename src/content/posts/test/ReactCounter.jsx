import { useState } from 'react';
import { useEffect } from 'react';
import './style.css'

export default function ReactCounter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter-container">
      <button 
        onClick={() => setCount(count + 1)}
        className="counter-button"
      >
        点击次数: {count}
      </button>
      &nbsp;
      <button 
        onClick={() => setCount(0)}
        className="counter-button"
      >
        清空
      </button>
      </div>
  );
}

// 样式可以添加到全局CSS或使用CSS模块
