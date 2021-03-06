export default class DateController {
	constructor() {
		this.oneDay = new Date(2012, 3, 9);
		this.anotherDay = new Date(2012, 11, 2, 3, 4, 5);
		
		this.year = this.oneDay.getFullYear();
		this.month = this.oneDay.getMonth();
		this.date = this.oneDay.getDate();

		this.min = new Date(2015, 8, 3);
		this.max = new Date(2016, 2, 1);
		
		this.fromDate = new Date(1995, 1, 3);
		this.toDate = new Date(2016, 7, 6);
		
		this.hour = 3;
		this.minute = 4;
		this.second = 5;
	}
	
	click() {
		alert(111);
	}
}