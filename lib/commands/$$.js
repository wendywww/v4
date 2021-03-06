/**
 * The `$$` command is a short way to call the [`elements`](/api/protocol/elements.html) command in order
 * to fetch multiple elements on the page. It returns an array with element results that will have an
 * extended prototype to call action commands without passing in a selector. However if you still pass
 * in a selector it will look for that element first and call the action on that element.
 *
 * Using the wdio testrunner this command is a global variable else it will be located on the browser object instead.
 *
 * You can chain `$` or `$$` together in order to walk down the DOM tree.
 *
 * <example>
    :index.html
    <ul id="menu">
        <li><a href="/">Home</a></li>
        <li><a href="/">Developer Guide</a></li>
        <li><a href="/">API</a></li>
        <li><a href="/">Contribute</a></li>
    </ul>

    :$.js
    it('should get text from a menu link', function () {
        var text = $('#menu');

        console.log(text.$$('li')[2].$('a').getText()); // outputs: "API"
        // same as
        console.log(text.$$('li')[2].getText('a'));
    });
 * </example>
 *
 * @alias $$
 * @param {String} selector  selector to fetch multiple elements
 * @type utility
 *
 */
import { W3C_ELEMENT_ID } from "../helpers/constants";

let $$ = function (selector) {
    return this.elements(selector).then((res) => res.value.map((el, i) => {
        el.value = { ELEMENT: el.ELEMENT, [W3C_ELEMENT_ID]: el.ELEMENT };
        el.selector = selector
        el.index = i
        return el
    }))
}

export default $$
