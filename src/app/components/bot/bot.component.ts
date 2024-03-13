import { Component, NgZone } from '@angular/core';
import { BotService } from '../../services/bot.service';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrl: './bot.component.css'
})
export class BotComponent {
  constructor(private botService: BotService) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.initSpeechRecognition();
  }
  messages: { content: string; from: 'user' | 'bot' }[] = [];
  userInput: string = '';
  botMessage: any = '';
  showChatWindow: boolean = false;

  listnerStarted: boolean = true;
  listenerStopped: boolean = false;
  recognition: any;
  zone: any;
  interimTranscript = ''
  
  initSpeechRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en'; 

      this.recognition.onresult = (event: any) => {
        this.interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            this.zone.run(() => {
              this.userInput += transcript;
            });
          } 
        }
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
    } else {
      console.error('Speech Recognition API not supported in this browser.');
    }
  }

  handleListening() {
    this.listnerStarted = !this.listnerStarted;
    this.listenerStopped = !this.listenerStopped;
  }

  startListening() {
    if (this.recognition)
      this.recognition.start();
  }

  stopListening() {
    if (this.recognition)
      this.recognition.stop();
  }

  ngOnInit() {
    this.addBotMessage('Hello! I am Alex. You can ask me anything related to this application. Please tell me how I can help you today');
  }

  sendMessage() {
    if (this.userInput.trim() !== '') {
      this.messages.push({ content: this.userInput, from: 'user' });
      this.simulateBotResponse(this.userInput);
      this.userInput = '';
    }
  }

  toggleChatWindow() {
    this.showChatWindow = !this.showChatWindow;
  }

  private simulateBotResponse(message: any) {
    setTimeout(() => {
      this.generateBotResponse(message);
    }, 500);
  }

  private generateBotResponse(message: any): any {
    this.botService.generateResponseFromBot({ query: message }).subscribe(
      (data: any) => {
        this.addBotMessage(data.body);
      },
      (error: any) => {
        return '';
      }
    )
  }

  private addBotMessage(content: string) {
    this.messages.push({ content, from: 'bot' });
  }
}
