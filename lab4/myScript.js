function showAddArtistContent() {
	var addArtistContent = document.getElementsByClassName("addArtistContent");
	if (addArtistContent[0].style.display === "block") {
		addArtistContent[0].style.display = "none";
	} else {
		addArtistContent[0].style.display = "block";
	}
}

function add() {
	var inputName = document.getElementById("artistName").value;
	var inputAbout = document.getElementById("aboutArtist").value;
	console.log(inputName.length);
	console.log(inputAbout.length);
	if (inputName.length <= 40 && inputAbout.length <= 40) {
		var inputURL = document.getElementById("imageUrl").value;
		var divEachArtist = document.createElement("div");
		divEachArtist.setAttribute("class", "eachArtist");
		var divEachArtistImg = document.createElement("div");
		divEachArtistImg.setAttribute("class", "eachArtistImg");
		var img = document.createElement("img");
		img.setAttribute("src", inputURL);
		divEachArtistImg.appendChild(img);
		divEachArtist.appendChild(divEachArtistImg);
		var divEachArtistContent = document.createElement("div");
		var artist_h5 = document.createElement("h5");
		var artist_p = document.createElement("p");
		artist_p.textContent = inputAbout;
		artist_h5.textContent = inputName;
		divEachArtistContent.setAttribute("class", "eachArtistContent");
		divEachArtistContent.appendChild(artist_h5);
		divEachArtistContent.appendChild(artist_p);
		divEachArtist.appendChild(divEachArtistContent);
		var removeButton = document.createElement("button");
		removeButton.textContent = "Delete";
		removeButton.setAttribute("class", "removeButton");
		removeButton.setAttribute("onclick", "removeArtist(this);");
		divEachArtistContent.appendChild(removeButton);
		var ArtistList = document.getElementsByClassName("ArtistList");
		ArtistList[0].appendChild(divEachArtist);
		var user = { Name: inputName, About: inputAbout, Url: inputURL };
		// console.log(uniqueID());
		saveInLocal(user);

		let hideArtistContent = document.getElementsByClassName(
			"addArtistContent",
		);
		if (hideArtistContent[0].style.display === "none") {
			hideArtistContent[0].style.display = "block";
		} else {
			hideArtistContent[0].style.display = "none";
		}
	} else {
		alert("Need less 40 charactors for Artist Name and About");
	}
}

function removeArtist(btn) {
	let parentNode = btn.parentNode.parentNode.parentNode;
	let currentNode = btn.parentNode.parentNode;
	let index = 0;
	console.log(parentNode);
	while (parentNode.childNodes[index] != currentNode) {
		index++;
	}
	console.log(parentNode.childNodes[index]);
	index = index - 1;
	console.log(index);
	i = index;
	for (; localStorage.getItem(i + 1) != null; i++) {
		localStorage.setItem(i, localStorage.getItem(i + 1));
	}
	removeDataFromLocal(i);
	shows();
}

function removeDataFromLocal(index) {
	localStorage.removeItem(index);
}
function saveInLocal(object) {
	id = localStorageSize();
	localStorage.setItem(id, JSON.stringify(object));
}
function loadDataFromLocal() {
	var objects = [];
	for (var i = 0; localStorage.getItem(i) != null; i++) {
		objects.push(JSON.parse(localStorage.getItem(i)));
	}
	return objects;
}

function localStorageSize() {
	let size = 0;
	while (localStorage.getItem(size) != null) {
		size++;
	}
	return size;
}

function clearDataLocal() {
	localStorage.clear();
}

function searchByName() {
	let objects = loadDataFromLocal();
	let searchResults = [];
	var inputName = document.getElementById("searchName").value.toLowerCase();
	for (var i = 0; i < objects.length; i++) {
		if (objects[i].Name.toLowerCase().search(inputName) >= 0) {
			searchResults.push(objects[i]);
			console.log(inputName.search(objects[i].Name));
		}
	}
	shows(searchResults);
}

function clearUpArtistList() {
	let artistList = document.getElementsByClassName("ArtistList");
	artistList = artistList[0];
	let child = artistList.lastElementChild;
	while (child) {
		artistList.removeChild(child);
		child = artistList.lastElementChild;
	}
}

function shows(objects) {
	clearUpArtistList();
	if (objects == null) {
		objects = loadDataFromLocal();
	}
	for (var i = 0; i < objects.length; i++) {
		var dataURL = objects[i].Url;
		var dataName = objects[i].Name;
		var dataAbout = objects[i].About;
		var divEachArtist = document.createElement("div");
		divEachArtist.setAttribute("class", "eachArtist");
		var divEachArtistImg = document.createElement("div");
		divEachArtistImg.setAttribute("class", "eachArtistImg");
		var img = document.createElement("img");
		img.setAttribute("src", dataURL);
		divEachArtistImg.appendChild(img);
		divEachArtist.appendChild(divEachArtistImg);
		var divEachArtistContent = document.createElement("div");
		var artist_h5 = document.createElement("h5");
		var artist_p = document.createElement("p");
		artist_p.textContent = dataAbout;
		artist_h5.textContent = dataName;
		divEachArtistContent.setAttribute("class", "eachArtistContent");
		divEachArtistContent.appendChild(artist_h5);
		divEachArtistContent.appendChild(artist_p);
		divEachArtist.appendChild(divEachArtistContent);
		var removeButton = document.createElement("button");
		removeButton.textContent = "Delete";
		removeButton.setAttribute("class", "removeButton");
		removeButton.setAttribute("onclick", "removeArtist(this);");
		divEachArtistContent.appendChild(removeButton);
		var ArtistList = document.getElementsByClassName("ArtistList");
		ArtistList[0].appendChild(divEachArtist);
	}
}
shows();
