// let checkBoxesCategory = document.querySelectorAll("[category]");
// let clonedTag = document.querySelector(".filter-tag");
// let resetFilter = document.querySelectorAll(".adv-reset-link");

let componentWrp = document.querySelectorAll(".comerce-two-block");

let componentObj = [];

class ADVANCESEARCH {
    constructor(options) {
        this.checkBoxesCategory = options.checkBoxesCategory;
        this.clonedTag = options.clonedTag;
        this.resetFilter = options.resetFilter;
        this.wrapper = options.wrapper;
        this.init();
    }

    init() {
        this.addListener();
        this.clearTagsOnLoad();
    }
    // add listener to checkboxes as well as rest button.
    addListener() {
        this.checkBoxesCategory.forEach(category => {
            let checkBoxs = category.querySelectorAll("[type='checkbox']");
            if (!checkBoxs) return;
            checkBoxs.forEach(chkbx => {
                chkbx.addEventListener("click", (e) => {
                    let currCate = category.getAttribute("category");
                    let value = e.target.value;
                    let chkEle = e.target.parentElement.querySelector(".adv-check-tick");
                    let isChecked = chkEle.classList.contains("w--redirected-checked");
                    if (!isChecked) {
                        chkEle.classList.add("w--redirected-checked");
                        this.updateTags(currCate, value, true);
                    }
                    else {
                        chkEle.classList.remove("w--redirected-checked");
                        this.updateTags(currCate, value, false);
                    }
                })
            })
        })
        // reset the filter.
        this.resetFilter.forEach(resetBtn => {
            resetBtn.addEventListener('click', () => {
                this.wrapper.querySelectorAll(".rm-filter").forEach(closebtn => closebtn.click());
            })
        })
    }

    // add or remove tags from their respective container as well as check the condition for visibility.
    updateTags(currCate, value, update) {
        let blockToUpdate = this.wrapper.querySelector(`[update-category=${currCate}]`);
        if (update) {
            let newTag = this.clonedTag.cloneNode(true);
            newTag.querySelector(".filter-tag-name").innerHTML = value;
            newTag.setAttribute('tag', `${value}`);
            newTag.querySelector(".rm-filter").addEventListener('click', (e) => {
                let getCheckBox = e.target.parentElement.getAttribute("tag");
                this.wrapper.querySelector(`[value='${getCheckBox}']`).click();
            })
            blockToUpdate.appendChild(newTag);
            this.showAndHideContainer(blockToUpdate);
        }
        else {
            blockToUpdate.querySelector(`[tag='${value}']`).remove();
            this.showAndHideContainer(blockToUpdate);
        }
    }

    // clear all the tags on load.
    clearTagsOnLoad() {
        let tagsToRemove = this.wrapper.querySelector(".adv-category-filter").querySelectorAll(".filter-tag");
        tagsToRemove.forEach(tag => tag.remove());
    }

    // show/hide tags container as well as tags parent container based on the tags present.
    showAndHideContainer(blockToUpdate) {
        let mainWrapper = this.wrapper.querySelector(".adv-category-filter");
        let tagsLength = mainWrapper.querySelectorAll(".filter-tag").length;
        if (tagsLength > 0) {
            mainWrapper.classList.remove("hide-res");
            if (blockToUpdate.childElementCount > 0) {
                blockToUpdate.parentElement.classList.remove("hide-block");
            }
            else {
                blockToUpdate.parentElement.classList.add("hide-block");
            }
        }
        else {
            mainWrapper.classList.add("hide-res");
            blockToUpdate.parentElement.classList.add("hide-block");
        }

    }
}

// if(checkBoxesCategory && clonedTag && resetFilter){
//     new ADVANCESEARCH(checkBoxesCategory, clonedTag, resetFilter)
// }

componentWrp.forEach(wrapper => {
    let options = {
        checkBoxesCategory : wrapper.querySelectorAll("[category]"),
        clonedTag : wrapper.querySelector(".filter-tag"),
        resetFilter : wrapper.querySelectorAll(".adv-reset-link"),
        wrapper:wrapper,
    }
    new ADVANCESEARCH(options)
})