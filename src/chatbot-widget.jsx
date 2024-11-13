import ReactDOM from 'react-dom';
import Chatbot from './components/Chatbot';
import './index.css';

const createChatbotWidget = () => {
  const container = document.createElement("div");
  container.id = "chatbot-root";
  document.body.appendChild(container);

  ReactDOM.render(<Chatbot />, container);  // JSX syntax should work fine here
};

window.createChatbotWidget = createChatbotWidget;
