class AnimasiSection{
	speed = 75
	minimal = 10
	a = [];
	set(){
		console.log(this.a);
		this.paths.forEach(e => {
			this.a.push(e.getAttribute('d'));
		})
		this.a = this.a.map((m)=>{
			let buff1 = m.split(',');
			let buff3 = [];
			buff1.forEach(function(e,i) {
				let buff2 = e;
				if(i !== 0 && i < (buff1.length/2) && Number(e) != e){
					if(e.search('L') > -1){
						buff2 = e.split('L');
						buff2.push('L')
					}else if(e.search('C') > -1){
						buff2 = e.split('C');
						buff2.push('C')
					}
					if(Math.round(Math.random()) == 0){
						buff2.push('up');
					}else{
						buff2.push('down');
					}
				}
				buff3.push(buff2);
			});
			return buff3;
		});
	}
	constructor(query){
		this.svg = document.querySelector(query);
		this.paths = this.svg.querySelectorAll('path');
		this.height = this.svg.getBBox().height;
		console.log('mulai set')
		this.set();
		console.log('selesai set')
	}
	run(){
		// console.log(this.a)
		this.a = this.a.map( e => {
			e = e.map(i => {
				if(Array.isArray(i)){
					if(i[3] == 'up'){
						i[0] = Number(i[0])-1;
						if(i[0] <= this.minimal){
							i[3] = 'down';
						}
					}else{
						i[0] = Number(i[0])+1 ;
						if(i[0] >= this.height-this.minimal){
							i[3] = 'up';
						}
					}
				}
				return i;
			})
			return e;
		});
		// membuat atribut d
		this.paths.forEach((e,i)=>{
			let buff = '';
			this.a[i].forEach((element, index)=>{
				if(Array.isArray(element)){
					if(element[2] == 'L'){
						buff += (element[0]+'L'+element[1]);
					}else if(element[2] == 'C'){
						buff += (element[0]+'C'+element[1]);
					}else{
						buff += element[0];
					}
				}else{
					buff += element;
				}
				if(index !== this.a[i].length-1){
					buff += ', ';
				}
			})
			this.paths[i].setAttribute('d',buff);
		});
		// console.log(this.a)
		setTimeout(this.run.bind(this), this.speed);
	}		
}