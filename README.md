# item-selector

web component for selecting products and adding them to cart

__Possible attributes:__

- id
- item-id
- item-link
- height
- width
- img-src
- router-type

__Custom events:__

- select-item
- deselect-item

## Installation


```bash
npm i item-selector
```

## Usage

```html
<!Doctype html>
<html>
    <head>
        <title>title</title>
    </head>
    <body>
        <item-selector selected="true" height="225px" width="200px" img-src="./img/item.png">
    </body>
    <script>
        document.querySelector("item-selector")
		.addEventListener("select-item", add);
		
        document.querySelector("item-selector"
		).addEventListener("deselect-item", remove);

        function add() {console.log("product is selected")}    
	function remove() { console.log("product is unselected")}

	</script>
</html>``
