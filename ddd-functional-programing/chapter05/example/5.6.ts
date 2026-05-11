const widgetCode1 = new WidgetCode("W1234");
const widgetCode2 = new WidgetCode("W1234");

assert.deepEqual(widgetCode1, widgetCode2);

const name1 = new PeronalName("Alex", "Adams");
const name2 = new PeronalName("Alex", "Adams");
assert.deepEqual(name1, name2); //true