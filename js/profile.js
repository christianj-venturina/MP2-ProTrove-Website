function populateEditModal() {
  var currentName = $("#profile_name").text().trim().split(" ");
  var currentFirstName = currentName[0];
  var currentLastName = currentName[1] || "";
  var currentLocation = $("#location")
    .text()
    .trim()
    .replace("location_on", "")
    .trim();
  var currentEmail = $("#email").text().trim().replace("mail", "").trim();
  var currentPhoneNumber = $("#phone")
    .find(".material-symbols-outlined")
    .remove()
    .end()
    .text()
    .trim();

  $("#firstName").val(currentFirstName);
  $("#lastName").val(currentLastName);
  $("#homeLocation").val(currentLocation);
  $("#emailAddress").val(currentEmail);
  $("#phoneNumber").val(currentPhoneNumber);
}

$(document).ready(function () {
  $("#editButton").click(function () {
    $("#editModal").modal("show");
    populateEditModal();
  });

  $("#saveChanges").click(function () {
    var newFirstName = $("#firstName").val();
    var newLastName = $("#lastName").val();
    var newLocation = $("#homeLocation").val();
    var newEmail = $("#emailAddress").val();
    var newPhoneNumber = $("#phoneNumber").val();

    $("#profile_name").text(newFirstName + " " + newLastName);
    $("#location").html(
      '<span class="material-symbols-outlined"> location_on </span>' +
        newLocation
    );
    $("#email").html(
      '<span class="material-symbols-outlined"> mail </span>' + newEmail
    );
    $("#phone").html(
      '<span class="material-symbols-outlined"> call </span>' + newPhoneNumber
    );

    $("#editModal").modal("hide");
  });

  $("#edit_summary_modal").click(function () {
    $("#edit_summary_details").modal("show");

    var current_Sum = $("#personalSummary p").text();
    $("#editPersonalSummary").val(current_Sum);
  });

  $("#savePersonalDetailsChanges").click(function () {
    var editPersonalDetails = $("#editPersonalSummary").val();
    $("#personalSummary p").text(editPersonalDetails);

    $("#edit_summary_details").modal("hide");
  });

  // work modal
  $("#edit_work_modal_icon").click(function () {
    $("#edit_role_work").modal("show");
  });

  function WorkDeleteButton() {
    $("#edit_role_work .delete-work").click(function () {
      var workEntry = $(this).closest(".work-summary-box");
      WorkConfirmationModal(workEntry);
    });
  }

  // new Add Box edit code start dito

  $("#save_work_details").click(function () {
    var jobTitle = $("#jobTitle").val();
    var companyName = $("#companyName").val();
    var startMonth = $("#startMonth").val();
    var startYear = parseInt($("#startYear").val());
    var description = $("#description").val();
    var currentYear = new Date().getFullYear();
    var yearsOfWorking = currentYear - startYear;
    var detailsText =
      "<strong>" +
      jobTitle.toUpperCase() +
      "</strong>" +
      "<br>" +
      companyName +
      "<br>" +
      startMonth +
      " " +
      startYear +
      " - " +
      (yearsOfWorking >= 1 ? yearsOfWorking + " year" : "Less than a year") +
      (yearsOfWorking > 1 ? "s" : "") +
      "<br>" +
      description;
    $("#work_details_sum p").html(detailsText);
    $("#edit_role_work").modal("hide");
  });

  $("#addJob").click(function () {
    var addJobStartYearDropdown = $("#add_work_experience #startYear");
    addJobStartYearDropdown.empty();
    var currentYear = new Date().getFullYear();
    for (var year = currentYear; year >= 1924; year--) {
      var option = $("<option></option>").val(year).text(year);
      addJobStartYearDropdown.append(option);
    }

    $("#add_work_experience").modal("show");
  });

  $("#save_work").click(function () {
    var addedJobTitle = $("#add_work_experience #jobTitle").val();
    var addedCompanyName = $("#add_work_experience #companyName").val();
    var addedStartMonth = $("#add_work_experience #startMonth").val();
    var addedStartYear = parseInt($("#add_work_experience #startYear").val());
    var currentYear = new Date().getFullYear();
    var yearsOfWorking = currentYear - addedStartYear;
    var addedDescription = $("#add_work_experience #description").val();

    var workDeletePin = $(
      "<button type='button' class='btn btn delete-work' style='background-color: transparent !important; color: gray !important; border: none !important; position: absolute; bottom: 0; right: 0;'>" +
        "<span class='material-symbols-outlined'>delete</span>" +
        "</button>"
    );

    workDeletePin.click(function () {
      var workEntry = $(this).closest(".work-summary-box");
      WorkConfirmationModal(workEntry);
    });

    var addedDetailsText =
      "" +
      "<strong>" +
      addedJobTitle.toUpperCase() +
      "</strong><br>" +
      addedCompanyName +
      "<br>" +
      addedStartMonth +
      " " +
      addedStartYear +
      " - " +
      (yearsOfWorking >= 1 ? yearsOfWorking + " years" : "Less than a year") +
      "<br>" +
      addedDescription;

    var newWorkBox = $("<div class='work-summary-box'></div>").append(
      addedDetailsText,
      workDeletePin
    );
    $(".work-summary-box:first").after(newWorkBox);
    $(".adding").append(newWorkBox);

    $(
      "#add_work_experience #jobTitle, #add_work_experience #companyName, #add_work_experience #startMonth, #add_work_experience #startYear, #add_work_experience #description"
    ).val("");

    $("#add_work_experience").modal("hide");
  });

  $(document).on("click", ".delete-work", function () {
    console.log("Delete button clicked");
    var workEntry = $(this).closest(".work-summary-box");
    console.log("Added Work to delete:", workEntry);
    workEntry.remove();
  });

  function WorkDeleteButton() {
    $("#edit_role_work .delete-work").click(function () {
      var workEntry = $(this).closest(".work-summary-box");
      WorkConfirmationModal(workEntry);
    });
  }

  function WorkConfirmationModal(workEntry) {
    var confirmWork_Delete = confirm(
      "Are you sure you want to delete this entry?"
    );

    if (confirmWork_Delete) {
      deleteWorkEntry(workEntry);
    } else {
      console.log("Deletion canceled");
    }
  }

  function deleteWorkEntry(workEntry) {
    console.log("Entry deleted:", workEntry);
    workEntry.remove();
  }

  WorkDeleteButton();

  $(document).on("click", "#edit_work_modal_new", function () {
    var addedJobTitle = $(this).siblings("p").eq(0).text().trim();
    var addedCompanyName = $(this).siblings("p").eq(1).text().trim();
    var addedStartMonth = $(this)
      .siblings("p")
      .eq(2)
      .text()
      .trim()
      .split(" ")[0];
    var addedStartYear = parseInt(
      $(this).siblings("p").eq(2).text().trim().split(" ")[1]
    );
    var addedDescription = $(this).siblings("p").eq(3).text().trim();

    $("#edit_role_work #jobTitle").val(addedJobTitle);
    $("#edit_role_work #companyName").val(addedCompanyName);
    $("#edit_role_work #startMonth").val(addedStartMonth);
    $("#edit_role_work #startYear").val(addedStartYear);
    $("#edit_role_work #description").val(addedDescription);

    $("#edit_role_work").modal("show");
    WorkDeleteButton();
  });

  // work modal finish dito

  /* education */
  $("#edit_educ_modal_icon").click(function () {
    $("#edit_role_educ").modal("show");
  });

  function ModalDeleteButtonEduc() {
    $("#edit_role_educ .delete-work-educ").click(function () {
      var educEntry = $(this).closest(".educ-summary-box");
      WorkDelConfirm(educEntry);
    });
  }

  // newAddedBox edit code

  $("#save_educ_details").click(function () {
    var school = $("#school").val();
    var course = $("#course").val();
    var graduatedMonth = $("#graduatedMonth").val();
    var graduatedYear = parseInt($("#graduatedYear").val());
    var descriptionEduc = $("#descriptionEduc").val();
    var presentYear = new Date().getFullYear();
    var yearsOfStudying = presentYear - graduatedYear;
    var detailsTextEduc =
      "<strong>" +
      school.toUpperCase() +
      "</strong>" +
      "<br>" +
      course +
      "<br>" +
      graduatedMonth +
      " " +
      graduatedYear +
      " - " +
      (yearsOfStudying >= 1 ? yearsOfStudying + " year" : "Graduated") +
      (yearsOfStudying > 1 ? "s" : "") +
      "<br>" +
      descriptionEduc;
    $("#educ_details_sum p").html(detailsTextEduc);
    $("#edit_role_educ").modal("hide");
  });

  $("#addEduc").click(function () {
    var addJobgraduatedYearDropdown = $("#add_educ_experience #graduatedYear");
    addJobgraduatedYearDropdown.empty();
    var presentYear = new Date().getFullYear();
    for (var years = presentYear; years >= 1924; years--) {
      var options = $("<option></option>").val(years).text(years);
      addJobgraduatedYearDropdown.append(options);
    }

    $("#add_educ_experience").modal("show");
  });

  $("#save_educ").click(function () {
    var addedschool = $("#add_educ_experience #school").val();
    var addedcourse = $("#add_educ_experience #course").val();
    var addedgraduatedMonth = $("#add_educ_experience #graduatedMonth").val();
    var addedgraduatedYear = parseInt(
      $("#add_educ_experience #graduatedYear").val()
    );
    var presentYear = new Date().getFullYear();
    var yearsOfStudying = presentYear - addedgraduatedYear;
    var addedDescriptionEduc = $("#add_educ_experience #descriptionEduc").val();

    var deleteButtonEduc = $(
      "<button type='button' class='btn btn delete-work-educ' style='background-color: transparent !important; color: gray !important; border: none !important; Enter your school: absolute; bottom: 0; right: 0;'>" +
        "<span class='material-symbols-outlined'>delete</span>" +
        "</button>"
    );

    deleteButtonEduc.click(function () {
      var educEntry = $(this).closest(".educ-summary-box");
      WorkDelConfirm(educEntry);
    });

    var addedDetailsTextEduc =
      "" +
      "<strong>" +
      addedschool.toUpperCase() +
      "</strong><br>" +
      addedcourse +
      "<br>" +
      addedgraduatedMonth +
      " " +
      addedgraduatedYear +
      " - " +
      (yearsOfStudying >= 1 ? yearsOfStudying + " years" : "Graduated") +
      "<br>" +
      addedDescriptionEduc;

    var newWorkBoxEduc = $("<div class='educ-summary-box'></div>").append(
      addedDetailsTextEduc,
      deleteButtonEduc
    );
    $(".educ-summary-box:first").after(newWorkBoxEduc);
    $(".addingEduc").append(newWorkBoxEduc);

    $(
      "#add_educ_experience #school, #add_educ_experience #course, #add_educ_experience #graduatedMonth, #add_educ_experience #graduatedYear, #add_educ_experience #descriptionEduc"
    ).val("");

    $("#add_educ_experience").modal("hide");
  });

  $(document).on("click", ".delete-work-educ", function () {
    console.log("Delete button clicked");
    var educEntry = $(this).closest(".educ-summary-box");
    console.log("Added Education to delete:", educEntry);
    educEntry.remove();
  });

  function WorkDelConfirm(certEntry) {
    var confirmCert_Delete = confirm(
      "Are you sure you want to delete this entry?"
    );
    $("#confirmDelete_educ")
      .off("click")
      .on("click", function () {
        deleteCert(educEntry);
      });
  }

  $(document).on("click", "#edit_work_modal_new", function () {
    var addedschool = $(this).siblings("p").eq(0).text().trim();
    var addedcourse = $(this).siblings("p").eq(1).text().trim();
    var addedgraduatedMonth = $(this)
      .siblings("p")
      .eq(2)
      .text()
      .trim()
      .split(" ")[0];
    var addedgraduatedYear = parseInt(
      $(this).siblings("p").eq(2).text().trim().split(" ")[1]
    );
    var addedDescriptionEduc = $(this).siblings("p").eq(3).text().trim();

    $("#edit_role_educ #school").val(addedschool);
    $("#edit_role_educ #course").val(addedcourse);
    $("#edit_role_educ #graduatedMonth").val(addedgraduatedMonth);
    $("#edit_role_educ #graduatedYear").val(addedgraduatedYear);
    $("#edit_role_educ #descriptionEduc").val(addedDescriptionEduc);

    $("#edit_role_educ").modal("show");
    ModalDeleteButtonEduc();
  });

  // education end

  /* Certification */
  $("#edit_cert_modal_icon").click(function () {
    $("#edit_role_cert").modal("show");
  });

  function DeleteButtonForCert() {
    $("#edit_role_cert .delete-work-cert").click(function () {
      var certEntry = $(this).closest(".cert-summary-box");
      showConCertDelete(certEntry);
    });
  }

  // newAddedBox edit code

  $("#save_cert_details").click(function () {
    var license = $("#license").val();
    var issuing = $("#issuing").val();
    var issuingMonth = $("#issuingMonth").val();
    var issuingYear = parseInt($("#issuingYear").val());
    var descriptionCert = $("#descriptionCert").val();
    var presentYearcert = new Date().getFullYear();
    var yearsOfValidity = presentYearcert - issuingYear;
    var detailsTextCert =
      "<strong>" +
      license.toUpperCase() +
      "</strong>" +
      "<br>" +
      issuing +
      "<br>" +
      issuingMonth +
      " " +
      issuingYear +
      "<br>" +
      descriptionCert;
    $("#cert_details_sum p").html(detailsTextCert);
    $("#edit_role_cert").modal("hide");
  });

  $("#addCert").click(function () {
    var addJobissuingYearDropdown = $("#add_cert_experience #issuingYear");
    addJobissuingYearDropdown.empty();
    var presentYearcert = new Date().getFullYear();
    for (var year1 = presentYearcert; year1 >= 1924; year1--) {
      var option1 = $("<option></option>").val(year1).text(year1);
      addJobissuingYearDropdown.append(option1);
    }

    $("#add_cert_experience").modal("show");
  });

  $("#save_cert").click(function () {
    var addedlicense = $("#add_cert_experience #license").val();
    var addedissuing = $("#add_cert_experience #issuing").val();
    var addedissuingMonth = $("#add_cert_experience #issuingMonth").val();
    var addedissuingYear = parseInt(
      $("#add_cert_experience #issuingYear").val()
    );
    var presentYearcert = new Date().getFullYear();
    var yearsOfValidity = presentYearcert - addedissuingYear;
    var addedDescriptionCert = $("#add_cert_experience #descriptionCert").val();

    var deleteButtonCert = $(
      "<button type='button' class='btn btn delete-work-cert' style='background-color: transparent !important; color: gray !important; border: none !important; Enter your license: absolute; bottom: 0; right: 0;'>" +
        "<span class='material-symbols-outlined'>delete</span>" +
        "</button>"
    );

    deleteButtonCert.click(function () {
      var certEntry = $(this).closest(".cert-summary-box");
      showConCertDelete(certEntry);
    });

    var addedDetailsTextCert =
      "" +
      "<strong>" +
      addedlicense.toUpperCase() +
      "</strong><br>" +
      addedissuing +
      "<br>" +
      addedissuingMonth +
      " " +
      addedissuingYear +
      "<br>" +
      addedDescriptionCert;

    var newCertBox = $("<div class='cert-summary-box'></div>").append(
      addedDetailsTextCert,
      deleteButtonCert
    );
    $(".cert-summary-box:first").after(newCertBox);
    $(".adding2").append(newCertBox);

    $(
      "#add_cert_experience #license, #add_cert_experience #issuing, #add_cert_experience #issuingMonth, #add_cert_experience #issuingYear, #add_cert_experience #descriptionCert"
    ).val("");

    $("#add_cert_experience").modal("hide");
  });

  $(document).on("click", ".delete-work-cert", function () {
    console.log("Delete button clicked");
    var certEntry = $(this).closest(".cert-summary-box");
    console.log("Work Entry to delete:", certEntry);
    certEntry.remove();
  });

  function showConCertDelete(certEntry) {
    var confirmCert_Delete = confirm(
      "Are you sure you want to delete this entry?"
    );
  }

  $(document).on("click", "#edit_cert_modal_new", function () {
    var addedlicense = $(this).siblings("p").eq(0).text().trim();
    var addedissuing = $(this).siblings("p").eq(1).text().trim();
    var addedissuingMonth = $(this)
      .siblings("p")
      .eq(2)
      .text()
      .trim()
      .split(" ")[0];
    var addedissuingYear = parseInt(
      $(this).siblings("p").eq(2).text().trim().split(" ")[1]
    );
    var addedDescriptionCert = $(this).siblings("p").eq(3).text().trim();

    $("#edit_role_cert #license").val(addedlicense);
    $("#edit_role_cert #issuing").val(addedissuing);
    $("#edit_role_cert #issuingMonth").val(addedissuingMonth);
    $("#edit_role_cert #issuingYear").val(addedissuingYear);
    $("#edit_role_cert #descriptionCert").val(addedDescriptionCert);

    $("#edit_role_cert").modal("show");
    DeleteButtonForCert();
  });

  // Certification end

  // edit Skills
  $(document).ready(function () {
    $("#add_skills_button").click(function () {
      openModal();
    });

    $(".btn-secondaryNew").click(function () {
      closeModal();
    });

    $("#buttonSkill").click(function () {
      addNewSkill();
    });

    $("#buttonSaveSkills").click(function () {
      saveSkills();
    });

    $("#suggestedSkillsList li").click(function () {
      var skill = $(this).text().trim();
      addSuggestedSkill(skill);
    });

    updateSelectedSkillsContainer();
  });

  function openModal() {
    document.getElementById("skillsModal").style.display = "block";
    document.getElementById("overlayNew").style.display = "block";
  }

  function closeModal() {
    document.getElementById("skillsModal").style.display = "none";
    document.getElementById("overlayNew").style.display = "none";
  }

  function addNewSkill() {
    const newSkillInput = document.getElementById("newSkillInput");
    const skill = newSkillInput.value.trim();

    if (skill !== "") {
      addSkill(skill);
      newSkillInput.value = "";
    }
  }

  function addSuggestedSkill(skill) {
    addSkill(skill);
  }

  function addSkill(skill) {
    const selectedSkillsList = document.getElementById("selectedSkillsList");
    const style_li = document.createElement("style_li");
    const span_skill = document.createElement("span_new");

    span_skill.textContent = "  " + "x";
    span_skill.onclick = function () {
      selectedSkillsList.removeChild(style_li);
      updateSelectedSkillsContainer();
    };

    style_li.textContent = skill;
    style_li.appendChild(span_skill);
    selectedSkillsList.appendChild(style_li);

    updateSelectedSkillsContainer();
  }

  function saveSkills() {
    const selectedSkillsList = document.getElementById("selectedSkillsList");
    const container = document.querySelector(".selected-skills-container");
    container.innerHTML = "";

    Array.from(selectedSkillsList.children).forEach((style_li) => {
      const skillText = style_li.textContent;
      const skill = document.createElement("div");
      skill.classList.add("selected-skill");

      skill.textContent = skillText;
      skill.onclick = function () {
        selectedSkillsList.removeChild(style_li);
        updateSelectedSkillsContainer();
      };

      container.appendChild(skill);
    });

    // Close the modal
    closeModal();
  }

  function updateSelectedSkillsContainer() {
    const container = document.querySelector(".selected-skills-container");
    const selectedSkillsList = document.getElementById("selectedSkillsList");

    container.innerHTML = "";

    Array.from(selectedSkillsList.children).forEach((style_li) => {
      const skillText = style_li.textContent;
      const skill = document.createElement("div");
      skill.classList.add("selected-skill");

      skill.textContent = skillText;
      skill.onclick = function () {
        style_li.remove();
        updateSelectedSkillsContainer();
      };

      container.appendChild(skill);
    });
  }
  // edit Sills end

  // language
  $("#edit_languages").click(function () {
    $("#EditLanguagesModal").modal("show");
    populateEditLanguagesModal();
  });

  $("#saveLanguages").click(function () {
    $("#EditLanguagesModal").modal("hide");
  });

  $("#Language_summary_modal").click(function () {
    $("#Language_summary_details").modal("show");

    var current_Lang = $("#LanguageSummary p").text();
    $("#editLanguageSummary").val(current_Lang);
  });

  $("#save_language_hist").click(function () {
    var editPersonalDetails = $("#editLanguageSummary").val();
    $("#LanguageSummary p").text(editPersonalDetails);

    $("#Language_summary_details").modal("hide");
  });
  // language end

  // resume

  // resume end

  // circle

  function updateProgress(circleId) {
    const circle = document.getElementById(circleId);
    circle.classList.toggle("selected");
    const selectedCircles = document.querySelectorAll(
      ".progress-circle.selected"
    );
    console.log(`Progress: ${selectedCircles.length}/3`);
  }

  $(document).ready(function () {
    $(".progress-circle").click(function () {
      updateProgress(this.id);
    });
  });

  // circle ending

  function updateProgress1(circleId) {
    const circle1 = document.getElementById(circleId);
    circle1.classList.toggle("selected");
    const selectedCircles1 = document.querySelectorAll(
      ".progress-circle1.selected"
    );
    console.log(`Progress: ${selectedCircles1.length}/3`);
  }

  $(document).ready(function () {
    $(".progress-circle1").click(function () {
      updateProgress1(this.id);
    });
  });

  function updateProgress2(circleId) {
    const circle2 = document.getElementById(circleId);
    circle2.classList.toggle("selected");
    const selectedCircles2 = document.querySelectorAll(
      ".progress-circle2.selected"
    );
    console.log(`Progress: ${selectedCircles2.length}/3`);
  }

  $(document).ready(function () {
    $(".progress-circle2").click(function () {
      updateProgress2(this.id);
    });
  });

  function updateProgress3(circleId) {
    const circle3 = document.getElementById(circleId);
    circle3.classList.toggle("selected");
    const selectedCircles3 = document.querySelectorAll(
      ".progress-circle3.selected"
    );
    console.log(`Progress: ${selectedCircles3.length}/3`);
  }

  $(document).ready(function () {
    $(".progress-circle3").click(function () {
      updateProgress3(this.id);
    });
  });

  function updateProgress4(circleId) {
    const circle4 = document.getElementById(circleId);
    circle4.classList.toggle("selected");
    const selectedCircles4 = document.querySelectorAll(
      ".progress-circle4.selected"
    );
    console.log(`Progress: ${selectedCircles4.length}/4`);
  }

  $(document).ready(function () {
    $(".progress-circle4").click(function () {
      updateProgress4(this.id);
    });
  });
});
