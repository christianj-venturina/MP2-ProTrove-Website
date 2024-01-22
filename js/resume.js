let uploadedResumes = [];

$("#add-resume-modal").hide();
$("#delete-confirm-modal").hide();

function openAddResumeModal() {
  $("#add-resume-modal").show();
}

function closeAddResumeModal() {
  $("#add-resume-modal").hide();
}

function uploadResume() {
  const fileInput = $("#resume-upload")[0];
  const file = fileInput.files[0];

  if (file && uploadedResumes.length < 10) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const resumeData = e.target.result;
      const resumeItem = {
        data: resumeData,
        name: file.name,
      };

      uploadedResumes.push(resumeItem);
      displayResumes();
      closeAddResumeModal();
    };

    reader.readAsDataURL(file);
  }
}

function displayResumes() {
  const resumeContainer = $("#resume-container");
  resumeContainer.empty();

  uploadedResumes.forEach((resume, index) => {
    const resumeItem = $("<div>").addClass("resume-item").html(`
      <span>${resume.name}</span>
      <span class="delete-btn" onclick="confirmDelete(${index})">Delete</span>
    `);
    resumeContainer.append(resumeItem);
  });
}

function confirmDelete(index) {
  const deleteConfirmModal = $("#delete-confirm-modal");
  deleteConfirmModal.show();

  deleteConfirmModal.data("deleteIndex", index);
}

function deleteResume() {
  const deleteConfirmModal = $("#delete-confirm-modal");
  const index = deleteConfirmModal.data("deleteIndex");

  if (index !== undefined) {
    uploadedResumes.splice(index, 1);
    displayResumes();
  }

  deleteConfirmModal.hide();
}

function cancelDelete() {
  const deleteConfirmModal = $("#delete-confirm-modal");
  deleteConfirmModal.hide();
}
