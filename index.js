'use strict';

const STORE = {
  item: [{
    name: 'apples',
    toggle: false,
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
  toggle: false,
  search: null,
};
/*
    *Listen to click on item title span
      *Transforms to input
        *Button to update our store, 'ok' button
        *Button to cancel function, 'cancel' button
        *renderShoppingList()

    Search term filter
      *Listen to filter button
        *Take filter input value and filter STORE to only show properties with a matching character set
          *Create filtered store array, pass new array
          *renderShoppingList()
*/

//Component function that filters items displayed via input value given 
function searchVal() {
  $('.js-filter').click(event => {
    event.preventDefault();
    STORE.search = $('.js-filter-input').val();
    console.log(STORE.search);
    // function compareVal()
  });
}

function searchElements() {
  //Component function that grabs value
  console.log(searchVal());
}

//Cycle is going to toggle, toggle between true and false
function cycleStore() {
  !STORE.toggle ? STORE.toggle = true : STORE.toggle = false;
}


// This renders DOM and takes at least one other function!!!
function toggleCheckedItemElements() {
  $('.js-toggle').click(event => {
    event.preventDefault();
    cycleStore()
    renderShoppingList();
  });
}


function generateItemElement(item, itemIndex, template) {
  // console.log(parseInt(itemIndex, 10));
  return `
    <li class="js-item-index-element ${(STORE.item[parseInt(itemIndex, 10)].checked) && STORE.toggle ? 'hide-filter' : ''}" data-item-index="${itemIndex}">
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
  // if e
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
  searchElements();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);