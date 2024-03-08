import { Component } from '@angular/core';
import { BotService } from '../../services/bot.service';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrl: './bot.component.css'
})
export class BotComponent {
  constructor(private botService: BotService) { }
  messages: { content: string; from: 'user' | 'bot' }[] = [];
  userInput: string = '';
  botMessage: any = '';
  showChatWindow: boolean = false;

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
