$(function() {
  console.log('ready!');

  let response1 = fetch('https://jsonplaceholder.typicode.com/albums?userId=1')
    .then(response => response.json())
    .then(function(result) {
      // console.log('response - result', result)
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
        $('#table1').append(div);

        drag(1);
      }
    });

  let response2 = fetch('https://jsonplaceholder.typicode.com/albums?userId=2')
    .then(response => response.json())
    .then(function(result) {
      let div;
      for (let i = 0; i < result.length; i++) {
        div = $("<div class='table__row'>");
        div.append(
          "<div class='table__cell table__cell--short'>" +
            result[i].id +
            '</div>' +
            "<div class='table__cell table__cell'>" +
            result[i].title +
            '</div>'
        );
        $('#table2').append(div);
      }
    });

});

function drag(userId) {
  $('.connectedDraggable').draggable({
    helper: 'clone',
    revert: 'invalid',
    refreshPositions: true,
    drag: function(event, ui) {
      ui.helper.addClass('draggable');
    }
  });

  $('#table2').droppable({
    drop: function(event, ui) {
    //   console.log('dropppppppp', 'event', event);
      ui.draggable.addClass('dropped');
      $('#table2').append(ui.draggable);

      let albumId = ui.draggable[0].innerText.split('\n')[0];
      let albumTitle = ui.draggable[0].innerText.split('\n')[1];

      fetch('https://jsonplaceholder.typicode.com/albums/' + albumId, {
        method: 'PUT',
        body: JSON.stringify({
          userId: 2,
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
        .then(json => console.log(json))
    }
  });


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
