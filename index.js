'use strict';

const STORE = {
  item: [{
    name: 'apples',
    checked: false
  },
  {
    name: 'oranges',
    checked: false
  },
  {
    name: 'milk',
    checked: true
  },
  {
    name: 'bread',
    checked: false
  }],
  toggle: true,
};
/*
    *Listen to click on item title span
      *Transforms to input
        *Button to update our store, 'ok' button
        *Button to cancel function, 'cancel' button
        *renderShoppingList()

   Toggle to show
      *Hide elements that have been checked
        *Button to toggle hide filter on checked items
        *Check checked values and hide properties that are checked true
        *renderShoppingList()

    Search term filter
      *Listen to filter button
        *Take filter input value and filter STORE to only show properties with a matching character set
          *Create filtered store array, pass new array
          *renderShoppingList()
*/
//Component function to 


// This renders DOM and takes at least one other function!!!
function toggleCheckedItemElements() {
  $('.js-toggle').click(event => {
    event.preventDefault();
    console.log('toggle check');
    renderShoppingList();
  });
}



function generateItemElement(item, itemIndex, template) {
  // console.log(parseInt(itemIndex, 10));
  return `
    <li class="js-item-index-element ${(!STORE.toggle) ? 'hidden-filter' : ' '}" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join('');
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE.item);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.item.push({ name: itemName, checked: false });
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.item[itemIndex].checked = !STORE.item[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    console.log('`handleDeleteItemClicked` ran');
    // grab current element's location, place into constant
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    console.log(itemIndex);
    // delete item from array
    // 1. take STORE
    // 2. splice STORE
    // 3. run renderShoppingList()
    STORE.item.splice(itemIndex, 1);
    renderShoppingList();
  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  toggleCheckedItemElements();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);