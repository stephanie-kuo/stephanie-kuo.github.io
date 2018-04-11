// Random Background Banner
$(document).ready(function(){
    var images = ['001.jpg', '002.jpg', '003.jpg', '004.jpg', '005.jpg', '006.jpg', '007.jpg', '008.jpg'];
    $('#bannerbackground').css({'background-image': 'url(/assets/library/images/' + images[Math.floor(Math.random() * images.length)] + ')'});
    
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

    //convert csv to json
    var data;
     $.ajax({
       type: "GET",  
       url: "bib_journal.csv",
       dataType: "text",       
       success: function(response)  
       {
        var lines = response.split("\n");
        var colNames = lines[0].split(",");
        var records=[];
        for(var i = 1; i < lines.length; i++) {
            var record = {};
            var bits = lines[i].split(",");
            for (var j = 0 ; j < bits.length ; j++) {
              record[colNames[j]] = bits[j];
            }
            records.push(record);
        }
        var bib_json = JSON.stringify(records);
        bib_json = JSON.parse(bib_json);
         //check if the abbreviation on th page match the list
         function matchAbb(abb_page){
             for (num = 0; num < bib_json.length; num ++){
                     var abb_lst = bib_json[num]["abbreviation"];
                     //split the string to check the beginning 8 characters. If there are more than 8 same characters, please change the number here. 
                     if (abb_lst.substr(0, 20) == abb_page.substr(0, 20)){
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
       }
     });
});