// Jonathan Behar Homework 6 GifTastic

var myData = ["Baseball", "Soccer", "Swimming", "Running", "Biking", "Tennis", "Hiking", 
"Cheerleading", "Basketball", "Football", "Hockey", "Polo", "Waterpolo", "Tug-O-War", "Fencing", 
"Lightsaber Fencing", "Boxing", "Surfing", "Sailing", "MMA", "Volleyball" ];

$(document).ready(function() {
    renderButton();
    function renderButton() {
        $("#allbuttons").empty();

        for (var i = 0 ; i < myData.length; i++) {

            var newButton = $("<button>");
            newButton.addClass("itembutton");
            newButton.addClass("btn btn-sky btn-lg");
            newButton.text(myData[i] + ")"); // the ")" is a font styling to end the curling of the text using Team Spirit NF font
            newButton.attr("data-name", myData[i]);
            $("#allbuttons").append(newButton);
        }
    }

    $("#addbutton").on("click",  function(event) {
        
        event.preventDefault();
        var addedData = $("#userinput").val().trim();
        if (addedData != "") {
            myData.push(addedData);
            renderButton();
            $("#userinput").val(" ");
        }

    });  

    $(document).on("click", ".itembutton", displayInfo);

    function displayInfo() {
        var itemName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=sports+" + itemName + "&Rating=R&limit=10&api_key=s8WS7CiAcz0fgBMMELRSdL9jPESloiFT";
        // $("#mainimages").empty(); // If I want to add change on click of gif ie empty old gifs add new gifs on button click

        $.ajax ({
            url: queryURL,
            method: "GET"
        }) .then(function(response) {
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var dataImage = $("<img>");
                dataImage.attr("src", results[i].images.fixed_height_still.url);
                dataImage.attr("data-still", results[i].images.fixed_height_still.url);
                dataImage.attr("data-animate", results[i].images.fixed_height.url);
                dataImage.addClass("gif");
                dataImage.attr("data-state", "still");
    
    
                var newItemdiv = $('<div class="newItem">');
                var gifRating = (results[i].rating).toUpperCase();
                var divRating = $("<p>").text("Rating: " + gifRating);
                
                newItemdiv.append(divRating);
                newItemdiv.append(dataImage);
    
                $("#mainimages").prepend(newItemdiv);

            }
    
        }); 

    }


    $("#mainimages").on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }


        else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });

})
