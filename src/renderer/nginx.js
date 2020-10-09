export default class {
    constructor(content) {
        this.content = content;
    }
    getRootDir()
    {
        let lists = this.content.match(/root\s*?(.*?);/i);
        if(lists && lists.length>=2){
            return lists[0].replace(/(^\s*)|(\s*$)/g,"");
        }
        return '';
    }
}