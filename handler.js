let handlers = {
	menuHandler: function(e) { 
		document.querySelector('.active').classList.remove("active");
		e.target.classList.add("active");
		let clone;
		switch(e.target.id) {
			case "links": 
				clone = handlers.menuHandler.loadTemplate('#linksTemplate');				
				break;
			case "about":
				clone = handlers.menuHandler.loadTemplate('#aboutTemplate');
				break;
			default:
				document.querySelector('#mainContainer').style.display = "block";
				document.querySelector('#menuBody').style.display = "none";			
		}
		if(clone){
			return clone;
		}		
	}
}
export {handlers};

