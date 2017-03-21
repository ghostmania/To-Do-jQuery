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
            --currentPage;
            console.log("Current page is"+" "+currentPage);
            start_from = (currentPage - 1) * 3;
            end_on = start_from + 3;
            $('li').css('display', 'none');
            if (currentTab == 'all'){
                $('li').slice(start_from, end_on).css('display', '');
            } else if (currentTab == 'active') {
                $('li').not('.completed').slice(start_from, end_on).css('display', '');
            } else {
                $('.completed').slice(start_from, end_on).css('display', '');
            }
            console.log("currentPage is"+" "+currentPage);
        }
    }));
    $("#pagination").append($("<section id='pages'></section>"));
    $("#pagination").append($("<button id='next'>></button>").click(function () { // go to next page function
            if (currentPage !== pageCount){ // if current page isn't last we go to next one
                ++currentPage;
                console.log("Current page is"+" "+currentPage);
                start_from = (currentPage - 1) * 3;
                end_on = start_from + 3;
                $('li').css('display', 'none');
                if (currentTab == 'all'){
                    $('li').slice(start_from, end_on).css('display', '');
                } else if (currentTab == 'active') {
                    $('li').not('.completed').slice(start_from, end_on).css('display', '');
                } else {
                    $('.completed').slice(start_from, end_on).css('display', '');
                }
                console.log("currentPage is"+" "+currentPage);
            }

    }));
    $("#pages").append($("<button>1</button>").click(
        function () {
            colorCurrent($("#pages").children(), $(this));
            goToPage(1)
        }
    ));

    function colorCurrent(navBtns, thisBtn) {
        $(navBtns).removeClass("active-btn");
        $(thisBtn).addClass("active-btn");
    }


    $("#input").keypress(function(e){ // add li when press ENTER
            if (e.keyCode == 13 ) {
                add_element();
            }
        });

        $("button#add_btn").click( // add li when click ADD
            add_element
        );

        $("#all_elements").click(
            function () {
                show_all();
                colorCurrent($("#tabs").children(), $(this))
            }

        );

        $("#active_elements").click(
            function () {
                show_active();
                colorCurrent($("#tabs").children(), $(this))
            }
        );

        $("#completed_elements").click(
            function () {
                show_completed();
                colorCurrent($("#tabs").children(), $(this))
            }
        );


    function add_element() { // create li
        if ($("#input")[0].value.trim() !== '') { // if input not empty
            var li = $("<li></li>");       // create li
            if (allLi + 1 > 3 * currentPage) { // if added element is more then 3rd in list
                    li.hide(); // hide element
                }
                if (allLi%3 == 0 && allLi !== 0 && (currentTab == "all" || currentTab == 'active')){ // create page when needed
                    $("#pages").append($("<button></button>").text(++pageCount).click(//function when click on page number
                        function () {
                            colorCurrent($("#pages").children(), $(this));
                            goToPage(pageCount)
                        }
                    )) ;// function click on page number end
                } // end create page if needed
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
                                recountPage(activeLi);
                            } else { // if currentTab=completed change counters on Active Tab
                                $(this).parent().css("display", "none");
                                $("#active_counter").text(++activeLi);
                                $("#completed_counter").text(--completedLi);
                                renderLi();
                                recountPage(completedLi);
                            }
                    })
                );
                li.append($("<button>x</button>").click(function (event) { // create remove button
                    removeLi(this);// remove li
                }));// end remove button
                $("#list").append(li); // insert created li to list
                $("#input").val(""); // clear input value
                $("#all_counter").text(++allLi);
                $("#active_counter").text(++activeLi);
                if (currentTab == 'completed') { // hide li if current tab is Completed
                    li.hide();
                }
        } // end if input not empty
        $("#input").focus();
    }// addElement end

    function show_all() { // show all elements function
        currentTab = "all";
        currentPage = 1;
        console.log("You are on All tab and current page is"+" "+currentPage);
        renderLi(); // display elements according to  their status
        recountPage(allLi);
        $("#input").focus(); // focus on input
    }

    function show_active() { // show active elements function
        currentTab = "active";
        currentPage = 1;
        console.log("You are on Active tab and current page is"+" "+currentPage);
        renderLi(); // display elements according to  their status
        recountPage(activeLi);
        $("#input").focus(); // focus on input
    }

    function show_completed() { // show completed elements function
        currentTab = "completed";
        currentPage = 1;
        console.log("You are on Completed tab and current page is"+" "+currentPage);
        renderLi(); // display elements according to  their status
        recountPage(completedLi);
        $("#input").focus(); // focus on input
    }

    function removeLi(btn) {
        $("#all_counter").text(--allLi); // decrease allCounter
        if ($(btn).parent().hasClass("completed")){
            $("#completed_counter").text(--completedLi); // decrease completed elements counter
        } else {
            $("#active_counter").text(--activeLi);// decrease active elements counter
        }
        if (currentTab == "all" ) {
            if (Math.ceil(allLi / 3) < pageCount && pageCount !== 1) {
                --pageCount;
                $("#pages button:last-child").remove(); // find and remove last button
            }
            $(btn).parent().remove(); // remove li
            if (pageCount < currentPage) { // check if page was last, go to previous
                goToPage(pageCount);
            } else {
                goToPage(currentPage);
            }
        } else if (currentTab == 'active'){
            if (Math.ceil(activeLi / 3) < pageCount && pageCount !== 1) {
                --pageCount;
                $("#pages button:last-child").remove(); // find and remove last button
            }
            $(btn).parent().remove(); // remove li
            if (pageCount < currentPage) { // check if page was last, go to previous
                goToPage(pageCount);
            } else {
                goToPage(currentPage);
            }
        }
        else if (currentTab == "completed"){
            if (Math.ceil(completedLi / 3) < pageCount && pageCount !== 1) {
                --pageCount;
                $("#pages button:last-child").remove(); // find and remove last button
            }
            $(btn).parent().remove(); // remove li
            if (pageCount < currentPage) { // check if page was last, go to previous
                goToPage(pageCount);
            } else {
                goToPage(currentPage);
            }
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

    function recountPage(li) { // recount pages
        console.log("1= ", pageCount);
        pageCount = Math.ceil(li / 3); // pages for this tab
        console.log("2= ", pageCount);
        if (pageCount == 0){
            pageCount = 1;
        }
        console.log("Pages for this tab should be"+" "+pageCount);
        $("#pages").empty(); // set pages to 0
        for (var i=1; i <= pageCount; i++) { // while pages less then needed
            $("#pages").append($("<button></button>").text(i).click({page:i},
                function (params) {
                    goToPage(params.data.page);
                    colorCurrent($("#pages").children(), $(this))
                }

            )); // create page
        }
    } // recount pages end

    function goToPage(param) { // goToPage start
        param.data ? currentPage = param.data.page : currentPage = param;
        console.log("You went to "+currentPage+" page");
        start_from = (currentPage - 1) * 3;
        end_on = start_from + 3;
        $('li').css('display', 'none');
        if (currentTab == 'all'){
            $('li').slice(start_from, end_on).css('display', '');
        } else if (currentTab == 'active') {
            $('li').not('.completed').slice(start_from, end_on).css('display', '');
        } else {
            $('.completed').slice(start_from, end_on).css('display', '');
        }
        console.log("currentPage is"+" "+currentPage);
    } // goToPage end

}) // document ready end
