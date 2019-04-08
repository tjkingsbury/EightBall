/**
 * Created by Turbo_000 on 12/17/2018.
 */
({
    handleClick : function(cmp, event, helper){
        console.log('in handle click');
        console.log('question: ' + cmp.get("v.question"));
        var action = cmp.get("c.askEightBall");
        console.log('question: ' + cmp.get("v.question"));
        action.setParams({ question : cmp.get("v.question")});
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                alert("From server: " + response.getReturnValue());
            }
            else if(state === "INCOMPLETE"){
                //do something
            }
            else if(state === "ERROR"){
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    } else {
                        console.log("Unknown error");
                    }
                }
            }
        });
        $A.enqueueAction(action);
    }
})