$(function() {
  console.log('ready!');

  //   let users = fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then(json => createAlbumForUsers(json));

  let users = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        geo: {
          lat: '-43.9509',
          lng: '-34.4618',
        },
      },
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains',
      },
    },
  ];

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
          .append("<div class='table__cell'>" + 'title' + '</div>')
          .append(
            "<div class='table__cell_userId'>" + 'UserId: ' + userId + '</div>'
          );

        $(table).append(header);

        let div;
        for (let i = 0; i < result.length; i++) {
          if (isOdd(result[i].id)) {
            div = $(
              "<div class='table__row connectedDraggable rowColor id='drag'>"
            );
          } else {
            div = $("<div class='table__row connectedDraggable id='drag'>");
          }

          div.append(
            "<div class='table__cell table__cell--short'>" +
              result[i].id +
              '</div>' +
              "<div class='table__cell table__cell'>" +
              result[i].title +
              '</div>'
          );

          $(table).append(div);

          $('.connectedDraggable').hover(
            function() {
              if ($(this).hasClass('rowColor')) {
                $(this).removeClass('rowColor');
              }
              $(this).addClass('hover');
            },
            function() {
              let albumId = $(this)[0].innerText.split('\n')[0];
              if (isOdd(albumId)) {
                $(this).addClass('rowColor');
              }
              $(this).removeClass('hover');
            }
          );

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
  $('input').keyup(function() {
    searchInput = this.value;
    //   console.log('serch txt', this.value)
  });

  $('#button')
    .button()
    .click(function() {
      // console.log(searchInput)
      console.log('clicked');
      search(searchInput);
    });
});

function drag(userId) {
  $('.connectedDraggable').draggable({
    helper: 'clone',
    revert: 'invalid',
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
  console.log('in search', str);
  let rows = $('.table')
    .find('.connectedDraggable')
    .hide();
  console.log('rows', rows);
  if (str.length > 1) {
    let data = str.split(' ');
    $.each(data, function(i, v) {
      rows.filter(":contains('" + v + "')").show();
    });
  } else rows.show();
}

function isOdd(num) {
  if (num % 2 !== 0) {
    return true;
  } else {
    return false;
  }
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

/* ----------------------------------------------------------------------------*/
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
