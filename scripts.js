$(function() {
  console.log('ready!');

    // let users = fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(json => createAlbumForUsers(json));

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
    let selectedArr = []

    let response1 = fetch(
      'https://jsonplaceholder.typicode.com/albums?userId=' + userId
    )
      .then(response => response.json())
      .then(function(result) {
        console.log('response - result', result);

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
            let albumId = result[i].id
          if (isOdd(result[i].id)) {
            div = $(
              `<div class='table__row${albumId} table__row connectedDraggable rowColor id='drag'>`
            );
          } else {
            div = $(`<div class='table__row${albumId} table__row connectedDraggable id='drag'>`);
          }

          div.append(
            "<div class='table__cell table__cell--short'>" +
              result[i].id +
              '</div>' +
              "<div class='table__cell table__cell'>" +
              result[i].title +
              '</div>' +
              "<div class='table__cell table__cell--short'>" +
              `<input name=${albumId} type='checkbox'>` +
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

          $('.connectedDraggable').draggable({
            helper: 'clone',
            revert: 'invalid',
            drag: function(event, ui) {
            //   ui.helper.addClass('selected');
              let selected = ui.helper.addClass('selected');
              console.log('selected single', selected)
              let container = $('<div/>').attr('id', '.draggingContainer')
                container.append(selected.clone().removeClass('selected hover'))
                console.log('container', container)
                console.log('container single childnodes', container[0].children.length)

            return container
            },
          });

        //   $(`#table${userId}`).droppable({
        //     drop: function(event, ui) {
        //         console.log('ui----- single', ui)
        //       //   console.log('dropppppppp', 'event', event);
        //       ui.draggable.addClass('dropped');
        //       $(`#table${userId}`).append(ui.helper.children())
        //       $('.selected').remove()
        //     }
        //  })

        //  $(`#table${userId}`).droppable({
        //     drop: function (event, ui) {
        //         console.log('ui----- group', ui)
        //         $(`#table${userId}`).append(ui.helper.children()).append(ui.helper.children().prevObject)
        //         $('.selected').remove()

        //         console.log('ui.helper.children', ui.helper.children())


        //     }
        // })

          // Multi Selection
          let $select = $(`input[name=${albumId}]`)

          $select.on('click', function() {
            // if ( $(this).is(':checked') ) {
                console.log('this', $(this))
                console.log('checked-------------')
                let selectedRow = $(`div.table__row${albumId}`)

                // selectedRow.removeClass('rowColor').addClass('selected')
                selectedRow.addClass('selected')
                selectedArr.push(selectedRow)
            // }

            console.log('selectedArr', selectedArr)



            $(`#table${userId} .table__row`).draggable({
                helper: function() {
                    let selected = $('div.selected')

                    console.log('selected multi------', selected)

                    if (selected.length === 0) {
                        selected = $(this).addClass('selected')
                    }
                    let container = $('<div/>').attr('id', '.draggingContainer')
                    container.append(selected.clone().removeClass('selected hover'))

                    console.log('container multi childnodes', container[0].children[0].children.length)

                    return container
                }
            })

          })

        }

            makeDraggable(userId);
            makeDraggableGroup(userId)
      });

  }

  function createAlbumForUsers(userArr) {
    for (let i = 0; i < userArr.length; i++) {
      createTable(userArr[i].id);
    }
  }

  createAlbumForUsers(users);




// TEXT SEARCH
  let searchInput;
  $('input').keyup(function() {
    searchInput = this.value;
  });

  $('#button')
    .button()
    .click(function() {
      if (searchInput.length > 0) {
        search(searchInput);
      }
    });
});


function makeDraggableGroup(userId) {
    console.log('userId', userId)
    console.log('group triggered')

        $(`#table${userId}`).droppable({
            drop: function (event, ui) {
                console.log('ui----- group', ui)
                $(`#table${userId}`).append(ui.helper.children())
                $('.selected').remove()

            }
        })

}



function makeDraggable(userId) {
        $(`#table${userId}`).droppable({
            drop: function(event, ui) {
              ui.draggable.addClass('dropped');
              $(`#table${userId}`).append(ui.draggable);

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

            },
          });
}

function search(str) {
  let rows = $('.table')
    .find('.connectedDraggable')
    .hide();
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
