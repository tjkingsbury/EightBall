import { LightningElement, track, api } from 'lwc';
import askEightBall from '@salesforce/apex/EightBallController.askEightBall';

export default class EightBallLwc extends LightningElement {

    @track response;
    @track error;
    @track question;
    @api answer;
    @track jsonResponse;
    @api backgroundColor;

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
                this.setBackgroundColor();
                
                
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.response = undefined;
            });
        
    }

    setBackgroundColor(){
        if(this.type === 'Affirmative'){
            this.backgroundColor = 'slds-text-color_success';
        }
        else if(this.type === 'Neutral'){
            this.backgroundColor = 'slds-text-color_weak';
        }
        else{
            this.backgroundColor = 'slds-text-color_error';
        }
    }
}