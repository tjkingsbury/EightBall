import { LightningElement, track, api } from 'lwc';
import askEightBall from '@salesforce/apex/EightBallController.askEightBall';

export default class EightBallLwc extends LightningElement {

    @track response;
    @track error;
    @track question;
    @api answer;
    @track jsonResponse;

    handleChange(event){
        this.question = event.target.value;
    }

    askQuestion() {
        
        askEightBall({ question: this.question })
            .then(result => {
                this.response = result;
                this.jsonResponse = JSON.parse(this.response);
                this.answer = this.jsonResponse.magic.answer;
                this.type = this.jsonResponse.magic.type;
                
                
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.response = undefined;
            });
        
    }
}