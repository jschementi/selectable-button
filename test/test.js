var assert = chai.assert;

function createSelectableButton () {
  $('#fixture').html('<select><option value="a">1</option><option value="b">2</option><option value="c">3</option></select>');
  this.selectEl = $('#fixture > select');
  var el = this.selectEl.selectableButton();

  assert.ok(this.selectEl.length === 1);
  assert.equal(el[0], this.selectEl[0]);
}

function selectOption (el, idx) {
  var prev = el[0].selectedIndex;
  el[0].selectedIndex = idx;
  el.trigger('change');
  return function () {
      selectOption(el, prev);
  };
}

function selectButtonItem (el, idx) {
  var prevVal = $('a > .title', el).data('value');
  var item = $('.dropdown-menu > li', el).eq(idx);
  $('a', item).click();
  return function () {
    $('.dropdown-menu > li > a').filter(function () {
        return $(this).data('value') === prevVal;
    }).click();
  };
}

after(function () {
  $('#fixture').empty();
});

describe('Creating a selectable button', function () {

  before(function () {
    createSelectableButton.call(this);
  });
  
  it('hides the <select> DOM element', function () {
    assert.isFalse(this.selectEl.is(':visible'));
  });

  it('sets the button title to the initial selected <option>', function () {
    assert.equal($('a > .title', this.selectEl.parent()).html(), '1');
    assert.equal($('a > .title', this.selectEl.parent()).data('value'), 'a');
  });

  it('populates the dropdown with the remaining <option> content', function () {
    var items = $('.dropdown-menu > li', this.selectEl.parent());
    assert.equal(items.length, 2);
    assert.equal($('a', items.eq(0)).html(), '2');
    assert.equal($('a', items.eq(0)).data('value'), 'b');
    assert.equal($('a', items.eq(1)).html(), '3');
    assert.equal($('a', items.eq(1)).data('value'), 'c');
  });

  function assertDropdownItems (actualItems, expectedItems) {
    assert.equal(actualItems.length, expectedItems.length);
    for (var i = 0, expected; expected = expectedItems[i++];) {
      assert.equal($('a', actualItems[i-1]).html(), expected.html);
      assert.equal($('a', actualItems[i-1]).data('value'), expected.value);
    }
  }

  describe('and changing the selected item in the <select> DOM element', function () {

    before(function () {
      this.revert = selectOption(this.selectEl, 1);
    });

    after(function () {
      this.revert();
    });

    it('updates the button title to the newly selected <option>', function () {
      assert.equal($('a > .title', this.selectEl.parent()).html(), '2');
      assert.equal($('a > .title', this.selectEl.parent()).data('value'), 'b');
    });

    it('updates the dropdown to have a new set of items', function () {
      var items = $('.dropdown-menu > li', this.selectEl.parent());
      assertDropdownItems(items, [
        {html: '1', value: 'a'},
        {html: '3', value: 'c'}
      ]);
    });
  });

  describe('and selecting an item from the button\'s dropdown', function () {

    before (function () {
      this.revert = selectButtonItem(this.selectEl.parent(), 1);
    });

    after (function () {
      this.revert();
    });

    it('updates the selected <option> in the original <select> DOM element', function () {
      assert.equal(this.selectEl.val(), 'c');
      assert.equal($('option:selected', this.selectEl).html(), '3');
      assert.equal(this.selectEl[0].selectedIndex, 2);
    });

    it('updates the dropdown to have a new set of items', function () {
      var items = $('.dropdown-menu > li', this.selectEl.parent());
      assertDropdownItems(items, [
        {html: '1', value: 'a'},
        {html: '2', value: 'b'}
      ]);
    });

  });

});

