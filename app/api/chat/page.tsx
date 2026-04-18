const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  const userMessage = { role: 'user', content: input };
  const newMessages = [...messages, userMessage];
  setMessages(newMessages);
  setInput('');
  setIsLoading(true);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();
    setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
  } catch (error) {
    console.error("Failed to fetch:", error);
  } finally {
    setIsLoading(false);
  }
};
