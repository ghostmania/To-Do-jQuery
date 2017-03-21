/**
 * Created by user on 17.03.17.
 */
$(function (){ // document ready start
        $("#input").focus(); // focus input when page is loaded

        var currentTab = "all";
        var activeLi = 0;
        var completedLi = 0;
        var allLi = 0;
        var currentPage = 1;
        var pageCount = 1;
        var actualList =[];
        //pagination
        $("#container").append($("<section id='pagination'></section>"));
        $("#pagination").append($("<button id='prev'><</button>").click(function () { // go to previous page function
            if (currentPage !== 1){ // if current page isn't first we go to next one
                currentPage = currentPage - 1;
                console.log("Current page is"+" "+currentPage);
            }
        }));
        $("#pagination").append($("<section id='pages'></section>"));
        $("#pagination").append($("<button id='next'>></button>").click(function () { // go to next page function
                if (currentPage !== pageCount){ // if current page isn't last we go to next one
                    currentPage = currentPage + 1;
                    console.log("Current page is"+" "+currentPage);
                }
        }));
        $("#pages").append($("<button>1</button>"));



    $("#input").keypress(function(e){ // add li when press ENTER
            if (e.keyCode == 13 ) {
                add_element();
            }
        });

        $("button#add_btn").click( // add li when click ADD
            add_element
        );

        $("#all_elements").click(
            show_all
        );

        $("#active_elements").click(
            show_active
        );

        $("#completed_elements").click(
            show_completed
        );


    function add_element() { // create li
        if ($("#input")[0].value.trim() !== '') { // if input not empty
            var li = $("<li></li>");       // create li
            if (allLi + 1 > 3 * currentPage) { // if added element is more then 3rd in list
                li.hide(); // hide element
            }
            if (allLi%3 == 0 && allLi !== 0){ // create page when needed
                if (currentTab == "all" || currentTab == 'active'){ // create page only when not on Completed Tab
                    $("#pages").append($("<button></button>").text(++pageCount));
                }
            }
            li.append($("<span><span/>").text($("#input").val()).dblclick( // edit function
                function () {
                    var editInput = $("<input />").keypress(function (e) { // add function to input when press ENTER
                        if (e.keyCode == 13 ) {
                            $(this).css("display", "none"); // hide input
                            $(this).siblings("span").text($(this).val()); // insert value of input into span
                            $(this).siblings().show(); // show other elements
                        }
                    }); // create input for edit
                    li.children().hide(); // hide elements when editInput is opened
                    li.append($(editInput).val($(this).text())); // insert input into li
                    $(editInput).focus(); // set value of input same as span
                }
            ));
            li.prepend($("<input type='checkbox' />").click(function () { // function to sort elements by className
                       $(this).parent().toggleClass("completed"); // when click on checkbox toggle class for li element
                        if (currentTab == "all") { // change counters on All Tab
                            $(this).parent().css("display", "");
                            if (li[0].className !== 'completed'){
                                $("#active_counter").text(++activeLi);
                                $("#completed_counter").text(--completedLi);
                            }
                            else {
                                $("#active_counter").text(--activeLi);
                                $("#completed_counter").text(++completedLi);
                            }
                        } else if (currentTab == "active"){ // change counters on Active Tab
                            $(this).parent().css("display", "none");
                            $("#active_counter").text(--activeLi);
                            $("#completed_counter").text(++completedLi);
                            renderLi();
                            recountPages();
                        } else { // if currentTab=completed change counters on Active Tab
                            $(this).parent().css("display", "none");
                            $("#active_counter").text(++activeLi);
                            $("#completed_counter").text(--completedLi);
                            renderLi();
                            recountPages();
                        }
                })
            );
            li.append($("<button>x</button>").click(function (event) { // create remov ebutton
                $(event.target).parent().detach(); // remove li when click remove btn
                removePage();
            }));// end remove button
            $("#list").append(li); // insert created li to list
            $("#input").val(""); // clear input value
        } // end if input not empty
        $("#all_counter").text(++allLi);
        $("#active_counter").text(++activeLi);
        if (currentTab == 'completed') { // hide li if current tab is Completed
            li.hide();
        }
        $("#input").focus();
    }// addElement end

    function show_all() { // show all elements function
        currentTab = "all";
        currentPage = 1;
        console.log("You are on All tab and current page is"+" "+currentPage);
        renderLi(); // display elements according to  their status
        recountPages();
        $("#input").focus(); // focus on input
    }

    function show_active() { // show active elements function
        currentTab = "active";
        currentPage = 1;
        console.log("You are on Active tab and current page is"+" "+currentPage);
        renderLi(); // display elements according to  their status
        recountPages();
        $("#input").focus(); // focus on input
    }

    function show_completed() { // show completed elements function
        currentTab = "completed";
        currentPage = 1;
        console.log("You are on Completed tab and current page is"+" "+currentPage);
        renderLi(); // display elements according to  their status
        recountPages();
        $("#input").focus(); // focus on input
    }

    function removePage() {
        $("#all_counter").text(--allLi); // decrease allCounter
        if (currentTab == "all") {
            $("#active_counter").text(--activeLi); // decrease active elements counter
            renderLi();
        } else if (currentTab == 'active'){
            $("#active_counter").text(--activeLi); // decrease active elements counter
            renderLi();
        }
        else if (currentTab == "completed"){
            $("#completed_counter").text(--completedLi);// decrease completed elements counter
            renderLi();
        }
        if (allLi%3 == 0 && allLi !== 0){ // remove page when needed
            $("#pages button:last-child").remove(); // find and remove last button
            --pageCount; //remove page
        }
    }

    function renderLi() { // renderLi start
        if (currentTab == "all") {
            $("li").show(); // show all li
            if (allLi > 3) { // show only 3 elements on page
                $("li").slice(3).hide();
            }
        } else if (currentTab == "active"){
            // actualList = $("li").css("display", "");
            $("li").show(); // show li
            $(".completed").hide(); // hide Completed li
            if (activeLi > 3){ // show only 3 elements on page
                $("li").not(".completed").slice(3).hide(); // show only 3 elements on page
            }
        } else { // currentTab == completed
            $("li").hide(); // hide all li
            $(".completed").show(); // show Completed li
            if (completedLi > 3){ // show only 3 elements on page
                $(".completed").slice(3).hide(); // show only 3 elements on page
            }
        }
    }// renderLi end

    function recountPages() { // recount pages
        if (currentTab == "all") {
            pageCount = Math.ceil(allLi / 3); // pages for this tab
            if (pageCount == 0){
                pageCount = 1;
            }
            console.log("Pages for this tab should be"+" "+pageCount);
            createPage();
        } else if (currentTab == "active"){
            pageCount = Math.ceil(activeLi / 3); // pages for this tab
            if (pageCount == 0){
                pageCount = 1;
            }
            console.log("Pages for this tab should be"+" "+pageCount);
            createPage();
        } else { // currentTab == completed
            pageCount = Math.ceil(completedLi / 3); // pages for this tab
            if (pageCount == 0){
                pageCount = 1;
            }
            console.log("Pages for this tab should be"+" "+pageCount);
            createPage();
        }

    } // recount pages end

    function createPage() { // createPage start
        $("#pages").empty(); // set pages to 0
        for (var i=1; i <= pageCount; i++) { // while pages less then needed
            $("#pages").append($("<button></button>").text(i)); // create page
        }
    } // createPage end



}) // document ready end
