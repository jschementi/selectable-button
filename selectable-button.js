(function ($) {

  var container = '<div class="btn-group selectable-button"/>';

  var template = '<a class="btn dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);">' +
                 '  <span class="title"></span>' +
                 '  <span class="caret"></span>' +
                 '</a>' +
                 '<ul class="dropdown-menu">' +
                 '</ul>';

  var itemTemplate = function (title, value) {
    return '<li>' +
           '  <a href="javascript:void(0)" data-value="'+value+'">'+title+'</a>' +
           '</li>';
  };

  function onSelectChange (btnEl, selectEl, btnEvt, selectEvt) {
    return function () {
      if ($(this).data('ignorechange')) return;
      if (!btnEvt && !selectEvt) return;
      var selectedOption = $('option:selected', this);
      $('.title', btnEl).html(selectedOption.html());
      $('.title', btnEl).data('value', selectedOption.val());
      populateButtonMenu(btnEl, selectEl);
      var val = $('option:selected', this).val();
      var anchor = $('.dropdown-menu a', btnEl).filter(function () {
        return $(this).data('value') === val;
      });
      onButtonChange(btnEl, selectEl, false, selectEvt).apply(anchor);
    };
  }        

  function onButtonChange (btnEl, selectEl, btnEvt, selectEvt) {
    return function () {
      if (!btnEvt && !selectEvt) return;
      selectEl.val($(this).data('value'));
      onSelectChange(btnEl, selectEl, btnEvt, false).apply(selectEl);
      selectEl.data('ignorechange', true);
      selectEl.trigger('change');
      selectEl.data('ignorechange', false);
    };   
  }

  function populateButtonMenu (el, selectEl) {
    $('.dropdown-menu', el).empty();
    $('option', selectEl).each(function () {
      if (this.selected) return;
      var menuItemEl = $(itemTemplate($(this).html(), $(this).val()));
      $('.dropdown-menu', el).append(menuItemEl);
      $('a', menuItemEl).click(onButtonChange(el, selectEl, true, false));
    });
  }
      
  function selectableButton () {
    $(this).each(function () {
      var selectEl = $(this).hide();
      var el = selectEl.wrap(container).parent().prepend(template);
      selectEl.change(onSelectChange(el, selectEl, false, true));
      onSelectChange(el, selectEl, false, true).apply(selectEl);
    });
    return $(this);
  }

  $.fn.selectableButton = selectableButton;

})(jQuery);
