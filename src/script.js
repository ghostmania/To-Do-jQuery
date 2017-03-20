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
        $("#pagination").append($("<button id='prev'><</button>"));
        $("#pagination").append($("<section id='pages'></section>"));
        $("#pagination").append($("<button id='next'>></button>"));
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
            if (allLi%3 == 0 && allLi !== 0){ // create page when actual list is full
                $("#pages").append($("<button></button>").text(++pageCount));
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
                        if (currentTab == "all") {
                            $(this).parent().css("display", "");
                            if (li[0].className !== 'completed'){
                                $("#active_counter").text(++activeLi);
                                $("#completed_counter").text(--completedLi);
                            }
                            else {
                                $("#active_counter").text(--activeLi);
                                $("#completed_counter").text(++completedLi);
                            }
                        } else if (currentTab == "active"){ // hide elements due to status change
                            $(this).parent().css("display", "none");
                            $("#active_counter").text(--activeLi);
                            $("#completed_counter").text(++completedLi);
                        } else { // if currentTab=completed
                            $(this).parent().css("display", "none");
                            $("#active_counter").text(++activeLi);
                            $("#completed_counter").text(--completedLi);
                        }
                })
            );
            li.append($("<button>x</button>").click(function (event) {
                $(event.target).parent().detach(); // remove li when click remove btn
                $("#all_counter").text(--allLi);
                if (currentTab == "active" || currentTab == 'all') {
                    $("#active_counter").text(--activeLi);
                } else if (currentTab == "completed"){
                    $("#completed_counter").text(--completedLi);
                }
                if (allLi%3 == 0 && allLi !== 0){ // remove page when actual list is empty
                   $("#pages button:last-child").remove();
                   --pageCount;
                   // console.log($("#pages button:last-child"));
                }
            }));
            $("#list").append(li); // insert created li to list
            $("#input").val("");
        }
        $("#all_counter").text(++allLi);
        $("#active_counter").text(++activeLi);
        if (currentTab == 'completed') { // hide li if current tab is Completed
            li.hide();
        }
        $("#input").focus();
    }

    function show_all() {
        currentTab = "all";
        $("li").show();
        $("#input").focus();
    }

    function show_active() {
        currentTab = "active";
        $("li").show();
        $(".completed").hide();
        $("#input").focus();
    }

    function show_completed() {
        currentTab = "completed";
        $("li").hide();
        $(".completed").show();
        $("#input").focus();
    }

}) // document ready end
