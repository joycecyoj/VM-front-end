$(function() {
  console.log('ready!');

  let users = fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => createAlbumForUsers(json))

  function createTable(userId) {
    let response1 = fetch(
      'https://jsonplaceholder.typicode.com/albums?userId=' + userId
    )
      .then(response => response.json())
      .then(function(result) {
        // console.log('response - result', result)

        let table = $(`<div class='table' id=table${userId}>`);
        $('main').append(table);

        let header = $("<div class='table__row table__header'>")
          .append(
            "<div class='table__cell table__cell--short'>" + 'id' + '</div>'
          )
          .append("<div class='table__cell'>" + 'title' + '</div>');

        $(table).append(header);

        let div;
        for (let i = 0; i < result.length; i++) {
          div = $("<div class='table__row connectedDraggable id='drag'>");
          div.append(
            "<div class='table__cell table__cell--short'>" +
              result[i].id +
              '</div>' +
              "<div class='table__cell table__cell'>" +
              result[i].title +
              '</div>'
          );

          $(table).append(div);

          drag(userId);
        }

      });
  }

  function createAlbumForUsers(userArr) {
    for (let i = 0; i < userArr.length; i++) {
      createTable(userArr[i].id);
    }
  }

  createAlbumForUsers(users);

  let searchInput;
  $("input").keyup(function() {
      searchInput = this.value
    //   console.log('serch txt', this.value)
  })

  $("#button").button().click(function(){
    // console.log(searchInput)
    console.log('clicked')
    search(searchInput)
})

  //   let response1 = fetch('https://jsonplaceholder.typicode.com/albums?userId=1')
  //     .then(response => response.json())
  //     .then(function(result) {
  //       // console.log('response - result', result)
  //       let div;
  //       for (let i = 0; i < result.length; i++) {
  //         div = $("<div class='table__row connectedDraggable id='drag'>");
  //         div.append(
  //           "<div class='table__cell table__cell--short'>" +
  //             result[i].id +
  //             '</div>' +
  //             "<div class='table__cell table__cell'>" +
  //             result[i].title +
  //             '</div>'
  //         );
  //         $('#table1').append(div);

  //         drag(1);
  //       }
  //     });

  //   let response2 = fetch('https://jsonplaceholder.typicode.com/albums?userId=2')
  //     .then(response => response.json())
  //     .then(function(result) {
  //       let div;
  //       for (let i = 0; i < result.length; i++) {
  //         div = $("<div class='table__row'>");
  //         div.append(
  //           "<div class='table__cell table__cell--short'>" +
  //             result[i].id +
  //             '</div>' +
  //             "<div class='table__cell table__cell'>" +
  //             result[i].title +
  //             '</div>'
  //         );
  //         $('#table2').append(div);
  //       }
  //     });
});

function drag(userId) {
  $('.connectedDraggable').draggable({
    helper: 'clone',
    revert: 'invalid',
    refreshPositions: true,
    drag: function(event, ui) {
      ui.helper.addClass('draggable');
    },
  });

  $('#table' + userId).droppable({
    drop: function(event, ui) {
      //   console.log('dropppppppp', 'event', event);
      ui.draggable.addClass('dropped');
      $('#table' + userId).append(ui.draggable);

      let albumId = ui.draggable[0].innerText.split('\n')[0];
      let albumTitle = ui.draggable[0].innerText.split('\n')[1];

      fetch('https://jsonplaceholder.typicode.com/albums/' + albumId, {
        method: 'PUT',
        body: JSON.stringify({
          userId: userId,
          id: albumId,
          title: albumTitle,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(json => console.log(json));

      fetch('https://jsonplaceholder.typicode.com/albums?userId=2')
        .then(response => response.json())
        .then(json => console.log(json));
    },
  });
}


function search(str) {
    let rows = $()
}

/* ----------------------------------------------------------------------------*/
// using ajax to Display
// $.ajax({
//     url: "https://jsonplaceholder.typicode.com/albums?userId=1",
//     success: function(result) {
//     let div;
//         for (let i = 0; i < result.length; i++) {
//             div = $("<div class='table__row'>")
//             div.append("<div class='table__cell table__cell--short'>" + result[i].id + "</div>" + "<div class='table__cell table__cell'>" + result[i].title + "</div>")
//             $('#table1').append(div)
//         }
//     }
// })

// $.ajax({
//     url: "https://jsonplaceholder.typicode.com/albums?userId=2",
//     success: function(result) {
//     let div;
//         for (let i = 0; i < result.length; i++) {
//             div = $("<div class='table__row'>")
//             div.append("<div class='table__cell table__cell--short'>" + result[i].id + "</div>" + "<div class='table__cell table__cell'>" + result[i].title + "</div>")
//             $('#table2').append(div)
//         }
//     }
// })
