/**
 * Created by user on 17.03.17.
 */
$(function (){ // document ready start
        $("#input").focus(); // focus input when page is loaded

        var currentTab = "all";
        var activeLi = 0;
        var completedLi = 0;
        var allLi = 0;

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
            li.append($("<span><span/>").text($("#input").val()).dblclick(
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
