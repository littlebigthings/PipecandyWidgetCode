let checkBoxesCategory = document.querySelectorAll("[category]");

class ADVANCESEARCH {
    constructor() {
        this.checkBoxesCategory = checkBoxesCategory;
        this.clonedTag = document.querySelector(".filter-tag").cloneNode(true);
        this.resetFilter = document.querySelectorAll(".adv-reset-link");
        this.init();
    }

    init() {
        this.addListener();
        this.clearTagsOnLoad();
    }
    // add listener to checkboxes as well as rest button.
    addListener() {
        checkBoxesCategory.forEach(category => {
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
                document.querySelectorAll(".rm-filter").forEach(closebtn => closebtn.click());
            })
        })
    }

    // add or remove tags from their respective container as well as check the condition for visibility.
    updateTags(currCate, value, update) {
        let blockToUpdate = document.querySelector(`[update-category=${currCate}]`);
        if (update) {
            let newTag = this.clonedTag.cloneNode(true);
            newTag.querySelector(".filter-tag-name").innerHTML = value;
            newTag.setAttribute('tag', `${value}`);
            newTag.querySelector(".rm-filter").addEventListener('click', (e) => {
                let getCheckBox = e.target.parentElement.getAttribute("tag");
                document.querySelector(`[value='${getCheckBox}']`).click();
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
        let tagsToRemove = document.querySelector(".adv-category-filter").querySelectorAll(".filter-tag");
        tagsToRemove.forEach(tag => tag.remove());
    }

    // show/hide tags container as well as tags parent container based on the tags present.
    showAndHideContainer(blockToUpdate) {
        let mainWrapper = document.querySelector(".adv-category-filter");
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

if(checkBoxesCategory){
    new ADVANCESEARCH(checkBoxesCategory)
}