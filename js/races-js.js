$(async () => {
  async function longPoll() {
      const url = "https://meos.codecadets.com/meos-mop/results-api.php";
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

      const navColM = document.createElement('div')
      navColM.classList.add('col-4')
      navColM.classList.add('text-left')
      navRow.appendChild(navColM);
      const navCol = document.createElement('div')
      navCol.classList.add('col-4')
      navCol.classList.add('text-center')
      navRow.appendChild(navCol);
      const navColW = document.createElement('div')
      navColW.classList.add('col-4')
      navColW.classList.add('text-right')
      navRow.appendChild(navColW);

      const navListM = document.createElement('ul')
      navListM.classList.add('nav')
      navListM.classList.add('navbar-nav')
      navListM.classList.add('ml-auto')
      navColM.appendChild(navListM);
      const navList = document.createElement('ul')
      navList.classList.add('nav')
      navList.classList.add('navbar-nav')
      navList.classList.add('ml-auto')
      navCol.appendChild(navList);
      const navListW = document.createElement('ul')
      navListW.classList.add('nav')
      navListW.classList.add('navbar-nav')
      navListW.classList.add('ml-auto')
      navColW.appendChild(navListW);




      for (var i = 0; i < data.cmpResults.length; i++) {
          if (data.cmpResults[i].clsName.slice(0, 3) == "M/W") {
              const listItem = document.createElement('li');
              listItem.classList.add('nav-item')
              navList.appendChild(listItem);
              const listItemLink = document.createElement('a');
              listItemLink.innerHTML = data.cmpResults[i].clsName;
              listItemLink.classList.add('nav-link')
              listItemLink.setAttribute("href", "#" + removeSlashes(data.cmpResults[i].clsName));
              navList.appendChild(listItemLink);
          } else if (data.cmpResults[i].clsName.charAt(0) == "M") {
              const listItemM = document.createElement('li');
              listItemM.classList.add('nav-item')
              navListM.appendChild(listItemM);
              const listItemLinkM = document.createElement('a');
              listItemLinkM.innerHTML = data.cmpResults[i].clsName;
              listItemLinkM.classList.add('nav-link')
              listItemLinkM.setAttribute("href", "#" + data.cmpResults[i].clsName);
              listItemM.appendChild(listItemLinkM);
          } else if (data.cmpResults[i].clsName.charAt(0) == "W") {
              const listItemW = document.createElement('li');
              listItemW.classList.add('nav-item')
              navListW.appendChild(listItemW);
              const listItemLinkW = document.createElement('a');
              listItemLinkW.innerHTML = data.cmpResults[i].clsName;
              listItemLinkW.classList.add('nav-link')
              listItemLinkW.setAttribute("href", "#" + data.cmpResults[i].clsName);
              listItemW.appendChild(listItemLinkW);
          } else {
              const listItem = document.createElement('li');
              listItem.classList.add('nav-item')
              navList.appendChild(listItem);
              const listItemLink = document.createElement('a');
              listItemLink.innerHTML = data.cmpResults[i].clsName;
              listItemLink.classList.add('nav-link')
              listItemLink.setAttribute("href", "#" + data.cmpResults[i].clsName);
              navList.appendChild(listItemLink);
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
          tableRowHeadEvent.innerHTML = data.cmpResults[i].clsName + ": <span style='font-weight: normal; font-size: 16px'>" + mToKm(data.cmpResults[i].length) + " • " + data.cmpResults[i].course;
          tableRowHeadEvent.id = removeSlashes(data.cmpResults[i].clsName);
          tableRowHeadEvent.setAttribute("style", "width: 25%");
          tableRowHeadEvent.setAttribute("scope", "col");
          tableRowHead.appendChild(tableRowHeadEvent);

          const tableRowHeadClub = document.createElement('th');
          tableRowHeadClub.textContent = "Club";
          tableRowHeadClub.setAttribute("style", "width: 10%");
          tableRowHeadClub.setAttribute("scope", "col");
          tableRowHead.appendChild(tableRowHeadClub);

          const tableRowHeadTotal = document.createElement('th');
          tableRowHeadTotal.textContent = "Total Time";
          tableRowHeadTotal.setAttribute("style", "width: 10%");
          tableRowHeadTotal.setAttribute("scope", "col");
          tableRowHead.appendChild(tableRowHeadTotal);

          for (var j = 0; j < data.cmpResults[i].radioCount; j++) {
              const tableRowHeadSplit = document.createElement('th');
              tableRowHeadSplit.innerHTML = "Split " + [j + 1] + " - " + mToKm(data.cmpResults[i].radioInfo[j].distance);
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
              tableRowCellName.innerHTML = data.cmpResults[i].clsResults[k].competitor;
              tableRowCellName.setAttribute("style", "width: 25%");
              tableRowCellName.setAttribute("scope", "row");
              tableRowBody.appendChild(tableRowCellName);

              const tableRowCellClub = document.createElement('td');
              tableRowCellClub.innerHTML = data.cmpResults[i].clsResults[k].club;
              tableRowCellClub.setAttribute("style", "width: 10%");
              tableRowBody.appendChild(tableRowCellClub);

              const tableRowCellFinshTime = document.createElement('td');
              tableRowCellFinshTime.innerHTML = nullCheck(data.cmpResults[i].clsResults[k].finishTime) + " <span style='font-size:10px'>" + nullCheck(data.cmpResults[i].clsResults[k].finishDiff);
              tableRowCellFinshTime.setAttribute("style", "width: 10%");
              tableRowBody.appendChild(tableRowCellFinshTime);

              for (var l = 0; l < data.cmpResults[i].radioCount; l++) {
                  const tableRowCellSplit = document.createElement('td');
                  tableRowCellSplit.innerHTML = nullCheck(data.cmpResults[i].clsResults[k].radios[l].time) + " " + nullCheckRank(data.cmpResults[i].clsResults[k].radios[l].rank) + " <span style='font-size:10px'>" + nullCheck(data.cmpResults[i].clsResults[k].radios[l].diff);
                  tableRowCellSplit.setAttribute("style", "width: 20%");
                  tableRowBody.appendChild(tableRowCellSplit);
              }
          }
          const tableRowBottem = document.createElement('tr');
          tableBody.appendChild(tableRowBottem)

          const tableRowCellBottem = document.createElement('td');
          tableRowCellBottem.classList.add('text-center')
          tableRowCellBottem.setAttribute("colspan", 3 + data.cmpResults[i].radioCount);
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