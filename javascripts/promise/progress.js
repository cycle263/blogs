var userProgress = $.Deferred();
var $profileFields = $("input");
var totalFields = $profileFields.length
    
userProgress.progress(function (filledFields) {
    var pctComplete = (filledFields/totalFields)*100;
    $("#progress").html(pctComplete.toFixed(0));
}); 

userProgress.done(function () {
    $("#thanks").html("Thanks for completing your profile!").show();
});

$("input").on("change", function () {
    var filledFields = $profileFields.filter("[value!='']").length;
    userProgress.notify(filledFields);
    if (filledFields == totalFields) {
        userProgress.resolve();
    }
});
