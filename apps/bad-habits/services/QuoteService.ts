import { Quote } from '@/types';

// You can replace this with your preferred AI API
// Options: OpenAI, Anthropic Claude, Google Gemini, etc.
const AI_API_ENDPOINT = 'https://api.openai.com/v1/responses';
const AI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';

interface AIQuoteResponse {
  text: string;
  author: string;
  category: string;
}

class QuoteService {
  private static instance: QuoteService;
  private cache: Map<string, Quote> = new Map();
  private lastFetchDate: string | null = null;
  private lastRequestTime: number = 0;
  private readonly MIN_REQUEST_INTERVAL = 2000; // 2 seconds minimum between requests

  static getInstance(): QuoteService {
    if (!QuoteService.instance) {
      QuoteService.instance = new QuoteService();
    }
    return QuoteService.instance;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }

  private shouldFetchNewQuote(): boolean {
    if (!this.lastFetchDate) return true;
    
    const lastFetch = new Date(this.lastFetchDate);
    const today = new Date();
    
    return !this.isSameDay(lastFetch, today);
  }

  private checkRateLimit(): boolean {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.MIN_REQUEST_INTERVAL) {
      console.warn(`Rate limit: Request too soon. Wait ${Math.ceil((this.MIN_REQUEST_INTERVAL - timeSinceLastRequest) / 1000)}s`);
      return false;
    }
    
    this.lastRequestTime = now;
    return true;
  }

  private async fetchQuoteFromAI(): Promise<AIQuoteResponse> {
    if (!AI_API_KEY) {
      throw new Error('AI API key not configured');
    }

    // Check rate limiting
    if (!this.checkRateLimit()) {
      throw new Error('Rate limit: Please wait before requesting another quote');
    }

    const prompt = `Generate an inspirational quote about personal growth, habits, motivation, or self-improvement. 
    Make sure the quote is genuinely inspiring and the author is real. Keep the quote under 200 characters.`;

    try {
      console.log('📤 Sending request to OpenAI...');
      const response = await fetch(AI_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-2024-08-06',
          input: [
            {
              role: 'system',
              content: 'You are an AI that generates inspirational quotes. Always respond with structured JSON data.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          text: {
            format: {
              type: 'json_schema',
              name: 'inspirational_quote',
              schema: {
                type: 'object',
                properties: {
                  text: {
                    type: 'string',
                    description: 'The inspirational quote text'
                  },
                  author: {
                    type: 'string',
                    description: 'The real author of the quote'
                  },
                  category: {
                    type: 'string',
                    description: 'The category of the quote',
                    enum: ['motivation', 'habits', 'growth', 'success', 'mindfulness', 'productivity']
                  }
                },
                required: ['text', 'author', 'category'],
                additionalProperties: false
              },
              strict: true
            }
          }
        }),
      });

      if (response.status === 429) {
        console.error('🚫 Rate limit exceeded (429)');
        throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
      }

      if (!response.ok) {
        console.error('❌ API Error:', response.status, response.statusText);
        throw new Error(`AI API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      // Check for refusal
      if (data.output && data.output[0] && data.output[0].content && data.output[0].content[0]) {
        const content = data.output[0].content[0];
        if (content.type === 'refusal') {
          console.error('❌ Model refused to respond:', content.refusal);
          throw new Error('Model refused to generate quote. Please try again.');
        }
      }

      // Extract the structured output from the correct location
      if (!data.output || !data.output[0] || !data.output[0].content || !data.output[0].content[0]) {
        console.error('❌ Invalid response structure');
        throw new Error('Invalid response structure from AI API');
      }

      const content = data.output[0].content[0];
      if (content.type !== 'output_text') {
        console.error('❌ Unexpected content type:', content.type);
        throw new Error('Unexpected response type from AI API');
      }

      const outputText = content.text;
      if (!outputText) {
        console.error('❌ No output text in response');
        throw new Error('Invalid response from AI API');
      }

      // Parse the JSON response
      const quoteData = JSON.parse(outputText);
      console.log('✅ Quote parsed successfully:', quoteData);
      
      return {
        text: quoteData.text,
        author: quoteData.author,
        category: quoteData.category,
      };
    } catch (error) {
      console.error('💥 Error fetching quote from AI:', error);
      throw error;
    }
  }

  private getFallbackQuote(): Quote {
    const fallbackQuotes = [
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "motivation"
      },
      {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "success"
      },
      {
        text: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu",
        category: "growth"
      },
      {
        text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        author: "Aristotle",
        category: "habits"
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "motivation"
      }
    ];

    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    
    return {
      id: `fallback-${Date.now()}`,
      text: randomQuote.text,
      author: randomQuote.author,
      category: randomQuote.category,
      lastUpdated: new Date(),
    };
  }

  async getDailyQuote(): Promise<Quote> {
    const today = new Date().toDateString();
    
    // Check if we already have a quote for today
    if (this.cache.has(today) && !this.shouldFetchNewQuote()) {
      return this.cache.get(today)!;
    }

    try {
      // Try to fetch from AI API
      const aiQuote = await this.fetchQuoteFromAI();
      
      const quote: Quote = {
        id: `ai-${Date.now()}`,
        text: aiQuote.text,
        author: aiQuote.author,
        category: aiQuote.category,
        lastUpdated: new Date(),
      };

      // Cache the quote for today
      this.cache.set(today, quote);
      this.lastFetchDate = new Date().toISOString();
      
      return quote;
    } catch (error) {
      console.warn('Failed to fetch AI quote, using fallback:', error);
      
      // Use fallback quote if AI API fails
      const fallbackQuote = this.getFallbackQuote();
      this.cache.set(today, fallbackQuote);
      this.lastFetchDate = new Date().toISOString();
      
      return fallbackQuote;
    }
  }

  // Method to manually refresh quote (useful for testing)
  async refreshQuote(): Promise<Quote> {
    // Clear the cache and last fetch date to force a new quote
    this.lastFetchDate = null;
    const today = new Date().toDateString();
    this.cache.delete(today); // Remove today's cached quote
    
    try {
      // Try to fetch from AI API
      const aiQuote = await this.fetchQuoteFromAI();
      
      const quote: Quote = {
        id: `ai-${Date.now()}`,
        text: aiQuote.text,
        author: aiQuote.author,
        category: aiQuote.category,
        lastUpdated: new Date(),
      };

      // Cache the new quote for today
      this.cache.set(today, quote);
      this.lastFetchDate = new Date().toISOString();
      
      return quote;
    } catch (error) {
      console.warn('Failed to fetch AI quote, using fallback:', error);
      
      // Use fallback quote if AI API fails
      const fallbackQuote = this.getFallbackQuote();
      this.cache.set(today, fallbackQuote);
      this.lastFetchDate = new Date().toISOString();
      
      return fallbackQuote;
    }
  }

  // Get cached quote without fetching new one
  getCachedQuote(): Quote | null {
    const today = new Date().toDateString();
    return this.cache.get(today) || null;
  }
}

export default QuoteService; 