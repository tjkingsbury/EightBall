public with sharing class EightBallController {


    @AuraEnabled
    public static String askEightBall(String question){
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://8ball.delegator.com/magic/JSON/' + question);
        req.setMethod('GET');

        Http http = new Http();
        HttpResponse res = http.send(req);
        return res.getBody();
    }
}