export default [
  {
    helpTitle: 'Select elements by their type',
    selectorName: 'Type Selector',
    doThis: 'Select apples',
    selector: 'apple',
    syntax: 'A',
    help: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
    examples: [
      '<strong>div</strong> selects all <tag>div</tag> elements.',
      '<strong>p</strong> selects all <tag>p</tag> elements.',
    ],
    boardMarkup: `
    <apple/>
    <apple/>
    `,
  },
  {
    doThis: 'Select jars',
    selector: 'jar',
    syntax: 'A',
    helpTitle: 'Select elements by their type',
    selectorName: 'Type Selector',
    help: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
    examples: [
      '<strong>div</strong> selects all <tag>div</tag> elements.',
      '<strong>p</strong> selects all <tag>p</tag> elements.',
    ],
    boardMarkup: `
    <jar/>
    <apple/>
    <jar/>
    `,
  },
  {
    doThis: 'Select the green apple',
    selector: '#green',
    selectorName: 'ID Selector',
    helpTitle: 'Select elements with an ID',
    syntax: '#id',
    help: 'Selects the element with a specific <strong>id</strong>. You can also combine the ID selector with the type selector.',
    examples: [
      '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
      '<strong>ul#long</strong> selects <tag>ul id="long"</tag>',
    ],
    boardMarkup: `
    <apple/>
    <apple id="green"/>
    <apple/>
    `,
  },
  {
    helpTitle: 'Select an element inside another element',
    selectorName: 'Descendant Selector',
    doThis: 'Select the cherry in the jar',
    selector: 'jar cherry',
    syntax: 'A&nbsp;&nbsp;B',
    help: 'Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.',
    examples: [
      '<strong>p&nbsp;&nbsp;strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>',
      '<strong>#fancy&nbsp;&nbsp;span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="fancy"</strong>',
    ],
    boardMarkup: `
    <cherry/>
    <jar>
      <cherry/>
    </jar>
    <cherry/>
    `,
  },
  {
    doThis: 'Select the apple in the large jar',
    selector: '#large apple',
    helpTitle: 'Combine the Descendant & ID Selectors',
    syntax: '#id&nbsp;&nbsp;A',
    help: 'You can combine any selector with the descendent selector.',
    examples: [
      '<strong>#cool&nbsp;span</strong> selects all <tag>span</tag> elements that are inside of elements with <strong>id="cool"</strong>',
    ],
    boardMarkup: `
    <jar/>
    <jar id="large">
      <apple/>
    </jar>
    <jar>
      <apple/>
    </jar>
    `,
  },
  {
    doThis: 'Select the magic apples',
    selector: '.magic',
    selectorName: 'Class Selector',
    helpTitle: 'Select elements by their class',
    syntax: '.classname',
    help: 'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
    examples: ['<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>'],
    boardMarkup: `
    <apple/>
    <apple class="magic"/>
    <jar>
      <apple class="magic"/>
    </jar>
    <jar/>
    `,
  },
  {
    doThis: 'Select the magic pears',
    selector: 'pear.magic',
    helpTitle: 'Combine the Class Selector',
    syntax: 'A.className',
    help: 'You can combine the class selector with other selectors, like the type selector.',
    examples: [
      '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
      '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>',
    ],
    boardMarkup: `
    <apple/>
    <pear class="magic"/>
    <jar>
      <pear/>
    </jar>
    <jar>
      <pear class="magic"/>
    </jar>
    <apple class="magic"/>`,
  },
  {
    doThis: 'Select the magic pear in the jars',
    selector: 'jar pear.magic',
    syntax: 'Put your back into it!',
    helpTitle: 'You can do it...',
    help: 'Combine what you learned in the last few levels to solve this one!',
    boardMarkup: `
    <jar>
      <pear/>
    </jar>
    <pear class="magic"/>
    <jar>
      <pear class="magic"/>
    </jar>
    <jar>
      <apple class="magic"/>
    </jar>
    <jar>
      <pear class="magic"/>
    </jar>
    `,
  },
  {
    doThis: 'Select all the pears and apple',
    selector: 'pear, apple',
    selectorName: 'Comma Combinator',
    helpTitle: 'Combine, selectors, with... commas!',
    syntax: 'A, B',
    help: 'Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.',
    examples: [
      '<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',
      '<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements',
    ],
    boardMarkup: `
    <cherry class="magic"/>
    <cherry/>
    <plate>
      <pear/>
    </plate>
    <jar>
      <apple/>
    </jar>
    <plate>
      <pear/>
    </plate>
    <cherry/>
    <cherry class="magic"/>
    `,
  },
  {
    doThis: 'Select all the things!',
    selector: '*',
    selectorName: 'The Universal Selector',
    helpTitle: 'You can select everything!',
    syntax: '*',
    help: 'You can select all elements with the universal selector! ',
    examples: ['<strong>p *</strong> selects any element inside all <tag>p</tag> elements.'],
    boardMarkup: `
    <apple/>
    <pear/>
    <jar>
      <pear class="magic" />
    </jar>
    <jar>
      <cherry/>
    </jar>
    <jar>
      <pear/>
    </jar>
    <apple id="green"/>
    `,
  },
  {
    doThis: 'Select everything in a jar',
    selector: 'jar *',
    syntax: 'A&nbsp;&nbsp;*',
    helpTitle: 'Combine the Universal Selector',
    help: 'This selects all elements inside of <strong>A</strong>.',
    examples: [
      '<strong>p *</strong> selects every element inside all <tag>p</tag> elements.',
      '<strong>ul.fancy *</strong> selects every element inside all <tag>ul class="fancy"</tag> elements.',
    ],
    boardMarkup: `
    <jar>
      <pear class="magic"/>
    </jar>
    <jar>
      <pickle/>
    </jar>
    <apple class="magic"/>
    <jar>
      <apple/>
    </jar>`,
  },
  {
    doThis: "Select every apple that's next to a jar",
    selector: 'jar + apple',
    helpTitle: 'Select an element that directly follows another element',
    selectorName: 'Adjacent Sibling Selector',
    syntax: 'A + B',
    help: "This selects all <strong>B</strong> elements that directly follow <strong>A</strong>. Elements that follow one another are called siblings. They're on the same level, or depth. <br/><br/>In the HTML markup for this level, elements that have the same indentation are siblings.",
    examples: [
      '<strong>p + .intro</strong> selects every element with <strong>class="intro"</strong> that directly follows a <tag>p</tag>',
      '<strong>div + a</strong> selects every <tag>a</tag> element that directly follows a <tag>div</tag>',
    ],
    boardMarkup: `
    <jar>
      <apple class="magic"/>
    </jar>
    <apple class="magic"/>
    <apple/>
    <apple class="magic"/>
    <apple class="magic"/>
    `,
  },
  {
    selectorName: 'General Sibling Selector',
    helpTitle: 'Select elements that follows another element',
    syntax: 'A ~ B',
    doThis: 'Select the cherries beside the jar',
    selector: 'jar ~ cherry',
    help: 'You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.',
    examples: ['<strong>A ~ B</strong> selects all <strong>B</strong> that follow a <strong>A</strong>'],
    boardMarkup: `
    <cherry/>
    <jar>
      <pear class="magic"/>
    </jar>
    <cherry class="magic"/>
    <cherry/>
    <jar>
      <cherry/>
    </jar>
    <jar>
      <cherry class="magic"/>
    </jar>
    `,
  },
  {
    selectorName: 'Child Selector',
    syntax: 'A > B&nbsp;',
    doThis: 'Select the apple directly on a plate',
    selector: 'jar > apple',
    helpTitle: 'Select direct children of an element',
    help: 'You can select elements that are direct children of other elements. A child element is any element that is nested directly in another element. <br><br>Elements that are nested deeper than that are called descendant elements.',
    examples: ['<strong>A > B</strong> selects all <strong>B</strong> that are a direct children <strong>A</strong>'],
    boardMarkup: `
    <jar>
      <apple/>
    </jar>
    <apple/>
    <jar/>
    <apple/>
    <apple class="magic"/>
    `,
  },
  {
    selectorName: 'Empty Selector',
    helpTitle: "Select elements that don't have children",
    doThis: 'Select the empty jars',
    selector: 'jar:empty',
    syntax: ':empty',
    help: "Selects elements that don't have any other elements inside of them.",
    examples: ['<strong>div:empty</strong> selects all empty <tag>div</tag> elements.'],
    boardMarkup: `
    <jar/>
    <jar>
      <cherry class="magic"/>
    </jar>
    <jar/>`,
  },
  /*
  {
    selectorName: 'First Child Pseudo-selector',
    helpTitle: 'Select a first child element inside of another element',
    doThis: 'Select the top pear',
    selector: 'plate :first-child',
    syntax: ':first-child',

    help: 'You can select the first child element. A child element is any element that is directly nested in another element. You can combine this pseudo-selector with other selectors.',
    examples: [
      '<strong>:first-child</strong> selects all first child elements.',
      '<strong>p:first-child</strong> selects all first child <tag>p</tag> elements.',
      '<strong>div p:first-child</strong> selects all first child <tag>p</tag> elements that are in a <tag>div</tag>.',
    ],
    boardMarkup: `
    <jar/>
    <jar>
      <cherry />
      <cherry />
      <cherry />
    </jar>
    <cherry class="magic" />
    `,
  },
  /*
  {
    selectorName: 'Only Child Pseudo-selector',
    helpTitle: 'Select an element that are the only element inside of another one.',
    doThis: 'Select the apple and the pickle on the plates',
    selector: 'plate :only-child',
    syntax: ':only-child',
    help: 'You can select any element that is the only element inside of another one.',
    examples: [
      '<strong>span:only-child</strong> selects the <tag>span</tag> elements that are the only child of some other element.',
      '<strong>ul li:only-child</strong> selects the only <tag>li</tag> element that are in a <tag>ul</tag>.',
    ],
    boardMarkup: `
    <plate>
      <apple/>
    </plate>
    <plate>
      <pickle />
    </plate>
    <jar>
      <pickle />
    </jar>
    <plate>
      <pear class="magic"/>
      <pear/>
    </plate>
    <pickle class="magic"/>
    `,
  },
  {
    selectorName: 'Last Child Pseudo-selector',
    helpTitle: 'Select the last element inside of another element',
    doThis: 'Select the magic apple and the pickle',
    selector: '.magic:last-child',
    syntax: ':last-child',
    help: 'You can use this selector to select an element that is the last child element inside of another element. <br><br>Pro Tip &rarr; In cases where there is only one element, that element counts as the first-child, only-child and last-child!',
    examples: [
      '<strong>:last-child</strong> selects all last-child elements.',
      '<strong>span:last-child</strong> selects all last-child <tag>span</tag> elements.',
      '<strong>ul li:last-child</strong> selects the last <tag>li</tag> elements inside of any <tag>ul</tag>.',
    ],
    boardMarkup: `
    <plate id="fancy">
      <apple class="magic"/>
    </plate>
    <plate/>
    <plate>
      <pear class="magic"/>
      <pear>
    </plate>
    <pickle class="magic"/>`,
  },
  {
    selectorName: 'Nth Child Pseudo-selector',
    helpTitle: 'Select an element by its order in another element',
    doThis: 'Select the 3rd plate',
    selector: ':nth-child(3)',
    syntax: ':nth-child(A)',
    help: 'Selects the <strong>nth</strong> (Ex: 1st, 3rd, 12th etc.) child element in another element.',
    examples: [
      '<strong>:nth-child(8)</strong> selects every element that is the 8th child of another element.',
      '<strong>div p:nth-child(2)</strong> selects the second <strong>p</strong> in every <strong>div</strong>',
    ],
    boardMarkup: `
    <plate/>
    <plate/>
    <plate/>
    <plate id="fancy"/>
    `,
  },
  {
    selectorName: 'Nth Last Child Selector',
    helpTitle: 'Select an element by its order in another element, counting from the back',
    doThis: 'Select the 1st jar',
    selector: 'jar:nth-last-child(3)',
    syntax: ':nth-last-child(A)',
    help: 'Selects the children from the bottom of the parent. This is like nth-child, but counting from the back!',
    examples: ['<strong>:nth-last-child(2)</strong> selects all second-to-last child elements.'],
    boardMarkup: `
    <plate/>
    <jar/>
    <plate>
      <pear/>
      <pear/>
      <pear/>
    </plate>
    <jar/>
    `,
  },
  {
    selectorName: 'First of Type Selector',
    helpTitle: 'Select the first element of a specific type',
    doThis: 'Select first apple',
    selector: 'apple:first-of-type',
    syntax: ':first-of-type',
    help: 'Selects the first element of that type within another element.',
    examples: ['<strong>span:first-of-type</strong> selects the first <tag>span</tag> in any element.'],
    boardMarkup: `
    <pear class="magic"/>
    <apple/>
    <apple class="magic"/>
    <apple/>
    <apple class="magic"/>
    <plate>
      <pear class="magic"/>
      <pear/>
    </plate>
    `,
  },
  {
    selectorName: 'Nth of Type Selector',
    doThis: 'Select all even plates',
    selector: 'plate:nth-of-type(even)',
    syntax: ':nth-of-type(A)',
    help: 'Selects a specific element based on its type and order in another element - or even or odd instances of that element.',
    examples: [
      '<strong>div:nth-of-type(2)</strong> selects the second instance of a div.',
      '<strong>.example:nth-of-type(odd)</strong> selects all odd instances of a the example class.',
    ],
    boardMarkup: `
    <plate/>
    <plate/>
    <plate/>
    <plate/>
    <plate id="fancy"/>
    <plate/>
    `,
  },
  {
    selectorName: 'Nth-of-type Selector with Formula',
    doThis: 'Select every 2nd plate, starting from the 3rd',
    selector: 'plate:nth-of-type(2n+3)',
    syntax: ':nth-of-type(An+B)',
    help: 'The nth-of-type formula selects every nth element, starting the count at a specific instance of that element.',
    examples: [
      '<strong>span:nth-of-type(6n+2)</strong> selects every 6th instance of a <tag>span</tag>, starting from (and including) the second instance.',
    ],
    boardMarkup: `
    <plate/>
    <plate>
      <pickle class="magic" />
    </plate>
    <plate>
      <apple class="magic" />
    </plate>
    <plate/>
    <plate>
      <apple />
    </plate>
    <plate/>
    `,
  },
  {
    selectorName: 'Only of Type Selector',
    helpTitle: 'Select elements that are the only ones of their type within of their parent element',
    selector: 'apple:only-of-type',
    syntax: ':only-of-type',
    doThis: 'Select the apple on the middle plate',
    help: 'Selects the only element of its type within another element.',
    examples: [
      '<strong>p span:only-of-type</strong> selects a <tag>span</tag> within any <tag>p</tag> if it is the only <tag>span</tag> in there.',
    ],
    boardMarkup: `
    <plate id="fancy">
      <apple class="magic" />
      <apple />
    </plate>
    <plate>
      <apple class="magic" />
    </plate>
    <plate>
      <pickle />
    </plate>
    `,
  },
  {
    selectorName: 'Last of Type Selector',
    helpTitle: 'Select the last element of a specific type',
    doThis: 'Select the last apple and pear',
    selector: '.magic:last-of-type',
    syntax: ':last-of-type',
    help: 'Selects each last element of that type within another element. Remember type refers the kind of tag, so <tag>p</tag> and <tag>span</tag> are different types. <br><br> I wonder if this is how the last dinosaur was selected before it went extinct.',
    examples: [
      '<strong>div:last-of-type</strong> selects the last <tag>div</tag> in every element.',
      '<strong>p span:last-of-type</strong> selects the last <tag>span</tag> in every <tag>p</tag>.',
    ],
    boardMarkup: `
    <pear class="magic"/>
    <pear class="magic" />
    <pickle />
    <pickle />
    <apple class="magic" />
    <apple class="magic" />
    `,
  },
  {
    selectorName: 'Empty Selector',
    helpTitle: "Select elements that don't have children",
    doThis: 'Select the empty jars',
    selector: 'jar:empty',
    syntax: ':empty',
    help: "Selects elements that don't have any other elements inside of them.",
    examples: ['<strong>div:empty</strong> selects all empty <tag>div</tag> elements.'],
    boardMarkup: `
    <jar/>
    <jar>
      <pickle class="magic"/>
    </jar>
    <plate/>
    <jar/>`,
  },
  {
    selectorName: 'Negation Pseudo-class',
    helpTitle: "Select all elements that don't match the negation selector",
    doThis: 'Select the big apples',
    selector: 'apple:not(.magic)',
    syntax: ':not(X)',
    help: 'You can use this to select all elements that do not match selector <strong>"X"</strong>.',
    examples: [
      '<strong>:not(#fancy)</strong> selects all elements that do not have <strong>id="fancy"</strong>.',
      '<strong>div:not(:first-child)</strong> selects every <tag>div</tag> that is not a first child.',
      '<strong>:not(.big, .medium)</strong> selects all elements that do not have <strong>class="big"</strong> or <strong>class="medium"</strong>.',
    ],
    boardMarkup: `
    <plate id="fancy">
      <apple class="magic" />
    </plate>
    <plate>
      <apple />
    </plate>
    <apple />
    <plate>
      <pear class="magic" />
    </plate>
    <pickle class="magic" />
    `,
  },
  {
    selectorName: 'Attribute Selector',
    helpTitle: 'Select all elements that have a specific attribute',
    doThis: 'Select the items for someone',
    selector: '[for]',
    syntax: '[attribute]',
    help: 'Attributes appear inside the opening tag of an element, like this: <tag>span attribute="value"</tag>. An attribute does not always have a value, it can be blank!',
    examples: [
      '<strong>a[href]</strong> selects all <tag>a</tag> elements that have a <strong>href="anything"</strong> attribute.',
      '<strong>[type]</strong> selects all elements that have a <strong>type="anything"</strong>. attribute',
    ],
    boardMarkup: `
    <jar><apple class="magic"/></jar>
    <apple for="Ethan"/>
    <plate for="Alice"><pickle/></plate>
    <jar for="Clara"><pear/></jar>
    <pickle/>`,
  },
  {
    selectorName: 'Attribute Selector',
    helpTitle: 'Select all elements that have a specific attribute',
    doThis: 'Select the plates for someone',
    selector: 'plate[for]',
    syntax: 'A[attribute]',
    help: 'Combine the attribute selector with another selector (like the tag name selector) by adding it to the end.',
    examples: [
      '<strong>[value]</strong> selects all elements that have a <strong>value="anything"</strong> attribute.',
      '<strong>a[href]</strong> selects all <tag>a</tag> elements that have a <strong>href="anything"</strong> attribute.',
      '<strong>input[disabled]</strong> selects all <tag>input</tag> elements with the <strong>disabled</strong> attribute',
    ],
    boardMarkup: `
    <plate for="Sarah"><pickle/></plate>
    <plate for="Luke"><apple/></plate>
    <plate/>
    <jar for="Steve"><pear/></jar>
    `,
  },
  {
    selectorName: 'Attribute Value Selector',
    helpTitle: 'Select all elements that have a specific attribute value',
    doThis: "Select Vitaly's meal",
    selector: '[for=Vitaly]',
    syntax: '[attribute="value"]',
    help: 'Attribute selectors are case sensitive, each character must match exactly.',
    examples: ['<strong>input[type="checkbox"]</strong> selects all checkbox input elements.'],
    boardMarkup: `
    <apple for="Alexei" />
    <jar for="Albina"><apple /></jar>
    <jar for="Vitaly"><pear/></jar>
    <pickle/>
    `,
  },
  {
    selectorName: 'Attribute Starts With Selector',
    helpTitle: 'Select all elements with an attribute value that starts with specific characters',
    doThis: "Select the items for names that start with 'Sa'",
    selector: '[for^="Sa"]',
    syntax: '[attribute^="value"]',
    // help : "You can use quotes around the value in the selector, or not&mdash;it's optional!",
    examples: [
      '<strong>.toy[category^="Swim"]</strong> selects elements with class <strong>toy</strong> and either <strong>category="Swimwear</strong> or <strong>category="Swimming"</strong>.',
    ],
    boardMarkup: `
    <plate for="Sam"><pickle/></plate>
    <jar for="Sarah"><apple class="magic"/></jar>
    <jar for="Mary"><pear/></jar>
    `,
  },
  {
    selectorName: 'Attribute Ends With Selector',
    helpTitle: 'Select all elements with an attribute value that ends with specific characters',
    doThis: "Select the items for names that end with 'ato'",
    selector: '[for$="ato"]',
    syntax: '[attribute$="value"]',
    help: '',
    examples: ['<strong>img[src$=".jpg"]</strong> selects all images display a <strong>.jpg</strong> image.'],
    boardMarkup: `
    <apple class="magic"/>
    <jar for="Hayato"><pickle/></jar>
    <apple for="Ryota"></apple>
    <plate for="Minato"><pear/></plate>
    <pickle class="magic"/>
    `,
  },
  {
    selectorName: 'Attribute Wildcard Selector',
    helpTitle: 'Select all elements with an attribute value that contains specific characters anywhere',
    syntax: '[attribute*="value"]',
    doThis: "Select the meals for names that contain 'obb'",
    selector: '[for*="obb"]',
    help: 'A useful selector if you can identify a common pattern in things like <strong>class</strong>, <strong>href</strong> or <strong>src</strong> attributes.',
    examples: [
      '<strong>img[src*="/thumbnails/"]</strong> selects all image elements that show images from the "thumbnails" folder.',
      '<strong>[class*="heading"]</strong> selects all elements with "heading" in their class, like <strong>class="main-heading"</strong> and <strong>class="sub-heading"</strong>',
    ],
    boardMarkup: `
    <jar for="Robbie"><apple /></jar>
    <jar for="Timmy"><pickle /></jar>
    <jar for="Bobby"><pear /></jar>
    `,
  },
  */
];
