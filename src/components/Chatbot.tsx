import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! Welcome to Khizar. How can I help you today?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickReplies = [
    'Track my order',
    'Size guide',
    'Return policy',
    'Contact support',
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: 'Thank you for your message! Our team will get back to you shortly. For immediate assistance, please call us at +1 (555) 123-4567.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInputValue('');
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-2xl flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(212, 175, 55, 0.5)',
            '0 0 40px rgba(255, 215, 0, 0.8)',
            '0 0 20px rgba(212, 175, 55, 0.5)',
          ],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
          },
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-24 left-6 z-40 w-80 md:w-96 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
            style={{ height: '500px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm text-primary-foreground">Khizar Support</h3>
                <p className="text-xs text-primary-foreground/80">Always here to help</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/20">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="p-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Quick replies:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-full text-xs transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
