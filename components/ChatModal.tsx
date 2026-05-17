"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, X, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'

interface ChatModalProps {
  onClose: () => void;
}

const ChatModal = ({ onClose }: ChatModalProps) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Leave any questions to clarify in your language. I will try my best to answer it. ' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { generateResponse } = await import('@/app/actions/chat');

      const response = await generateResponse([...messages, userMessage]);

      if (response.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
      } else if (response.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: response.content }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={cn(
      "w-[340px] sm:w-[380px] h-[550px] shadow-2xl border-border flex flex-col overflow-hidden",
      "bg-card/95 backdrop-blur-xl",
      "rounded-3xl",
      "animate-in slide-in-from-bottom-5 fade-in duration-300"
    )}>
      {/* Header */}
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 backdrop-blur-md border-b border-border z-10">
        <div className="flex items-center gap-3">
          <div className="relative p-2 bg-linear-to-br from-primary/20 to-primary/10 rounded-xl border border-border shadow-inner">
            <Bot className="w-5 h-5 text-foreground" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border border-background"></span>
            </span>
          </div>
          <div>
            <CardTitle className="text-sm font-semibold tracking-wide text-foreground">AI Assistant</CardTitle>
            <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-green-500 inline-block" />
              Always Active
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={cn(
              "flex w-fit max-w-[85%] flex-col gap-1 text-sm shadow-sm",
              msg.role === 'user'
                ? "ml-auto"
                : "mr-auto"
            )}
          >
            <div className={cn(
              "px-4 py-2.5 break-words relative",
              msg.role === 'user'
                ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-md"
                : "bg-muted border border-border text-foreground rounded-2xl rounded-tl-md backdrop-blur-sm"
            )}>
              <div className="prose prose-sm dark:prose-invert max-w-none break-words leading-relaxed text-inherit">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="">{children}</li>,
                    strong: ({ children }) => <span className="font-bold">{children}</span>,
                    a: ({ children, href }) => <a href={href} target="_blank" rel="noreferrer" className="underline underline-offset-2 opacity-90 hover:opacity-100">{children}</a>
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
            {msg.role === 'assistant' && (
              <span className="text-[10px] text-muted-foreground ml-1 opacity-70">AI Assistant</span>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex w-fit max-w-[85%] flex-col gap-1">
            <div className="bg-muted border border-border text-foreground rounded-2xl rounded-tl-md px-4 py-3 backdrop-blur-sm w-fit">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input Footer */}
      <CardFooter className="p-3 bg-transparent">
        <div className="relative flex items-center w-full gap-2 p-1.5 bg-muted/50 border border-border rounded-full backdrop-blur-md shadow-sm focus-within:ring-1 focus-within:ring-ring transition-all">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 px-4 h-9 text-sm text-foreground placeholder:text-muted-foreground"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={cn(
              "h-9 w-9 rounded-full shrink-0 transition-all duration-300",
              input.trim() ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-accent"
            )}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ChatModal
