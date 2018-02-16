// Activates the Carousel
$('.carousel').carousel({
  interval: 5000
})

// Activates Tooltips for Social Links
$('.tooltip-social').tooltip({
  selector: "a[data-toggle=tooltip]"
}
)

//add back button on fac pub pages
    var backBtn = '<a href="#" onclick="window.history.back()" class="backBtn"">← Back</a>'; 
    $(backBtn).insertBefore(".row.publications");
    
    //generate html with full name for popover
    function fullTitlePopover(abb_title, full_title){
        var fullHtml = '<a tabindex="0" data-toggle="popover" data-title="Full Journal Name" data-content="' + full_title + '" class="fullTitle">' + abb_title + '</a>';
        return fullHtml;
    }
    
    // replace abbreviations on HTML to full title
    function replaceAbb(full_title){
        var fullHtml = '<i>' + full_title + '</i>';
        return fullHtml;
    }
   
    //read journal abbreviation json file bib_journal.json
    var bib_json;
    $.getJSON("bib_journal.json", function (json) {
        bib_json = json;
        
        //check if the abbreviation on th page match the list
        function matchAbb(abb_page){
            for (num = 0; num < bib_json.length; num ++){
                    var abb_lst = bib_json[num]["abbreviation"];
                    if (abb_lst.substr(0, 8) == abb_page.substr(0, 8)){
                        var full_title = bib_json[num]["full_title"];
                        return full_title;
                    }
            }
        }
        
        //check each abbreviated title under em tag
        function checkAbbEm(){
            $("em").each(function(){
                var abb_page = $(this).html();
                var full_title = matchAbb(abb_page);
                if (full_title != undefined){
                    $(this).html(fullTitlePopover(abb_page, full_title));
                }
            });
        }
        
        //check each abbreviated title under i tag
        function checkAbbI(){
                $("i").each(function(){
                var abb_page = $(this).html();
                var full_title = matchAbb(abb_page);
                if (full_title != undefined){
                    $(this).html(fullTitlePopover(abb_page, full_title));
                }
            });
        }
        
        checkAbbEm();
        checkAbbI();
                            
        //trigger bootstrap popover function
        $('a[data-toggle="popover"]').popover({
            html: true,
            trigger: 'hover click',
            container: 'body'
        });
        
    });
   