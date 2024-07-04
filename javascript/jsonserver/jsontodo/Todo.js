class Todo {
    constructor(tdno, tdcontent){
        this.tdno = tdno;
        this.tdcontent = tdcontent;
        this.tdregdate = new Date();
        this.tdcompleted = false;
    }
}