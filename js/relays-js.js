$(async () => {
    async function longPoll() {
        const url = "https://meos.codecadets.com/meos-mop/results-api-relay.php";
        const promise = await fetch(url);
        const data = await promise.json();
        const NavBar = document.getElementById('NavBar');
        const mainResults = document.getElementById('mainResults');
        console.log("Poll")

        $("#NavBar").html("");
        $("#mainResults").html("");
        const navA = document.createElement('a');
        navA.classList.add('navbar-brand')
        navA.setAttribute("href", "#");
        navA.textContent = "Events: ";
        NavBar.appendChild(navA);
        const navButton = document.createElement('button');
        navButton.innerHTML = "<span class='navbar-toggler-icon'></span>";
        navButton.classList.add('navbar-toggler')
        navButton.setAttribute("type", "button");
        navButton.setAttribute("data-toggle", "collapse");
        navButton.setAttribute("data-target", "#navbarText");
        navButton.setAttribute("aria-controls", "navbarText");
        navButton.setAttribute("aria-expanded", "false");
        navButton.setAttribute("aria-label", "Toggle navigation");
        NavBar.appendChild(navButton);
        const navContent = document.createElement('div')
        navContent.classList.add('collapse')
        navContent.classList.add('navbar-collapse')
        navContent.id = "navbarText"
        NavBar.appendChild(navContent);

        const navRow = document.createElement('div')
        navRow.classList.add('row')
        navContent.appendChild(navRow);

        const navCol1 = document.createElement('div')
        navCol1.classList.add('col-6')
        navCol1.classList.add('text-left')
        navRow.appendChild(navCol1);
        const navCol2 = document.createElement('div')
        navCol2.classList.add('col-6')
        navCol2.classList.add('text-right')
        navRow.appendChild(navCol2);


        const navList1 = document.createElement('ul')
        navList1.classList.add('nav')
        navList1.classList.add('navbar-nav')
        navList1.classList.add('ml-auto')
        navCol1.appendChild(navList1);
        const navList2 = document.createElement('ul')
        navList2.classList.add('nav')
        navList2.classList.add('navbar-nav')
        navList2.classList.add('ml-auto')
        navCol2.appendChild(navList2);





        for (var i = 0; i < data.cmpResults.length; i++) {
            if (i % 2 == 0) {
                const listItem = document.createElement('li');
                listItem.classList.add('nav-item')
                navList1.appendChild(listItem);
                const listItemLink = document.createElement('a');
                listItemLink.innerHTML = data.cmpResults[i].clsName;
                listItemLink.classList.add('nav-link')
                listItemLink.setAttribute("href", "#" + removeSlashes(data.cmpResults[i].clsName));
                navList1.appendChild(listItemLink);
            } else {
                const listItem = document.createElement('li');
                listItem.classList.add('nav-item')
                navList2.appendChild(listItem);
                const listItemLink = document.createElement('a');
                listItemLink.innerHTML = data.cmpResults[i].clsName;
                listItemLink.classList.add('nav-link')
                listItemLink.setAttribute("href", "#" + removeSlashes(data.cmpResults[i].clsName));
                navList2.appendChild(listItemLink);
            }




            const table = document.createElement('table');
            table.classList.add('table')
            table.classList.add('table-striped')
            table.classList.add('table-dark')
            table.classList.add('table-bordered')
            mainResults.appendChild(table);

            const br = document.createElement("br");
            mainResults.appendChild(br);

            const tableHead = document.createElement('thead');
            table.appendChild(tableHead);

            const tableRowHead = document.createElement('tr');
            tableHead.appendChild(tableRowHead);

            const tableRowHeadEvent = document.createElement('th');
            tableRowHeadEvent.innerHTML = data.cmpResults[i].clsName;
            tableRowHeadEvent.id = removeSlashes(data.cmpResults[i].clsName);
            tableRowHeadEvent.setAttribute("style", "width: 25%");
            tableRowHeadEvent.setAttribute("scope", "col");
            tableRowHead.appendChild(tableRowHeadEvent);

            const tableRowHeadFinishTime = document.createElement('th');
            tableRowHeadFinishTime.innerHTML = "Finish Time";
            tableRowHeadFinishTime.setAttribute("style", "width: 10%");
            tableRowHeadFinishTime.setAttribute("scope", "col");
            tableRowHead.appendChild(tableRowHeadFinishTime);

            for (var j = 0; j < data.cmpResults[i].legCount; j++) {
                const tableRowHeadSplit = document.createElement('th');
                tableRowHeadSplit.innerHTML = "Leg " + [j+1];
                tableRowHeadSplit.setAttribute("style", "width: 20%");
                tableRowHeadSplit.setAttribute("scope", "col");
                tableRowHead.appendChild(tableRowHeadSplit);
        }

            const tableBody = document.createElement('tbody');
            table.appendChild(tableBody);

            for (var k = 0; k < data.cmpResults[i].clsResults.length; k++) {
                const tableRowBody = document.createElement('tr');
                tableBody.appendChild(tableRowBody);

                const tableRowCellName = document.createElement('td');
                tableRowCellName.innerHTML = data.cmpResults[i].clsResults[k].teamName;
                tableRowCellName.setAttribute("style", "width: 25%");
                tableRowCellName.setAttribute("scope", "row");
                tableRowBody.appendChild(tableRowCellName);

                const tableRowCellFinshTime = document.createElement('td');
                tableRowCellFinshTime.innerHTML = nullCheck(data.cmpResults[i].clsResults[k].finishTime) + " <span style='font-size:10px'>" + nullCheck(data.cmpResults[i].clsResults[k].finishDiff);
                tableRowCellFinshTime.setAttribute("style", "width: 10%");
                tableRowBody.appendChild(tableRowCellFinshTime);

                for (var l = 0; l < data.cmpResults[i].legCount; l++) {
                    const tableRowCellSplit = document.createElement('td');
                    tableRowCellSplit.innerHTML = nullCheck(data.cmpResults[i].clsResults[k].legs[l].time) + " " + nullCheckRank(data.cmpResults[i].clsResults[k].legs[l].rank) + " <span style='font-size:10px'>" + nullCheck(data.cmpResults[i].clsResults[k].legs[l].diff);
                    tableRowCellSplit.setAttribute("style", "width: 20%");
                    tableRowBody.appendChild(tableRowCellSplit);
                }
            }
            const tableRowBottem = document.createElement('tr');
            tableBody.appendChild(tableRowBottem)

            const tableRowCellBottem = document.createElement('td');
            tableRowCellBottem.classList.add('text-center')
            tableRowCellBottem.setAttribute("colspan", 3 + data.cmpResults[i].legCount);
            tableRowCellBottem.setAttribute("scope", "row");
            tableRowBottem.appendChild(tableRowCellBottem);

            const tableRowCellBottemButton = document.createElement('a');
            tableRowCellBottemButton.innerHTML = "Back to Top"
            tableRowCellBottemButton.setAttribute("href", "#");
            tableRowCellBottemButton.setAttribute("role", "button");
            tableRowCellBottemButton.classList.add('btn');
            tableRowCellBottemButton.classList.add('btn-lg')
            tableRowCellBottem.appendChild(tableRowCellBottemButton);

        }

        function removeSlashes(valNum) {
            return valNum.replace(/\//g, '');
        }

        function mToKm(valNum) {
            var km = valNum / 1000;;
            return km.toFixed(1) + " km";
        }

        function nullCheck(valNum) {
            if (valNum == null) {
                return ""
            } else if (valNum == "null") {
                return ""
            } else {
                return valNum
            }
        }

        function nullCheckRank(valNum) {
            if (valNum == null) {
                return ""
            } else {
                return "(" + valNum + ")"
            }
        }
        //Smooth Scroll JavaScript from: https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_eff_animate_smoothscroll
        // J
        $(document).ready(function() {
            // Add smooth scrolling to all links
            $("a").on('click', function(event) {

                // Make sure this.hash has a value before overriding default behavior
                if (this.hash !== "") {
                    // Prevent default anchor click behavior
                    event.preventDefault();

                    // Store hash
                    var hash = this.hash;

                    // Using jQuery's animate() method to add smooth page scroll
                    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top
                    }, 800, function() {

                        // Add hash (#) to URL when done scrolling (default click behavior)
                        window.location.hash = hash;
                    });
                } // End if
            });
        });
    };
    let data = await longPoll();
    setInterval(async () => data = await longPoll(), 30000);
});
