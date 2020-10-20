//Complete the function so that it takes an object of arrays and returns
// a multidimensional array

let sampleObj = {
  'animals': {
    'dogs': ["Pitbull", "sweet"],
    'dragons': ["Smaug", "Epic"],
    'Pigs': ["are probably good pets but you might be weird if you have one"],
  },
  'a-A-strikes': [1,2,3,4,5],
  guitars: {
    Fender: ["Telecaster", "Stratocaster", "Jazzmaster"],
    Gibson: ["Gibson Flying-V", "Firebird", "Les Paul"],
  },
};

function arrayifier(ob) {
  //start empty array
  let result = [];
  //look at each property: value pair
  for (let key in ob) {
    //console.log(ob[key])
    //if property is an array
    if (Array.isArray(ob[key])) {
      //push property and value to result
      result.push(key, ob[key]);
    } else {
      //if not push property and loop through function on next level
      result.push([key, arrayifier(ob[key])]);
    }
  }
  return result;
}


console.log('arrayifier(sampleObj): ', arrayifier(sampleObj));
/*
!arrayifier(sampleObj):  [[ 'animals',[ 'dogs', [Array], 'dragons', [Array], 'Pigs', [Array] ]],'a-A-strikes',[ 1, 2, 3, 4, 5 ],[ 'guitars', [ 'Fender', [Array], 'Gibson', [Array] ] ]]
*/
