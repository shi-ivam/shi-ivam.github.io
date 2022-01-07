
l = []

for (let p = 1; p <= 100; p++){
  l.push(p)

};

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

shuffle(l);


console.log(l)
wrapper = document.querySelector('.main')
// console.log(wrapper)
wrapper.style.backgroundColor = "#1AC472"


// for (let x = 0; x < l.length; x++){
//   var s = document.createElement('div');
//   s.style.height = l[x]*5 + "px";
//   s.style.width = "5px";
//   s.style.backgroundColor = "black";
//   wrapper.appendChild(s)
// }

function sleep(ms) {
  console.log(ms)
  return new Promise(resolve => setTimeout(resolve, ms));
}

wrapper.innerHTML = '';
for (let y = 0; y < l.length; y++){
      var s = document.createElement('div');
      s.style.height = l[y]*5 + "px";
      s.style.width = "5px";
      s.style.backgroundColor = "black";
      wrapper.appendChild(s)
      // sleep(250)
    }

setTimeout(async () => {
  x = 0;
  while (x < l.length){
    i = 0
    while (i < (l.length - 1)){
      if (l[i] > l[i+1]){
        f = l[i]
        g = l[i+1]
        l[i] = g;
        l[i+1] = f
      }
      wrapper.innerHTML = '';

      for (let y = 0; y < l.length; y++){
        var s = document.createElement('div');
        s.style.height = l[y]*5 + "px";
        s.style.width = "5px";
        s.style.backgroundColor = "black";
        wrapper.appendChild(s)
      }
      await sleep(25)
      i++
    };

    x++
  }

},100)


