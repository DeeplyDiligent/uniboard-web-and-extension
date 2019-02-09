
function expand(subjects,doneLoading) {
    var timeouts = [];
    var subjectsattr = {}
    function waitForElement(elementPath, parentElement, callBack) {
        timeouts.push(parentElement);
        window
            .setTimeout(function () {
                if (!$('#'+parentElement).hasClass('loading')) {
                    callBack(elementPath, $(elementPath));
                    console.log('taking out '+parentElement);
                    timeouts = remove(timeouts,parentElement);
                    $( "#subjectselector").trigger( "timeouts", [timeouts] );
                    if ((timeouts.length) === 0){
                        doneLoading(subjectsattr);
                    }
                } else {
                    waitForElement(elementPath, parentElement, callBack);
                }
            }, 50)
    }
    function expandall(expandablebranch) {
        if ($("#" + expandablebranch).attr("aria-expanded") === 'false') {
            $("#" + expandablebranch).trigger("click")
            waitForElement('#' + expandablebranch + '_group', expandablebranch, function () {
                collapse(expandablebranch);
                $('#' + expandablebranch + '_group')
                    .find('.tree_item')
                    .each(function (i) {
                        expandall($(this).attr("id"));
                    });
            });
        }
    }
    function collapse(expandablebranch) {
        if ($("#" + expandablebranch).attr("aria-expanded") === 'true') {
            $("#" + expandablebranch).trigger("click")
        }
    }
    navigationLinks.each(function () {
        if ($(this).attr('title') != null && subjects.indexOf($(this).attr('title')) >= 0) {
            console.log('matching subject found');
            console.log(this);
            var expBranch = $(this)
                .parent()
                .attr('id');
            subjectattr = {};
            subjectattr.id = expBranch;
            subjectattr.dateCreated = new Date().getTime();
            subjectattr.expandedname = $(this).attr('title');
            subjectattr.name = $(this)
                .attr('title')
                .substring(0, 7);
            subjectsattr[$(this).attr('title')] = (subjectattr);
            expandall(expBranch);
        }
    });
}