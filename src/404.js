ruyaURL = window.location.pathname
console.log(currentUrl)

const ruyaRef = ref(database, ruyaURL);
onValue(ruyaRef, (snapshot) => {
  const ruyaShared = snapshot.val();
  console.log(ruyaShared)
});

const ruyaRef = ref(database, ruyaURL);
get(ruyaRef).then((snapshot) => {
  if (snapshot.exists()) { // database'de var.
    console.log(snapshot.val());
    //indexteki gibi yazdır
    changeUrl();
  } else { // database'de yok
    console.log("No data available");
    // database e key url value  "yeni" olarak eklenecek
  }
}).catch((error) => {
  console.error(error);
});




// if (currentUrl === get(ref(database, ruyaURL),ruya)){

//     document.getElementById("404html").innerHTML = `
//   <div> 
// <row>
//   <col></col>
//   <col></col>
//   <col>
//     <label>Ruyada</label><br>
//     <label>${ruya}</label><br>
//     <label >gormeniz</label><br>
//     <label >Kicinizin acik kaldigina delalet etmektedir.</label><br>
    
    
// `;
// }

// else {
//     document.getElementById("404html").innerHTML = `
//   <div> 
// <row>
//   <col></col>
//   <col></col>
//   <col>
//     <label>Ruyaniz hayrolsun.</label><br>
    
    
    
    
// `;
// }