$(function() {
  let users = fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => createAlbumForUsers(json));

  function createTable(userId) {
    let selectedArr = [];

    let response1 = fetch(
      'https://jsonplaceholder.typicode.com/albums?userId=' + userId
    )
      .then(response => response.json())
      .then(function(result) {

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
          let albumId = result[i].id;
          if (isOdd(result[i].id)) {
            div = $(
              `<div class='table__row${albumId} table__row connectedDraggable rowColor id='drag'>`
            );
          } else {
            div = $(
              `<div class='table__row${albumId} table__row connectedDraggable id='drag'>`
            );
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

          // Highlight on mouse-over
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

          // Single Selection
          $('.connectedDraggable').draggable({
            helper: 'clone',
            revert: 'invalid',
            drag: function(event, ui) {
              let selected = ui.helper.addClass('selected');
              let container = $('<div/>').attr('id', '.draggingContainer');
              container.append(selected.clone().removeClass('selected hover'));
              return container;
            },
          });

          // Multi Selection
          let $select = $(`input[name=${albumId}]`);

          $select.on('click', function() {
            let selectedRow = $(`div.table__row${albumId}`);
            selectedRow.addClass('selected');
            selectedArr.push(selectedRow);

            $(`#table${userId} .table__row`).draggable({
              helper: function() {
                let selected = $('div.selected');
                if (selected.length === 0) {
                  selected = $(this).addClass('selected');
                }
                let container = $('<div/>').attr('id', '.draggingContainer');
                container.append(
                  selected.clone().removeClass('selected hover')
                );
                return container;
              },
            });
          });
        }

        makeDraggable(userId);
        makeDraggableGroup(userId);
      });
  }

  function createAlbumForUsers(userArr) {
    for (let i = 0; i < userArr.length; i++) {
      createTable(userArr[i].id);
    }
  }

  createAlbumForUsers(users);

  // Text search
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
  $(`#table${userId}`).droppable({
    drop: function(event, ui) {
      $(`#table${userId}`).append(ui.helper.children());
      $('.selected').remove();
    },
  });
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
