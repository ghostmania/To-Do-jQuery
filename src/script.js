/**
 * Created by user on 17.03.17.
 */
$(function (){ // document ready start

    var currentTab = "all";
    var activeLi = 0;
    var completedLi = 0;
    var allLi = 0;
    var currentPage = 1;
    var pageCount = 1;
    $("#input").focus(); // focus input when page is loaded
    // pagination block START
    $("#container").append($("<section id='pagination'></section>"));
    $("#pagination").append($("<button id='prev'><</button>").click(function () { // go to previous page function
        if (currentPage !== 1){ // if current page isn't first we go to next one
            --currentPage;
            console.log("Current page is"+" "+currentPage);
            goToPage(currentPage);
        }
        colorCurrent($("#pages button"), $("#pages button:nth-child("+currentPage+")"));
    }));
    $("#pagination").append($("<section id='pages'></section>"));
    $("#pagination").append($("<button id='next'>></button>").click(function () { // go to next page function
        if (currentPage !== pageCount){ // if current page isn't last we go to next one
            ++currentPage;
            console.log("Current page is"+" "+currentPage);
            goToPage(currentPage);
        }
        colorCurrent($("#pages button"), $("#pages button:nth-child("+currentPage+")"));
    }));
    $("#pages").append($("<button>1</button>").addClass("active-btn").click( function () {
            colorCurrent($("#pages button"), $(this));
            goToPage(1)
        }
    ));
    // pagination block END
    function colorCurrent(navBtns, thisBtn) { // set color to current tab and page
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

    $("#all_elements").click( function () {
            show_tab("all", allLi);
            colorCurrent($("#tabs button"), $(this))
        }
    );

    $("#active_elements").click( function () {
            show_tab("active", activeLi);
            colorCurrent($("#tabs button"), $(this))
        }
    );

    $("#completed_elements").click( function () {
            show_tab("completed", completedLi);
            colorCurrent($("#tabs button"), $(this))
        }
    );

    function add_element() { // create li
        if ($("#input")[0].value.trim() !== '') { // if input not empty
            var li = $("<li></li>");       // create li
            if (currentTab == 'all' && allLi + 1 > 3 * currentPage ||
                currentTab == 'active' && activeLi + 1 > 3 * currentPage ||
                currentTab == 'completed') {
                li.hide(); // hide element
            }
            if (currentTab == "all" && allLi%3 == 0 && allLi !== 0 || // if currentTab=all
                currentTab == 'active' && activeLi%3 == 0 && activeLi !== 0
            ){ // create page when needed
                $("#pages").append($("<button></button>").text(++pageCount).click(//function when click on page number
                    function () {
                        colorCurrent($("#pages button"), $(this));
                        goToPage($(this).text())
                    }
                )) ;// function click on page number end
            } // end create page if needed
            li.append($("<span><span/>").text($("#input").val()).dblclick( function () { // edit function START
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
            })); // edit function END
            li.prepend($("<input type='checkbox' />").click(function () { // function to sort elements by className
               $(this).parent().toggleClass("completed"); // when click on checkbox toggle class for li element
                if (currentTab == "all" && li[0].className !== 'completed') { // change counters on All Tab
                    setCounter(++activeLi, --completedLi);
                }
                else if (currentTab == "all" && li[0].className == 'completed'){
                    setCounter(--activeLi, ++completedLi);
                } else if (currentTab == "active"){ // change counters on Active Tab
                    setCounter(--activeLi, ++completedLi);
                    recountPage(activeLi);
                    currentPage > pageCount ? goToPage(pageCount) : goToPage(currentPage);
                } else { // if currentTab=completed change counters on Active Tab
                    setCounter(++activeLi, --completedLi);
                    recountPage(completedLi);
                    currentPage > pageCount ? goToPage(pageCount) : goToPage(currentPage);
                }
                colorCurrent($("#pages button"), $("#pages button:nth-child("+currentPage+")"));
            }));
            li.append($("<button>x</button>").click(function () { // create remove button
                removeLi(this);// remove li
            }));// end remove button
            $("#list").append(li); // insert created li to list
            $("#input").val(""); // clear input value
            $("#all_counter").text(++allLi);
            $("#active_counter").text(++activeLi);
        } // end if input not empty
        $("#input").focus();
    }// addElement end

    function setCounter(activeIncr, completedIncr) {
        $("#active_counter").text(activeIncr);
        $("#completed_counter").text(completedIncr);
    }

    function show_tab(tabValue, liArray) { // show completed elements function
        currentTab = tabValue;
        currentPage = 1;
        console.log("You are on Completed tab and current page is "+currentPage);
        goToPage(1); // display elements according to  their status
        recountPage(liArray);
        colorCurrent($("#pages button"), $("#pages button:first-child"));
        $("#input").focus(); // focus on input
    }

    function removeLi(btn) {
        $("#all_counter").text(--allLi); // decrease allCounter
        if ($(btn).parent().hasClass("completed")){
            $("#completed_counter").text(--completedLi); // decrease completed elements counter if needed
        } else {
            $("#active_counter").text(--activeLi);// decrease active elements counter if needed
        }
        if (currentTab == 'all') { // find currentTab and li to be deleted
            var liToDelete = allLi
        } else if (currentTab == 'active') {
            liToDelete = activeLi
        } else {
            liToDelete = completedLi
        }
        if (Math.ceil(liToDelete / 3) < pageCount && pageCount !== 1) {
            --pageCount;
            $("#pages button:last-child").remove(); // find and remove last button
        }
        $(btn).parent().remove(); // remove li
        if (pageCount < currentPage) { // check if page was last, go to previous
            goToPage(pageCount);
        } else {
            goToPage(currentPage);
        }
        colorCurrent($("#pages button"), $("#pages button:nth-child("+currentPage+")"))
    }

    function recountPage(li) { // recount pages
        pageCount = Math.ceil(li / 3); // pages for this tab
        if (pageCount == 0){
            pageCount = 1;
        }
        console.log("Pages for this tab should be "+pageCount);
        $("#pages").empty(); // set pages to 0
        for (var i=1; i <= pageCount; i++) { // while pages less then needed
            $("#pages").append($("<button></button>").text(i).click({page:i},
                function (params) {
                    goToPage(params.data.page);
                    colorCurrent($("#pages button"), $(this))
                }
            )); // create page
        }
    } // recount pages END

    function goToPage(page) { // goToPage start
        currentPage = page;
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
    } // goToPage END

}) // document ready END
