function addButtonToDiv() {
  var mergeMessageDivs = document.getElementsByClassName("merge-message");
  for (var i = 0; i < mergeMessageDivs.length; i++) {
    if (mergeMessageDivs[i].querySelector(".add-to-mergify-queue-button")) {
      continue;
    }

    var button = document.createElement("button");
    button.innerHTML = "Add to Mergify Queue";
    button.classList.add("add-to-mergify-queue-button");
    button.classList.add("btn-group-squash");
    button.classList.add("rounded-left-2");
    button.classList.add("btn");
    button.classList.add("btn-secondary");
    button.style.marginTop = "16px";
    button.style.outline = "1px solid #28abe1";

    button.addEventListener("click", function () {
      var commentField = document.getElementById("new_comment_field");

      commentField.value = "@Mergifyio queue";

      setTimeout(() => {
        var commentButton = document.querySelector(
          "#partial-new-comment-form-actions > div > div.color-bg-subtle.ml-1 > button"
        );

        commentButton.removeAttribute("disabled");

        commentButton.click();
      }, 100);
    });

    mergeMessageDivs[i].appendChild(button);
  }
}

const observer = new MutationObserver(function (mutationsList, observer) {
  observer.disconnect();

  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      addButtonToDiv();
    }
  }

  observer.observe(document.body, { childList: true, subtree: true });
});

observer.observe(document.body, { childList: true, subtree: true });
