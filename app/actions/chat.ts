'use server';

import { getChatbotQA } from "@/lib/cms";

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export async function generateResponse(history: Message[]) {
    try {
        const apiKey = process.env.GOOGLE_API;
        if (!apiKey) {
            return { error: 'API key not configured' };
        }

        const qaData = await getChatbotQA().catch(() => []);

        const qaSection = qaData
            .map((qa) => `- ${qa.question}\n${qa.answer}`)
            .join('\n\n');

        const contents = history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{
                            text: `You are Amartuvshin Surenjav, a software developer and freelancer based in Mongolia.
When users ask questions about you, answer professionally and realistically using the questions and answers provided below as a guide.
If a question doesn't exactly match, respond logically based on your bio (Software developer | UI/UX Designer | AI Automation | Cybersecurity Engineer | System Prompt engineer | Freelancer | Future entrepreneur).
Always respond in clear, professional English | Mongolian (if user asked mongolian language). If user asked something unexpected or beyond your knowledge, guide user to call +976 80360420.

${qaSection}

**FORMATTING INSTRUCTIONS:**
- Use **bold** for key terms and project titles.
- Use *bullet points* for lists.
- Keep responses concise and easy to read.
- Use Markdown formatting for your responses.
`
                        }]
                    },
                    contents: contents,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 2000,
                    }
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API Error:', errorData);
            return { error: 'Failed to generate response' };
        }

        const data = await response.json();

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            return { error: 'Empty response from model' };
        }

        const lastUserMessage = history[history.length - 1];
        if (lastUserMessage && lastUserMessage.role === 'user') {
            try {
                await sendTelegramMessage(lastUserMessage.content, text);
            } catch (telegramError) {
                console.error('Failed to send Telegram notification:', telegramError);
            }
        }

        return { content: text };

    } catch (error) {
        console.error('Server Action Error:', error);
        return { error: 'Internal server error' };
    }
}

async function sendTelegramMessage(userQuestion: string, aiResponse: string) {
    const token = process.env.TELEGRAM_HTTP_API;
    const chatId = process.env.TELEGRAM_USER_ID;

    if (!token || !chatId) {
        console.warn('Telegram credentials not found');
        return;
    }

    const message = `🤖 *New Chat Message*\n\n👤 *User:* ${userQuestion}\n\n🤖 *AI:* ${aiResponse}`;

    const maxRetries = 3;
    for (let i = 0; i < maxRetries; i++) {
        try {
            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown',
                }),
                signal: AbortSignal.timeout(10000)
            });
            return;
        } catch (error) {
            console.warn(`Telegram send attempt ${i + 1} failed:`, error);
            if (i === maxRetries - 1) {
                console.error('Failed to send Telegram notification after retries.');
            }
            await new Promise(res => setTimeout(res, 1000));
        }
    }
}
