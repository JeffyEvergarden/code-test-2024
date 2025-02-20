function person() {
    this.obj = {
      age: 10,
    };
    this.speack=function(){
      console.log('父元素');
    }
  }
  person.prototype.name = "tom";


  //子元素
  function son(name) {
    
  }
  son.prototype = new person(); //原型链继承
  let p1 = new son(1);
  let p2 = new son(2);