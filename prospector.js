let prospectTagContainer = document.querySelectorAll("[data-block='tech']");
let updateEle = document.querySelectorAll("[data-block='update']");
class PROSPECTOR {
    constructor(){
        this.tagsArry = prospectTagContainer;
        this.textArry = updateEle;
        this.init();
    }

    init(){
        // function to check and update the number of items present in the categories.
        this.checkAndUpdate();
    }

    checkAndUpdate(){
        /*loop through all cms headings -> get the number of tags present -> loop through left qualification crieria box ->
        match with the heading update the number of tags.
        */
        this.tagsArry.forEach(tagItem => {
           let checkHead = tagItem.querySelector(".prosp-tag-head").innerHTML;
           let numberOfTags = [...tagItem.querySelectorAll(".prosp-tag")].filter(tag => !(tag.classList.contains("w-condition-invisible")));
           this.textArry.forEach(item => {
               let confirmHead = item.querySelector(".prosp-tag-head").innerHTML;
                if(checkHead == confirmHead){
                    let updateNumberOfTag = item.querySelector(".num-tag-span");
                    updateNumberOfTag.innerHTML = numberOfTags.length;
                }
           })

        })
    }

}
if(prospectTagContainer && updateEle){
    new PROSPECTOR(prospectTagContainer, updateEle);
}