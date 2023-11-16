const addButton = document.querySelector("#add");

const updateLSData = () => {

    const textAreaData = document.querySelectorAll('textarea'); // I use querySelectorAll() because there will be many notes box not one
                                                                // In textAreaData our data will be stored in Array form ofcourse
    const notes = [];
    console.log(textAreaData);

// I can use forEach, for-in, for-of , Map method etc with Arrays
// forEach method takes three arguments-> current value or element,  current index no. , Array, and "this" argument
// If I want to add values in an Empty Array or in simple array then I can use splice or push method
// Here, I use forEach() method because textAreaData is an Array.

    textAreaData.forEach((note) => {
        return notes.push(note.value); // When we work with textarea or input form then we use .value
    })
    console.log(notes);

// If I want to add data into my local system then I will use setItem
// If I want to get data from my local system then I will use getItem

/* The second argument of setItem or getItem should be the string but 
   here "notes" is an Array to tackle this problem we use JSON.stringify() method. */

// To convert our JS Object like Array, Objects etc. into string we use JSON.stringify() method.

// Now my each Note data will be stored in notes array which is our Key and each Note data is an value of key "notes"
// To see your Local Storage in your PC go to -> Inspect -> Application -> Local Storage -> file://
// If you reload your page at this point your data will be gone but if you see in Application your data is stored in key-value pair
// To show your data when you reload your page, you need to GET DATA

    localStorage.setItem('notes', JSON.stringify(notes));


}

const addNewNote = (text = "") => {

/* Ayya me text atle lidhu che, ke maru je textbox agar ani andar kai data hase to
  apne main div ne show karsi ane textarea ne hidden kari nakhsi. Agar kai data nai
  hoi to apne textarea ne show karsi ane main div ne hidden kari nakhsi */

// Pan ek time par ekaj vastu thase. That means ONE AT A TIME


const note = document.createElement("div");
note.classList.add("note");

const htmlData = `
<div class="operation">
<button class="edit"> <i class="fas fa-edit"></i> </button>
<button class="delete"> <i class="fas fa-trash-alt"></i></button>
</div> 
 
<div class="main ${text ? "": "hidden"} "> </div>         
<textarea class="${text ? "hidden": ""}"></textarea> `;  // If there is text then hide textarea and show main div else show textarea


// <div class="main ${text ? "":       "hidden"} "> </div>     // If there is no text then show textarea and hide main div else show main div       
// <textarea class="${text ? "hidden": ""}"></textarea> `;  // If there is text then hide textarea and show main div else show textarea


// ABOVE EXPLANATION 
/* Ayya me text atle lidhu che, ke maru je textbox agar ani andar kai data hase to
  apne main div ne show karsi ane textarea ne hidden kari nakhsi. Agar kai data nai
  hoi to apne textarea ne show karsi ane main div ne hidden kari nakhsi */

// Pan ek time par ekaj vastu thase. That means ONE AT A TIME 

// ****************************************************************

// Here, I insert my htmlData into note div which i created through JS with the help of insertAdjacentHTML
// I can do this with the help of innerHTML also.

note.insertAdjacentHTML('afterbegin', htmlData);
//  note.innerHtml = htmlData;
 //  console.log(note);

 // getting the References
 const editButton = note.querySelector('.edit');
 const deleteButton = note.querySelector('.delete');
 const mainDiv = note.querySelector('.main');
 const textArea = note.querySelector('textarea');

 // Deleting the Node
 deleteButton.addEventListener('click', () => {

    note.remove(); // .remove() will delete my NOTE or Box
    updateLSData(); 

    // Here, I call  updateLSData(); again because the PROBLEM IS ->
    // When I clicked on the delete button then it delete the Note but when I refresh the page that is again on the page.
    // That means my my Local Storage "notes" key, values is not updating.
    
    /* THAT'S WHY by calling  updateLSData(); function here, first it will normally delete my desired note on that page
       Then by calling this funcion it will update my Local Storage as in the current page(before reloading), deleted note is
       not present and now see  updateLSData(); function so that you will understand clearly. */

 });

 // Toggle using Edit Button
textArea.value = text;           // If there is some default text
mainDiv.innerHTML = text;        // then add that text in textarea and mainDiv

 editButton.addEventListener('click', () =>{
     mainDiv.classList.toggle('hidden');     // toggle() function means toggle between 0 and 1 in general
     textArea.classList.toggle('hidden');    // But here, if my textarea is hidden then unhide it or if mainDiv is unhide then hide it 


 });

/* Th "onchage" event is similar to the oninput event. The difference is that the oninput or 'input' in event listener, event occurs 
   immediately after the value of an element has changed, while onchange occurs when the element loses focus, 
   after the content has been changed. The other difference is that the onchange event also works on <select> elements. */

// So here whenever I lose the focus from the textarea below event will fire

 textArea.addEventListener('change', (event) =>{ // We learned that Event is the main object of all events, that's why we can access its value

  //  console.log(event);        // textarea
    const value = event.target.value;            // By using event.target I get that element on which I click that is textarea
    mainDiv.innerHTML = value;
    // console.log(value);
   //  console.log(event.target);

   updateLSData();                       // Calling Function of Local Storage -> When we use arrow function then first 
                                         // we need to define function and then call it

 });

  document.body.appendChild(note);   // appendChild() method appends a node as the last child of a node --> Node = Element
                                    //  Previously I put my htmlData into note and now I am inserting note into my HTML body
 }

// Getting Data from localStorage
// Now I need to parse my Data as it is in JSON Format
// To turs a string of JSON tet into a JS Object we use JSON.parse()
const notes = JSON.parse(localStorage.getItem('notes'));

/* Now, we need to show data of multiple nodes or multiple notes for that I will use Loop
   and in each iteration I will call my addNewNote(). */

  // BELOW CODE MEANING
  // If there are values inside notes array then loop over each value and call addNewNote(note) functionfor each value

   if(notes){
    notes.forEach((note) => {
      addNewNote(note);
    })
   }
 

addButton.addEventListener('click', () => addNewNote());
 

/* Local Storage and Session Storage */

// The localStorage and sessionStorage properties allow us to save key/value pairs in a web browser. 
// The localStorage object stores data with no expiration date. 
// The data will not be deleted when the browser is closed, and will be available the next day, week or year.