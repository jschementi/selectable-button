selectable-button.js
====================

A [jQuery][jquery] plugin for turning a `<select>` DOM element into a selectable button, where the button's content is the selected `<option>`'s content, and clicking on the button shows a dropdown of all non-selected `<options>`s.

This plugin generates HTML intended to be styled by [Twitter Bootstrap's][bootstrap] [button dropdown menus][bootstrap-button-dropdowns].


Usage
-----

Include `selectable-button.js` on the HTML page after jQuery:

    <script src="jquery.js"></script>
    <script src="selectable-button.js"></script>

and given the follow `<select>` DOM element:

    <select>
      <option>Choice 1</option>
      <option>Choice 2</option>
      <option>Choice 3</option>
      <option>Choice 4</option>
    </select>

create a selectable button with the following call:

    $('select').selectableButton();


<link type="text/css" rel="stylesheet" href="external/bootstrap/css/bootstrap.css">
<div id="selectable-button-demo" style="padding:20px">
  <select>
    <option value="1">Choice 1</option>
    <option value="2">Choice 2</option>
    <option value="3">Choice 3</option>
    <option value="4">Choice 4</option>
  </select>
</div>
<script src="external/jquery-1.8.1.js"></script>
<script src="external/bootstrap/js/bootstrap.js"></script>
<script src="selectable-button.js"></script>
<script>
  $('#selectable-button-demo > select').selectableButton();
</script>


License
-------

See `LICENSE.MIT.txt`, which is a standard [MIT license][mit].



[jquery]: http://jquery.com
[bootstrap]: http://twitter.github.com/bootstrap
[bootstrap-button-dropdowns]: http://twitter.github.com/bootstrap/components.html#buttonDropdowns
[mit]: http://opensource.org/licenses/mit-license.php